'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Launch, PlatformName, PLATFORM_CONFIGS } from '@/types'
import { getStoredLaunchById, storeLaunch } from '@/lib/mockData'
import LoadingSpinner from '@/components/LoadingSpinner'

type LogEntry = { time: string; message: string; type: 'info' | 'success' | 'error' }

export default function DistributePage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [launch, setLaunch] = useState<Launch | null>(null)
  const [enabledPlatforms, setEnabledPlatforms] = useState<PlatformName[]>([])
  const [timing, setTiming] = useState<'now' | 'schedule'>('now')
  const [scheduledAt, setScheduledAt] = useState('')
  const [distributing, setDistributing] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const found = getStoredLaunchById(id)
    if (found) {
      setLaunch(found)
      setEnabledPlatforms(found.platforms)
      setTiming(found.formData.timing)
      setScheduledAt(found.formData.scheduledAt || '')
    }
  }, [id])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  function addLog(message: string, type: LogEntry['type'] = 'info') {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { time, message, type }])
  }

  function togglePlatform(p: PlatformName) {
    setEnabledPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleDistribute() {
    if (!launch || enabledPlatforms.length === 0) return
    setDistributing(true)
    setLogs([])

    addLog('Starting distribution process…', 'info')
    await delay(500)

    for (const p of enabledPlatforms) {
      addLog(`Preparing post for ${PLATFORM_CONFIGS[p].label}…`, 'info')
      await delay(400)
    }

    addLog('Calling distribution API…', 'info')

    try {
      const res = await fetch('/api/distribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          launchId: launch.id,
          serviceName: launch.formData.serviceName,
          platforms: enabledPlatforms,
        }),
      })

      const { results, distributedAt } = await res.json()

      for (const result of results) {
        await delay(300)
        const platform = result.platform as PlatformName
        const platformLabel = PLATFORM_CONFIGS[platform]?.label || platform
        if (result.status === 'success') {
          addLog(`✓ ${platformLabel} — Posted successfully!`, 'success')
        } else {
          addLog(`✗ ${platformLabel} — ${result.error || 'Failed'}`, 'error')
        }
      }

      await delay(500)
      addLog('Distribution complete!', 'success')

      const updated: Launch = {
        ...launch,
        status: 'posted',
        updatedAt: new Date().toISOString(),
        distributedAt,
        results,
        platforms: enabledPlatforms,
      }
      storeLaunch(updated)
      setLaunch(updated)

      setTimeout(() => {
        router.push(`/launch/${launch.id}/report`)
      }, 1500)
    } catch (err) {
      addLog(`Distribution failed: ${err}`, 'error')
    } finally {
      setDistributing(false)
    }
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
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Distribution Control</h1>
          <p className="mt-1 text-gray-400">
            Choose which platforms to post to and when.
          </p>
        </div>

        {/* Platform toggles */}
        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Platforms</h2>
          <div className="space-y-3">
            {launch.platforms.map((p) => {
              const config = PLATFORM_CONFIGS[p]
              const isOn = enabledPlatforms.includes(p)
              const post = launch.generatedPosts.find((gp) => gp.platform === p)
              return (
                <div
                  key={p}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                    isOn ? 'border-violet-700/50 bg-gray-800/50' : 'border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white shrink-0"
                      style={{ backgroundColor: config.color || '#374151' }}
                    >
                      {config.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{config.label}</p>
                      {post && (
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {post.content.slice(0, 60)}…
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => !distributing && togglePlatform(p)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isOn ? 'bg-violet-600' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isOn ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timing */}
        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Timing</h2>
          <div className="flex gap-3">
            {(['now', 'schedule'] as const).map((t) => (
              <button
                key={t}
                onClick={() => !distributing && setTiming(t)}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  timing === t
                    ? 'border-violet-600 bg-violet-900/20 text-violet-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                {t === 'now' ? '🚀 Post Now' : '⏰ Schedule'}
              </button>
            ))}
          </div>
          {timing === 'schedule' && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
            />
          )}
        </div>

        {/* Log console */}
        {logs.length > 0 && (
          <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
            <div className="border-b border-gray-800 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-gray-500 font-mono">distribution.log</span>
            </div>
            <div
              ref={logRef}
              className="h-48 overflow-y-auto p-4 font-mono text-xs space-y-1"
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    log.type === 'success'
                      ? 'text-green-400'
                      : log.type === 'error'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  <span className="text-gray-600 shrink-0">[{log.time}]</span>
                  <span>{log.message}</span>
                </div>
              ))}
              {distributing && (
                <div className="flex items-center gap-2 text-violet-400">
                  <LoadingSpinner size="sm" />
                  <span>Processing…</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            disabled={distributing}
            className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 hover:border-gray-500 transition-colors disabled:opacity-50"
          >
            ← Back
          </button>
          <button
            onClick={handleDistribute}
            disabled={distributing || enabledPlatforms.length === 0}
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {distributing ? (
              <>
                <LoadingSpinner size="sm" />
                Distributing…
              </>
            ) : (
              `🚀 Start Distribution to ${enabledPlatforms.length} Platform${enabledPlatforms.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
