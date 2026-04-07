import { NextResponse } from 'next/server'
import { fetchInstagramPosts } from '@/lib/instagram'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    const posts = await fetchInstagramPosts(8)

    return NextResponse.json({
      success: true,
      posts
    })
  } catch (error) {
    console.error('Instagram API route error:', error)
    return NextResponse.json(
      { success: false, posts: [], error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
