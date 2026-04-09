import { LaunchStatus } from '@/types'

interface StatusBadgeProps {
  status: LaunchStatus
  className?: string
}

const STATUS_STYLES: Record<LaunchStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-gray-700 text-gray-300',
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
  },
  distributing: {
    label: 'Distributing…',
    className: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 animate-pulse',
  },
  posted: {
    label: 'Posted',
    className: 'bg-green-900/50 text-green-300 border border-green-700/50',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-900/50 text-red-300 border border-red-700/50',
  },
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = STATUS_STYLES[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  )
}
