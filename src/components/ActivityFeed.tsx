export interface ActivityEntry {
  id: string
  type: 'comment' | 'dm'
  username: string
  text: string
  timestamp: string
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-blue-500">No recent activity.</p>
  }

  return (
    <ul className="divide-y divide-blue-200 rounded-lg border border-blue-200 bg-white">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-start gap-3 px-4 py-3">
          <span
            className={`mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
              entry.type === 'comment' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
            }`}
          >
            {entry.type === 'comment' ? 'Comment' : 'DM'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-blue-900">
              <span className="font-medium">@{entry.username}</span>{' '}
              <span className="text-blue-600">{entry.text}</span>
            </p>
            <p className="mt-0.5 text-xs text-blue-400">{formatTimestamp(entry.timestamp)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
