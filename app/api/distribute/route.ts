import { NextRequest, NextResponse } from 'next/server'
import { PlatformName, DistributionResult } from '@/types'

const MOCK_URLS: Record<PlatformName, string> = {
  x: 'https://x.com/autolaunch/status/',
  producthunt: 'https://www.producthunt.com/posts/',
  hackernews: 'https://news.ycombinator.com/item?id=',
  reddit: 'https://www.reddit.com/r/SideProject/comments/',
  indiehackers: 'https://www.indiehackers.com/post/',
}

function randomId() {
  return Math.random().toString(36).substring(2, 10)
}

function simulateResult(platform: PlatformName, serviceName: string): DistributionResult {
  // 90% success rate simulation
  const success = Math.random() > 0.1
  const slug = serviceName.toLowerCase().replace(/\s+/g, '-') + '-' + randomId()

  if (success) {
    return {
      platform,
      status: 'success',
      url: MOCK_URLS[platform] + slug,
      postedAt: new Date().toISOString(),
      metrics: {
        views: Math.floor(Math.random() * 500),
        upvotes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        clicks: Math.floor(Math.random() * 100),
      },
    }
  } else {
    return {
      platform,
      status: 'failed',
      error: 'Simulated distribution failure (real API not connected)',
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      launchId: string
      serviceName: string
      platforms: PlatformName[]
    }
    const { platforms, serviceName } = body

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500))

    const results: DistributionResult[] = platforms.map((p) =>
      simulateResult(p, serviceName)
    )

    return NextResponse.json({ results, distributedAt: new Date().toISOString() })
  } catch (err) {
    console.error('Distribute error:', err)
    return NextResponse.json({ error: 'Distribution failed' }, { status: 500 })
  }
}
