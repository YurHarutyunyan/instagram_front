import { useEffect, useRef, useState } from 'react'
import { listConversations, sendMessage } from '../api/messages'
import { MessageBubble } from '../components/MessageBubble'
import { ReplyComposer } from '../components/ReplyComposer'
import { usePolling } from '../hooks/usePolling'
import type { Account } from '../types/account'

export function MessagesPage({ account }: { account: Account }) {
  const { data: conversations, error, reload } = usePolling(listConversations)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const selected = conversations?.find((c) => c.id === selectedId) ?? conversations?.[0]
  const messageCount = selected?.messages.length ?? 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [selected?.id, messageCount])

  async function handleSend(text: string) {
    if (!selected) return
    await sendMessage(selected.id, text)
    await reload()
  }

  if (!conversations) {
    return <p className="text-sm text-slate-500">{error ? `Could not load messages: ${error.message}` : 'Loading…'}</p>
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Messages</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Direct messages people sent to @{account.username} on Instagram. Green replies were sent automatically;
        you can also write one yourself below. This page refreshes every few seconds.
      </p>
      <div className="flex h-[70vh] overflow-hidden rounded-lg border border-slate-200 bg-white">
        <ul className="w-64 shrink-0 divide-y divide-slate-100 overflow-y-auto border-r border-slate-200">
          {conversations.map((conversation) => {
            const last = conversation.messages[conversation.messages.length - 1]
            return (
              <li key={conversation.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={`w-full px-4 py-3 text-left text-sm ${
                    selected?.id === conversation.id ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="font-medium">
                    {conversation.username ? `@${conversation.username}` : `Instagram user ${conversation.instagramUserId}`}
                  </span>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{last?.text}</p>
                </button>
              </li>
            )
          })}
          {conversations.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-500">
              No messages yet. When someone sends @{account.username} a direct message, it appears here.
            </li>
          )}
        </ul>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          {selected ? (
            <>
              <p className="mb-3 text-sm font-medium">
                Conversation with {selected.username ? `@${selected.username}` : `Instagram user ${selected.instagramUserId}`}
              </p>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {selected.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={bottomRef} />
              </div>
              <ReplyComposer
                onSend={handleSend}
                placeholder="Write a message…"
                hint={`Send delivers this text as an Instagram direct message from @${account.username} to ${
                  selected.username ? `@${selected.username}` : 'this person'
                }.`}
              />
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a conversation.</p>
          )}
        </div>
      </div>
    </div>
  )
}
