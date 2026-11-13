import { useState } from 'react'

export function ReplyComposer({
  onSend,
  placeholder = 'Write a reply…',
  hint,
  buttonLabel = 'Send',
}: {
  onSend: (text: string) => Promise<void>
  placeholder?: string
  // One line under the box saying exactly what pressing the button does.
  hint?: string
  buttonLabel?: string
}) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    setError(null)
    try {
      await onSend(trimmed)
      setText('')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="border-t border-slate-200 pt-3">
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={placeholder}
          rows={2}
          disabled={sending}
          className="flex-1 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              void handleSend()
            }
          }}
        />
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={sending || !text.trim()}
          title={hint}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {sending ? 'Sending…' : buttonLabel}
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
