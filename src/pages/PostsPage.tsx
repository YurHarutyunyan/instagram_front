import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listPosts } from '../api/posts'
import type { Post } from '../types/post'

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listPosts().then((result) => {
      if (!cancelled) {
        setPosts(result)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts</h1>
        <Link
          to="/posts/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          New Post
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.mediaId}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-md"
            >
              <img src={post.imageUrl} alt={post.caption} className="h-48 w-full object-cover" />
              <div className="p-3">
                <p className="line-clamp-2 text-sm text-slate-800">{post.caption}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
