'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Launch, PLATFORM_CONFIGS, PlatformName } from '@/types'
import { getStoredLaunchById } from '@/lib/mockData'
import StatusBadge from '@/components/StatusBadge'
import LoadingSpinner from '@/components/LoadingSpinner'

const FOLLOW_UP_TEMPLATES: Record<PlatformName, string> = {
  x: 'Thanks for all the support on the launch! 🙏\n\nHere\'s what we learned in day 1:\n→ [key insight 1]\n→ [key insight 2]\n\nWe\'re already working on [next feature]. Stay tuned!\n\n#buildinpublic',
  producthunt: 'Day 1 update: We\'ve had an incredible response! Thank you to everyone who upvoted and commented.\n\nWe\'ve already fixed [bug] based on your feedback and are working on [feature]. Your input is directly shaping the product.',
  hackernews: 'Show HN follow-up: We got a lot of great feedback on our initial post. Here\'s what we\'ve learned and improved...',
  reddit: '**Update: 24 hours after launch**\n\nWow, the r/SideProject community is incredible. Thank you all!\n\n**Numbers so far:**\n- [metric 1]\n- [metric 2]\n\n**What you helped us fix:**\n- [improvement]\n\nAMA if you have questions!',
  indiehackers: '**48-hour launch update**\n\nIncredible first 48 hours. Here\'s a quick breakdown:\n\n**Traffic:** [X] visitors\n**Signups:** [Y] users\n**Revenue:** $[Z]\n\nBiggest lesson: [insight]\n\nNext milestone: [goal]',
}

export default function ReportPage() {
  const params = useParams()
  const id = params?.id as string

  const [launch, setLaunch] = useState<Launch | null>(null)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)

  useEffect(() => {
    const found = getStoredLaunchById(id)
    if (found) setLaunch(found)
  }, [id])

  function copyFollowUp(platform: PlatformName) {
    navigator.clipboard.writeText(FOLLOW_UP_TEMPLATES[platform])
    setCopiedPlatform(platform)
    setTimeout(() => setCopiedPlatform(null), 2000)
  }

  if (!launch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const successResults = launch.results?.filter((r) => r.status === 'success') || []
  const failedResults = launch.results?.filter((r) => r.status === 'failed') || []
  const totalMetrics = launch.results?.reduce(
    (acc, r) => ({
      views: acc.views + (r.metrics?.views || 0),
      upvotes: acc.upvotes + (r.metrics?.upvotes || 0),
      comments: acc.comments + (r.metrics?.comments || 0),
      clicks: acc.clicks + (r.metrics?.clicks || 0),
    }),
    { views: 0, upvotes: 0, comments: 0, clicks: 0 }
  )

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">Launch Report</h1>
              <StatusBadge status={launch.status} />
            </div>
            <p className="text-gray-400">{launch.formData.serviceName} · {launch.formData.oneLiner}</p>
            {launch.distributedAt && (
              <p className="text-sm text-gray-600 mt-1">
                Distributed {new Date(launch.distributedAt).toLocaleString()}
              </p>
            )}
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-gray-500 transition-colors"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Summary stats */}
        {totalMetrics && (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total Views', value: totalMetrics.views.toLocaleString(), icon: '👁️' },
              { label: 'Upvotes', value: totalMetrics.upvotes.toLocaleString(), icon: '▲' },
              { label: 'Comments', value: totalMetrics.comments.toLocaleString(), icon: '💬' },
              { label: 'Clicks', value: totalMetrics.clicks.toLocaleString(), icon: '🖱️' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Platform results */}
        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="font-semibold text-white">Platform Results</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {successResults.length} of {launch.results?.length || 0} platforms successful
            </p>
          </div>
          <div className="divide-y divide-gray-800">
            {launch.results?.map((result) => {
              const config = PLATFORM_CONFIGS[result.platform]
              return (
                <div key={result.platform} className="flex items-center gap-4 px-6 py-4">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: config.color || '#374151' }}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{config.label}</p>
                    {result.url ? (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 truncate block"
                      >
                        {result.url} ↗
                      </a>
                    ) : (
                      <p className="text-xs text-red-400">{result.error}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        result.status === 'success'
                          ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                          : 'bg-red-900/50 text-red-300 border border-red-700/50'
                      }`}
                    >
                      {result.status === 'success' ? '✓ Posted' : '✗ Failed'}
                    </span>
                    {result.metrics && (
                      <div className="mt-1 flex gap-2 text-xs text-gray-500 justify-end">
                        {result.metrics.upvotes !== undefined && (
                          <span>▲ {result.metrics.upvotes}</span>
                        )}
                        {result.metrics.views !== undefined && (
                          <span>👁 {result.metrics.views}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Follow-up post suggestions */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="font-semibold text-white">Follow-up Post Suggestions</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Keep momentum going with these follow-up posts. Post 24–48 hours after launch.
            </p>
          </div>
          <div className="divide-y divide-gray-800">
            {successResults.map((result) => {
              const config = PLATFORM_CONFIGS[result.platform]
              const template = FOLLOW_UP_TEMPLATES[result.platform]
              return (
                <div key={result.platform} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white"
                        style={{ backgroundColor: config.color || '#374151' }}
                      >
                        {config.icon}
                      </div>
                      <span className="text-sm font-medium text-white">{config.label} Follow-up</span>
                    </div>
                    <button
                      onClick={() => copyFollowUp(result.platform)}
                      className="rounded-lg border border-gray-700 px-3 py-1 text-xs font-medium text-gray-300 hover:border-violet-500 hover:text-violet-300 transition-colors"
                    >
                      {copiedPlatform === result.platform ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed bg-gray-800/50 rounded-lg p-3">
                    {template}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* New launch CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/launch/new"
            className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Launch Another Product →
          </Link>
        </div>
      </div>
    </div>
  )
}
