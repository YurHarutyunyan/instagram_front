import { useEffect, useState } from 'react'
import { listComments, replyToComment } from '../api/comments'
import { listPosts } from '../api/posts'
import { ReplyComposer } from '../components/ReplyComposer'
import type { Comment } from '../types/comment'
import type { Post } from '../types/post'

function formatDateTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export function CommentsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([listPosts(), listComments()]).then(([postResult, commentResult]) => {
      if (cancelled) return
      setPosts(postResult)
      setComments(commentResult)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  async function handleReply(commentId: string, text: string) {
    const updated = await replyToComment(commentId, text)
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, replied: true, repliedAt: updated?.repliedAt } : c,
      ),
    )
    setReplyingTo(null)
  }

  if (loading) return <p className="text-sm text-blue-500">Loading…</p>

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-xl font-semibold">Comments</h1>
      <ul className="space-y-3">
        {sortedComments.map((comment) => {
          const post = posts.find((p) => p.mediaId === comment.mediaId)
          const isExpanded = expandedCommentId === comment.id
          return (
            <li
              key={comment.id}
              className={`rounded-lg border p-4 ${
                comment.replied ? 'border-blue-200 bg-white' : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex items-stretch gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">@{comment.username}</span>
                    {comment.replied && comment.repliedAt && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        Replied {formatDateTime(comment.repliedAt)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-blue-700">{comment.text}</p>
                  <p className="mt-1 text-xs text-blue-400">
                    Commented {formatDateTime(comment.timestamp)}
                  </p>

                  {replyingTo === comment.id ? (
                    <div className="mt-3">
                      <ReplyComposer onSend={(text) => handleReply(comment.id, text)} />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReplyingTo(comment.id)}
                      className="mt-2 text-xs font-medium text-blue-500 hover:text-blue-800"
                    >
                      Reply
                    </button>
                  )}
                </div>

                {post && (
                  <button
                    type="button"
                    onClick={() => setExpandedCommentId(isExpanded ? null : comment.id)}
                    className="flex w-40 shrink-0 items-center gap-2 border-l border-blue-100 pl-4 text-left"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="h-14 w-14 shrink-0 rounded-md object-cover"
                    />
                    <p className="line-clamp-3 text-xs text-blue-500">{post.caption}</p>
                  </button>
                )}
              </div>

              {isExpanded && post && (
                <div className="mt-4 flex gap-4 border-t border-blue-100 pt-4">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="h-48 w-48 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-blue-800">{post.caption}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
