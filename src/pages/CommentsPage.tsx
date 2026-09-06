import { useEffect, useState } from 'react'
import { listComments, replyToComment } from '../api/comments'
import { listPosts } from '../api/posts'
import { ReplyComposer } from '../components/ReplyComposer'
import type { Comment } from '../types/comment'
import type { Post } from '../types/post'

export function CommentsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

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
    await replyToComment(commentId, text)
    setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, replied: true } : c)))
    setReplyingTo(null)
  }

  if (loading) return <p className="text-sm text-blue-500">Loading…</p>

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-xl font-semibold">Comments</h1>
      {posts.map((post) => {
        const postComments = comments.filter((c) => c.mediaId === post.mediaId)
        if (postComments.length === 0) return null
        return (
          <div key={post.mediaId}>
            <p className="mb-2 text-sm font-medium text-blue-500 line-clamp-1">{post.caption}</p>
            <ul className="space-y-3">
              {postComments.map((comment) => (
                <li key={comment.id} className="rounded-lg border border-blue-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">@{comment.username}</span>
                    {comment.replied && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        Replied
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-blue-700">{comment.text}</p>

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
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
