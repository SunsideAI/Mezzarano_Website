// Instagram API integration
// Requires: INSTAGRAM_ACCESS_TOKEN in environment variables

export interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

const INSTAGRAM_API_URL = 'https://graph.instagram.com'

export async function fetchInstagramPosts(limit: number = 8): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    console.warn('Instagram access token not configured')
    return []
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
    const url = `${INSTAGRAM_API_URL}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Instagram API error:', error)
      return []
    }

    const data: InstagramApiResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error)
    return []
  }
}

// Refresh long-lived token (should be called monthly via cron job)
// Long-lived tokens are valid for 60 days
export async function refreshInstagramToken(): Promise<string | null> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    return null
  }

  try {
    const url = `${INSTAGRAM_API_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error('Failed to refresh Instagram token')
      return null
    }

    const data = await response.json()
    // Note: You'll need to update your environment variable with the new token
    console.log('New Instagram token (valid for 60 days):', data.access_token)
    return data.access_token
  } catch (error) {
    console.error('Error refreshing Instagram token:', error)
    return null
  }
}
