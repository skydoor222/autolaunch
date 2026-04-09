'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PlatformCard from '@/components/PlatformCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Launch, GeneratedPost, PlatformName } from '@/types'
import { getStoredLaunchById, storeLaunch } from '@/lib/mockData'

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [launch, setLaunch] = useState<Launch | null>(null)
  const [posts, setPosts] = useState<GeneratedPost[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const found = getStoredLaunchById(id)
    if (found) {
      setLaunch(found)
      setPosts(found.generatedPosts)
    }
  }, [id])

  async function regenerateAll() {
    if (!launch) return
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: launch.formData, platforms: launch.platforms }),
      })
      const { posts: newPosts } = await res.json()
      setPosts(newPosts)
      const updated = { ...launch, generatedPosts: newPosts, updatedAt: new Date().toISOString() }
      setLaunch(updated)
      storeLaunch(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function updatePostContent(platform: PlatformName, value: string) {
    setPosts((prev) => prev.map((p) => (p.platform === platform ? { ...p, content: value } : p)))
  }

  function updatePostTitle(platform: PlatformName, value: string) {
    setPosts((prev) => prev.map((p) => (p.platform === platform ? { ...p, title: value } : p)))
  }

  function updatePostTagline(platform: PlatformName, value: string) {
    setPosts((prev) => prev.map((p) => (p.platform === platform ? { ...p, tagline: value } : p)))
  }

  function handleApprove() {
    if (!launch) return
    const updated: Launch = {
      ...launch,
      generatedPosts: posts,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    }
    storeLaunch(updated)
    router.push(`/launch/${id}/distribute`)
  }

  if (!launch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Preview Generated Posts</h1>
            <p className="mt-1 text-gray-400">
              Review and edit each post before distributing. All posts are editable.
            </p>
          </div>
          <button
            onClick={regenerateAll}
            disabled={loading}
            className="shrink-0 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:border-violet-500 hover:text-violet-300 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <LoadingSpinner size="sm" /> : '↺'}
            Regenerate All
          </button>
        </div>

        {/* Launch summary */}
        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-white">{launch.formData.serviceName}</p>
              <p className="text-sm text-gray-400">{launch.formData.oneLiner}</p>
            </div>
            {launch.formData.serviceUrl && (
              <a
                href={launch.formData.serviceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-violet-400 hover:text-violet-300"
              >
                {launch.formData.serviceUrl} ↗
              </a>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400">Regenerating posts with Claude AI…</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PlatformCard
                key={post.platform}
                platform={post.platform}
                content={post.content}
                title={post.title}
                tagline={post.tagline}
                extras={post.extras}
                editable
                onChange={(v) => updatePostContent(post.platform, v)}
                onTitleChange={(v) => updatePostTitle(post.platform, v)}
                onTaglineChange={(v) => updatePostTagline(post.platform, v)}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 hover:border-gray-500 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleApprove}
            disabled={posts.length === 0 || loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Approve & Distribute →
          </button>
        </div>
      </div>
    </div>
  )
}
