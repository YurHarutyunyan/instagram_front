// inbound: the customer; auto: our automatic reply; manual: typed and sent from this dashboard.
export type MessageKind = 'inbound' | 'auto' | 'manual'

export interface Message {
  id: string
  kind: MessageKind
  text: string
  timestamp: string
  status: string | null
}

export interface Conversation {
  id: number
  username: string | null
  instagramUserId: string
  lastMessageAt: string
  messages: Message[]
}
