'use client'

import { PlatformName, PLATFORM_CONFIGS } from '@/types'

interface PlatformCardProps {
  platform: PlatformName
  content: string
  title?: string
  tagline?: string
  extras?: Record<string, string>
  editable?: boolean
  onChange?: (value: string) => void
  onTitleChange?: (value: string) => void
  onTaglineChange?: (value: string) => void
}

export default function PlatformCard({
  platform,
  content,
  title,
  tagline,
  extras,
  editable = false,
  onChange,
  onTitleChange,
  onTaglineChange,
}: PlatformCardProps) {
  const config = PLATFORM_CONFIGS[platform]
  const charLimit = config.charLimit

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: config.color || '#374151' }}
        >
          {config.icon}
        </div>
        <span className="font-semibold text-white">{config.label}</span>
        {charLimit && (
          <span className="ml-auto text-xs text-gray-500">
            {content.length}/{charLimit}
            {content.length > charLimit && (
              <span className="ml-1 text-red-400">Over limit!</span>
            )}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* ProductHunt specific fields */}
        {platform === 'producthunt' && (
          <>
            {editable ? (
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={title || ''}
                  onChange={(e) => onTitleChange?.(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                  placeholder="Product title"
                />
                <label className="text-xs text-gray-400 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={tagline || ''}
                  onChange={(e) => onTaglineChange?.(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                  placeholder="Short tagline"
                />
                <label className="text-xs text-gray-400 uppercase tracking-wider">Description</label>
              </div>
            ) : (
              <>
                {title && <p className="text-base font-semibold text-white">{title}</p>}
                {tagline && <p className="text-sm text-orange-400 italic">{tagline}</p>}
              </>
            )}
          </>
        )}

        {editable ? (
          <textarea
            value={content}
            onChange={(e) => onChange?.(e.target.value)}
            rows={platform === 'producthunt' || platform === 'indiehackers' ? 8 : 5}
            className={`w-full rounded-lg bg-gray-800 border px-3 py-2 text-sm text-white focus:outline-none resize-none ${
              charLimit && content.length > charLimit
                ? 'border-red-500 focus:border-red-400'
                : 'border-gray-700 focus:border-violet-500'
            }`}
          />
        ) : (
          <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{content}</p>
        )}

        {extras && Object.keys(extras).length > 0 && (
          <div className="space-y-1 pt-1 border-t border-gray-800">
            {Object.entries(extras).map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-gray-500 capitalize">{k}:</span>
                <span className="text-gray-400">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
