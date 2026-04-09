'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import StatusBadge from '@/components/StatusBadge'
import { Launch, PLATFORM_CONFIGS } from '@/types'
import { getStoredLaunches } from '@/lib/mockData'

export default function DashboardPage() {
  const [launches, setLaunches] = useState<Launch[]>([])

  useEffect(() => {
    setLaunches(getStoredLaunches())
  }, [])

  const totalPlatforms = launches.reduce((sum, l) => sum + l.platforms.length, 0)
  const postedCount = launches.filter((l) => l.status === 'posted').length
  const scheduledCount = launches.filter((l) => l.status === 'scheduled').length

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-gray-400">Manage and track all your launches</p>
          </div>
          <Link
            href="/launch/new"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            + New Launch
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Launches', value: launches.length },
            { label: 'Posted', value: postedCount },
            { label: 'Scheduled', value: scheduledCount },
            { label: 'Platforms Reached', value: totalPlatforms },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Launches list */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
            <h2 className="font-semibold text-white">All Launches</h2>
          </div>

          {launches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-5xl">🚀</div>
              <h3 className="mb-2 text-lg font-semibold text-white">No launches yet</h3>
              <p className="mb-6 text-gray-400">Create your first launch and reach thousands of users</p>
              <Link
                href="/launch/new"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Create First Launch
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {launches.map((launch) => (
                <div key={launch.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-white truncate">{launch.formData.serviceName}</h3>
                      <StatusBadge status={launch.status} />
                    </div>
                    <p className="text-sm text-gray-400 truncate">{launch.formData.oneLiner}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {launch.platforms.map((p) => (
                        <span key={p} className="text-xs text-gray-500 font-medium">
                          {PLATFORM_CONFIGS[p].label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-600 mb-2">
                      {new Date(launch.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2">
                      {launch.status === 'draft' && (
                        <Link
                          href={`/launch/${launch.id}/preview`}
                          className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-violet-500 hover:text-violet-300 transition-colors"
                        >
                          Continue
                        </Link>
                      )}
                      {launch.status === 'scheduled' && (
                        <Link
                          href={`/launch/${launch.id}/distribute`}
                          className="rounded-lg border border-blue-700/50 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-900/20 transition-colors"
                        >
                          Manage
                        </Link>
                      )}
                      {launch.status === 'posted' && (
                        <Link
                          href={`/launch/${launch.id}/report`}
                          className="rounded-lg border border-green-700/50 px-3 py-1.5 text-xs font-medium text-green-300 hover:bg-green-900/20 transition-colors"
                        >
                          View Report
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
