'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LaunchFormData, PlatformName } from '@/types'
import { storeLaunch } from '@/lib/mockData'
import LoadingSpinner from '@/components/LoadingSpinner'

const ALL_PLATFORMS: PlatformName[] = ['x', 'producthunt', 'hackernews', 'reddit', 'indiehackers']

const PLATFORM_LABELS: Record<PlatformName, string> = {
  x: 'X (Twitter)',
  producthunt: 'Product Hunt',
  hackernews: 'Hacker News',
  reddit: 'Reddit',
  indiehackers: 'Indie Hackers',
}

const initialForm: LaunchFormData = {
  serviceName: '',
  serviceUrl: '',
  oneLiner: '',
  description: '',
  targetUsers: '',
  keyFeatures: ['', '', ''],
  imageUrl: '',
  tags: [],
  timing: 'now',
  scheduledAt: '',
}

export default function NewLaunchPage() {
  const router = useRouter()
  const [form, setForm] = useState<LaunchFormData>(initialForm)
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformName[]>([...ALL_PLATFORMS])
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function updateField<K extends keyof LaunchFormData>(key: K, value: LaunchFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateFeature(index: number, value: string) {
    const updated: [string, string, string] = [...form.keyFeatures] as [string, string, string]
    updated[index] = value
    updateField('keyFeatures', updated)
  }

  function addTag() {
    const t = tagInput.trim()
    if (t && form.tags.length < 5 && !form.tags.includes(t)) {
      updateField('tags', [...form.tags, t])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    updateField('tags', form.tags.filter((t) => t !== tag))
  }

  function togglePlatform(p: PlatformName) {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.serviceName || !form.oneLiner || !form.description) {
      setError('Please fill in all required fields.')
      return
    }
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Generate posts via API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form, platforms: selectedPlatforms }),
      })

      if (!res.ok) throw new Error('Generation failed')

      const { posts } = await res.json()

      const launchId = `launch-${Date.now()}`
      const launch = {
        id: launchId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft' as const,
        formData: form,
        generatedPosts: posts,
        platforms: selectedPlatforms,
        scheduledAt: form.timing === 'schedule' ? form.scheduledAt : undefined,
      }

      storeLaunch(launch)
      router.push(`/launch/${launchId}/preview`)
    } catch (err) {
      setError('Failed to generate posts. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Create New Launch</h1>
          <p className="mt-1 text-gray-400">Tell us about your product and we'll generate platform-perfect posts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-5">
            <h2 className="font-semibold text-white text-sm uppercase tracking-wider text-gray-400">
              Basic Information
            </h2>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Service Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.serviceName}
                onChange={(e) => updateField('serviceName', e.target.value)}
                placeholder="e.g. CodeSnap AI"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Service URL</label>
              <input
                type="url"
                value={form.serviceUrl}
                onChange={(e) => updateField('serviceUrl', e.target.value)}
                placeholder="https://yourservice.com"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-gray-300">
                <span>One-liner <span className="text-red-400">*</span></span>
                <span className={`text-xs ${form.oneLiner.length > 30 ? 'text-red-400' : 'text-gray-500'}`}>
                  {form.oneLiner.length}/30
                </span>
              </label>
              <input
                type="text"
                value={form.oneLiner}
                onChange={(e) => updateField('oneLiner', e.target.value.slice(0, 30))}
                placeholder="Turn screenshots into code instantly"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-gray-300">
                <span>Detailed Description <span className="text-red-400">*</span></span>
                <span className={`text-xs ${form.description.length > 200 ? 'text-red-400' : 'text-gray-500'}`}>
                  {form.description.length}/200
                </span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value.slice(0, 200))}
                rows={4}
                placeholder="Describe what your service does, why you built it, and what makes it unique..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Target Users</label>
              <input
                type="text"
                value={form.targetUsers}
                onChange={(e) => updateField('targetUsers', e.target.value)}
                placeholder="e.g. Frontend developers and designers"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Key Features */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Key Features</h2>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Feature {i + 1}
                </label>
                <input
                  type="text"
                  value={form.keyFeatures[i]}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder={`e.g. ${['Generate code in 3 seconds', 'Supports React & Vue', 'Copy-paste ready output'][i]}`}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Media & Tags */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Media & Tags</h2>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Screenshot / OGP Image URL</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => updateField('imageUrl', e.target.value)}
                placeholder="https://yoursite.com/og-image.png"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Tags <span className="text-gray-500">(up to 5)</span>
              </label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-violet-900/40 border border-violet-700/50 px-3 py-1 text-xs text-violet-300"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-violet-400 hover:text-white">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {form.tags.length < 5 && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag..."
                    className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-violet-500 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Target Platforms</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ALL_PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                    selectedPlatforms.includes(p)
                      ? 'border-violet-600 bg-violet-900/20 text-violet-300'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {selectedPlatforms.includes(p) ? '✓ ' : ''}{PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Timing */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Launch Timing</h2>
            <div className="flex gap-3">
              {(['now', 'schedule'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => updateField('timing', t)}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    form.timing === t
                      ? 'border-violet-600 bg-violet-900/20 text-violet-300'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {t === 'now' ? '🚀 Launch Now' : '⏰ Schedule'}
                </button>
              ))}
            </div>
            {form.timing === 'schedule' && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => updateField('scheduledAt', e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 text-base font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Generating Posts with AI…
              </>
            ) : (
              '✨ Generate Posts & Preview →'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
