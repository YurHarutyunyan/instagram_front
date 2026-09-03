export type MessageDirection = 'inbound' | 'outbound'

export interface Message {
  id: string
  text: string
  direction: MessageDirection
  timestamp: string
}

export interface Conversation {
  id: string
  participantUsername: string
  lastMessagePreview: string
  lastMessageAt: string
  unread: boolean
  messages: Message[]
}
