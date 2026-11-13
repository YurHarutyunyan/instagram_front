import { listComments } from '../api/comments'
import { listConversations } from '../api/messages'
import { usePolling } from '../hooks/usePolling'

function Stat({ label, value, hint }: { label: string; value: number | string; hint: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4" title={hint}>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  )
}

export function DashboardPage() {
  const { data: conversations } = usePolling(listConversations, 15000)
  const { data: comments } = usePolling(listComments, 15000)

  const inbound = conversations?.flatMap((c) => c.messages.filter((m) => m.kind === 'inbound')) ?? []
  const autoAnswered = inbound.filter((m) => m.status === 'REPLIED').length
  const needsYou =
    inbound.filter((m) => m.status === 'NEEDS_HUMAN').length +
    (comments?.filter((c) => c.status === 'NEEDS_HUMAN').length ?? 0)
  const loading = !conversations || !comments

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold">Overview</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        How it works: when someone sends your Instagram account a direct message or comments on your post, the app
        answers within seconds using the answers your business provided. Anything it can't answer is marked for you to
        reply to yourself on the Messages or Comments page.
      </p>
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Conversations" value={conversations.length} hint="People who sent you a direct message" />
          <Stat label="Answered automatically" value={autoAnswered} hint="Direct messages the app replied to" />
          <Stat label="Comments" value={comments.length} hint="Comments on your posts" />
          <Stat label="Need your reply" value={needsYou} hint="Questions the app had no answer for" />
        </div>
      )}
    </div>
  )
}
