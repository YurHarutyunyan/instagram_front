import { useEffect, useState } from 'react'
import { listConversations, replyToMessage } from '../api/messages'
import { ReplyComposer } from '../components/ReplyComposer'
import type { Conversation } from '../types/message'

export function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listConversations().then((result) => {
      if (cancelled) return
      setConversations(result)
      setSelectedId(result[0]?.id ?? null)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const selected = conversations.find((c) => c.id === selectedId)

  async function handleSend(text: string) {
    if (!selectedId) return
    const message = await replyToMessage(selectedId, text)
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [...conversation.messages, message],
              lastMessagePreview: text,
              lastMessageAt: message.timestamp,
            }
          : conversation,
      ),
    )
  }

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Messages</h1>
      <div className="flex h-[70vh] overflow-hidden rounded-lg border border-slate-200 bg-white">
        <ul className="w-64 shrink-0 divide-y divide-slate-200 overflow-y-auto border-r border-slate-200">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full px-4 py-3 text-left text-sm ${
                  selectedId === conversation.id ? 'bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">@{conversation.participantUsername}</span>
                  {conversation.unread && <span className="h-2 w-2 rounded-full bg-sky-500" />}
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {conversation.lastMessagePreview}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 flex-col p-4">
          {selected ? (
            <>
              <p className="mb-3 text-sm font-medium">@{selected.participantUsername}</p>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {selected.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                      message.direction === 'outbound'
                        ? 'ml-auto bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <ReplyComposer onSend={handleSend} placeholder="Reply to this conversation…" />
            </>
          ) : (
            <p className="text-sm text-slate-500">No conversations yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
