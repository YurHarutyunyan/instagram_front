import { formatTime } from '../lib/format'
import type { Message } from '../types/message'

const labels: Record<Message['kind'], string> = {
  inbound: 'Customer',
  auto: 'Sent automatically',
  manual: 'Sent by you from this dashboard',
}

export function MessageBubble({ message }: { message: Message }) {
  const outbound = message.kind !== 'inbound'
  return (
    <div className={`flex flex-col ${outbound ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-md whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
          message.kind === 'inbound'
            ? 'bg-slate-100 text-slate-800'
            : message.kind === 'auto'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-white'
        }`}
      >
        {message.text}
      </div>
      <p className="mt-0.5 text-[11px] text-slate-400">
        {labels[message.kind]} · {formatTime(message.timestamp)}
      </p>
    </div>
  )
}
