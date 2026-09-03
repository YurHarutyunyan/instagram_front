import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listComments } from '../api/comments'
import { listConversations } from '../api/messages'
import { ActivityFeed, type ActivityEntry } from '../components/ActivityFeed'

export function DashboardPage() {
  const [entries, setEntries] = useState<ActivityEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [comments, conversations] = await Promise.all([listComments(), listConversations()])
      if (cancelled) return

      const commentEntries: ActivityEntry[] = comments.map((comment) => ({
        id: comment.id,
        type: 'comment',
        username: comment.username,
        text: comment.text,
        timestamp: comment.timestamp,
      }))

      const dmEntries: ActivityEntry[] = conversations.map((conversation) => ({
        id: conversation.id,
        type: 'dm',
        username: conversation.participantUsername,
        text: conversation.lastMessagePreview,
        timestamp: conversation.lastMessageAt,
      }))

      const merged = [...commentEntries, ...dmEntries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )

      setEntries(merged)
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Link
          to="/posts/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          New Post
        </Link>
      </div>

      <h2 className="mb-3 text-sm font-medium text-slate-500">Recent activity</h2>
      {loading ? <p className="text-sm text-slate-500">Loading…</p> : <ActivityFeed entries={entries} />}
    </div>
  )
}
