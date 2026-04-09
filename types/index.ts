export type PlatformName = 'x' | 'producthunt' | 'hackernews' | 'reddit' | 'indiehackers'

export type LaunchStatus = 'draft' | 'scheduled' | 'posted' | 'failed' | 'distributing'

export interface KeyFeature {
  label: string
}

export interface LaunchFormData {
  serviceName: string
  serviceUrl: string
  oneLiner: string
  description: string
  targetUsers: string
  keyFeatures: [string, string, string]
  imageUrl: string
  tags: string[]
  timing: 'now' | 'schedule'
  scheduledAt?: string
}

export interface GeneratedPost {
  platform: PlatformName
  content: string
  title?: string
  tagline?: string
  extras?: Record<string, string>
}

export interface Launch {
  id: string
  createdAt: string
  updatedAt: string
  status: LaunchStatus
  formData: LaunchFormData
  generatedPosts: GeneratedPost[]
  platforms: PlatformName[]
  scheduledAt?: string
  distributedAt?: string
  results?: DistributionResult[]
}

export interface DistributionResult {
  platform: PlatformName
  status: 'success' | 'failed' | 'pending'
  url?: string
  error?: string
  postedAt?: string
  metrics?: PlatformMetrics
}

export interface PlatformMetrics {
  views?: number
  upvotes?: number
  comments?: number
  clicks?: number
}

export interface PlatformConfig {
  name: PlatformName
  label: string
  color: string
  bgColor: string
  textColor: string
  icon: string
  charLimit?: number
}

export const PLATFORM_CONFIGS: Record<PlatformName, PlatformConfig> = {
  x: {
    name: 'x',
    label: 'X (Twitter)',
    color: '#000000',
    bgColor: 'bg-black',
    textColor: 'text-white',
    icon: '𝕏',
    charLimit: 280,
  },
  producthunt: {
    name: 'producthunt',
    label: 'Product Hunt',
    color: '#DA552F',
    bgColor: 'bg-orange-600',
    textColor: 'text-white',
    icon: '🐱',
  },
  hackernews: {
    name: 'hackernews',
    label: 'Hacker News',
    color: '#FF6600',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    icon: 'Y',
  },
  reddit: {
    name: 'reddit',
    label: 'Reddit',
    color: '#FF4500',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    icon: '🤖',
  },
  indiehackers: {
    name: 'indiehackers',
    label: 'Indie Hackers',
    color: '#0E2150',
    bgColor: 'bg-blue-900',
    textColor: 'text-white',
    icon: 'IH',
  },
}
