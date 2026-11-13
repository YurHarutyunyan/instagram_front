import { useState } from 'react'
import { listComments, replyToComment } from '../api/comments'
import { MessageBubble } from '../components/MessageBubble'
import { formatTime } from '../lib/format'
import { ReplyComposer } from '../components/ReplyComposer'
import { usePolling } from '../hooks/usePolling'
import type { Account } from '../types/account'

export function CommentsPage({ account }: { account: Account }) {
  const { data: comments, error, reload } = usePolling(listComments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  async function handleReply(commentId: number, text: string) {
    await replyToComment(commentId, text)
    setReplyingTo(null)
    await reload()
  }

  if (!comments) {
    return <p className="text-sm text-slate-500">{error ? `Could not load comments: ${error.message}` : 'Loading…'}</p>
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold">Comments</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Comments people left on @{account.username}'s posts. Green replies were posted automatically; press
        Reply to post your own answer under the comment on Instagram. This page refreshes every few seconds.
      </p>
      <ul className="space-y-3">
        {comments.map((comment) => (
          <li key={comment.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{comment.username ? `@${comment.username}` : 'Instagram user'}</span>
                  <span className="text-xs text-slate-400">{formatTime(comment.timestamp)}</span>
                </div>
                <p className="mt-1 text-sm text-slate-700">{comment.text}</p>

                <div className="mt-3 space-y-2">
                  {comment.autoReply && (
                    <MessageBubble
                      message={{
                        id: `auto-${comment.id}`,
                        kind: 'auto',
                        text: comment.autoReply,
                        timestamp: comment.timestamp,
                        status: comment.status,
                      }}
                    />
                  )}
                  {comment.replies.map((reply) => (
                    <MessageBubble key={reply.id} message={reply} />
                  ))}
                </div>

                {replyingTo === comment.id ? (
                  <div className="mt-3">
                    <ReplyComposer
                      onSend={(text) => handleReply(comment.id, text)}
                      buttonLabel="Post reply"
                      hint={`Posts this text as a reply from @${account.username} under ${
                        comment.username ? `@${comment.username}'s` : 'this'
                      } comment on Instagram.`}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setReplyingTo(comment.id)}
                    className="mt-3 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Reply
                  </button>
                )}
              </div>

              {comment.post && (
                <a
                  href={comment.post.permalink ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  title="The post this comment is on — opens it on Instagram"
                  className="flex w-36 shrink-0 flex-col gap-1 border-l border-slate-100 pl-4"
                >
                  {comment.post.imageUrl ? (
                    <img src={comment.post.imageUrl} alt="" className="h-24 w-24 rounded-md object-cover" />
                  ) : (
                    <div className="h-24 w-24 rounded-md bg-slate-100" />
                  )}
                  <p className="line-clamp-2 text-xs text-slate-500">{comment.post.caption ?? 'View post'}</p>
                </a>
              )}
            </div>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="text-sm text-slate-500">
            No comments yet. When someone comments on a post of @{account.username}, it appears here.
          </li>
        )}
      </ul>
    </div>
  )
}
