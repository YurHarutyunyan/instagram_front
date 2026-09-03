import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../api/client'
import { createPost } from '../api/posts'

export function NewPostPage() {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await createPost({ imageUrl, caption })
      navigate('/posts')
    } catch (err) {
      const message =
        err instanceof ApiError
          ? `Backend rejected the request (${err.status}): ${err.message}`
          : 'Could not reach the backend — is insta_api running and CORS-enabled?'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-xl font-semibold">New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium text-slate-700">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="url"
            required
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-400">
            Must be a public URL — Instagram fetches the image server-side.
          </p>
        </div>

        <div>
          <label htmlFor="caption" className="mb-1 block text-sm font-medium text-slate-700">
            Caption
          </label>
          <textarea
            id="caption"
            rows={4}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-300"
        >
          {submitting ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </div>
  )
}
