import { Launch } from '@/types'

export const MOCK_LAUNCHES: Launch[] = [
  {
    id: 'launch-001',
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-20T12:00:00Z',
    status: 'posted',
    formData: {
      serviceName: 'CodeSnap AI',
      serviceUrl: 'https://codesnap.ai',
      oneLiner: 'Turn screenshots into code instantly',
      description:
        'CodeSnap AI converts any UI screenshot into production-ready code in seconds. Supports React, Vue, and plain HTML/CSS.',
      targetUsers: 'Frontend developers and designers',
      keyFeatures: ['Screenshot to code in 3 seconds', 'Supports React, Vue, HTML', 'Copy-paste ready output'],
      imageUrl: 'https://via.placeholder.com/1200x630',
      tags: ['AI', 'Developer Tools', 'Code Generation'],
      timing: 'now',
    },
    generatedPosts: [],
    platforms: ['x', 'producthunt', 'hackernews', 'reddit', 'indiehackers'],
    distributedAt: '2026-03-20T12:00:00Z',
    results: [
      { platform: 'x', status: 'success', url: 'https://x.com/codeai/status/123', postedAt: '2026-03-20T12:01:00Z', metrics: { views: 4200, clicks: 380 } },
      { platform: 'producthunt', status: 'success', url: 'https://producthunt.com/posts/codesnap-ai', postedAt: '2026-03-20T12:02:00Z', metrics: { upvotes: 312, comments: 47 } },
      { platform: 'hackernews', status: 'success', url: 'https://news.ycombinator.com/item?id=99999', postedAt: '2026-03-20T12:03:00Z', metrics: { upvotes: 89, comments: 34 } },
      { platform: 'reddit', status: 'success', url: 'https://reddit.com/r/SideProject/comments/abc123', postedAt: '2026-03-20T12:04:00Z', metrics: { upvotes: 156, comments: 22 } },
      { platform: 'indiehackers', status: 'failed', error: 'Rate limit exceeded', postedAt: '2026-03-20T12:05:00Z' },
    ],
  },
  {
    id: 'launch-002',
    createdAt: '2026-03-25T09:00:00Z',
    updatedAt: '2026-03-25T09:00:00Z',
    status: 'scheduled',
    formData: {
      serviceName: 'Taskflow',
      serviceUrl: 'https://taskflow.app',
      oneLiner: 'AI project manager that writes itself',
      description:
        'Taskflow automatically creates and updates your project tasks based on your git commits and Slack messages.',
      targetUsers: 'Startup teams and freelancers',
      keyFeatures: ['Auto-generate tasks from git commits', 'Slack integration', 'One-click sprint planning'],
      imageUrl: '',
      tags: ['Productivity', 'AI', 'Project Management'],
      timing: 'schedule',
      scheduledAt: '2026-03-30T09:00:00Z',
    },
    generatedPosts: [],
    platforms: ['x', 'producthunt', 'indiehackers'],
    scheduledAt: '2026-03-30T09:00:00Z',
  },
  {
    id: 'launch-003',
    createdAt: '2026-03-27T15:00:00Z',
    updatedAt: '2026-03-27T15:30:00Z',
    status: 'draft',
    formData: {
      serviceName: 'ReplyGenius',
      serviceUrl: 'https://replygenius.io',
      oneLiner: 'Cold email replies that actually convert',
      description: 'AI-powered cold email response generator trained on millions of successful B2B deals.',
      targetUsers: 'Sales teams and SDRs',
      keyFeatures: ['Personalized reply in 10 seconds', 'Trained on 1M+ winning emails', 'CRM integrations'],
      imageUrl: '',
      tags: ['Sales', 'AI', 'Email'],
      timing: 'now',
    },
    generatedPosts: [],
    platforms: ['x', 'reddit'],
  },
]

export function getLaunchById(id: string): Launch | undefined {
  return MOCK_LAUNCHES.find((l) => l.id === id)
}

export function getStoredLaunches(): Launch[] {
  if (typeof window === 'undefined') return MOCK_LAUNCHES
  try {
    const stored = localStorage.getItem('autolaunch_launches')
    if (stored) {
      const parsed = JSON.parse(stored) as Launch[]
      return [...parsed, ...MOCK_LAUNCHES.filter((m) => !parsed.find((p) => p.id === m.id))]
    }
  } catch {
    // ignore
  }
  return MOCK_LAUNCHES
}

export function storeLaunch(launch: Launch): void {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem('autolaunch_launches')
    const launches: Launch[] = stored ? JSON.parse(stored) : []
    const idx = launches.findIndex((l) => l.id === launch.id)
    if (idx >= 0) {
      launches[idx] = launch
    } else {
      launches.unshift(launch)
    }
    localStorage.setItem('autolaunch_launches', JSON.stringify(launches))
  } catch {
    // ignore
  }
}

export function getStoredLaunchById(id: string): Launch | undefined {
  return getStoredLaunches().find((l) => l.id === id)
}
