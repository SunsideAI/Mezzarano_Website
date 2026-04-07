/**
 * Cloudinary Integration for Mezzarano Immobilien
 * Uploads images to Cloudinary for permanent storage
 */

import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

/**
 * Upload an image to Cloudinary from a URL
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  options: {
    folder?: string
    publicId?: string
    tags?: string[]
  } = {}
): Promise<CloudinaryUploadResult | null> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: options.folder || 'mezzarano/properties',
      public_id: options.publicId,
      tags: options.tags || ['property', 'mezzarano'],
      resource_type: 'image',
      overwrite: false, // Don't overwrite if exists
      unique_filename: true,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    })

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}

/**
 * Upload multiple images to Cloudinary
 */
export async function uploadMultipleImages(
  imageUrls: string[],
  options: {
    folder?: string
    propertyId?: string
  } = {}
): Promise<string[]> {
  const uploadedUrls: string[] = []

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i]
    const result = await uploadImageFromUrl(url, {
      folder: options.folder || 'mezzarano/properties',
      publicId: options.propertyId ? `${options.propertyId}_${i}` : undefined,
      tags: options.propertyId ? ['property', options.propertyId] : ['property'],
    })

    if (result) {
      uploadedUrls.push(result.secure_url)
    }
  }

  return uploadedUrls
}

/**
 * Check if an image already exists in Cloudinary
 */
export async function imageExists(publicId: string): Promise<boolean> {
  try {
    await cloudinary.api.resource(publicId)
    return true
  } catch {
    return false
  }
}

/**
 * Get optimized URL for an image
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: string
  } = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        width: options.width,
        height: options.height,
        crop: options.crop || 'fill',
        quality: options.quality || 'auto:good',
        fetch_format: 'auto',
      }
    ]
  })
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

export { cloudinary }
