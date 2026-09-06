import { useState } from 'react'

export function ReplyComposer({
  onSend,
  disabled,
  placeholder = 'Write a reply…',
}: {
  onSend: (text: string) => void | Promise<void>
  disabled?: boolean
  placeholder?: string
}) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    try {
      await onSend(trimmed)
      setText('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex items-end gap-2 border-t border-blue-200 pt-3">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
        rows={2}
        disabled={disabled || sending}
        className="flex-1 resize-none rounded-md border border-blue-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-blue-100"
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
        disabled={disabled || sending || !text.trim()}
        className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {sending ? 'Sending…' : 'Send'}
      </button>
    </div>
  )
}
