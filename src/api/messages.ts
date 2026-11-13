import type { Conversation, Message } from '../types/message'
import { apiFetch } from './client'

export function listConversations(): Promise<Conversation[]> {
  return apiFetch<Conversation[]>('/dashboard/conversations')
}

export function sendMessage(conversationId: number, text: string): Promise<Message> {
  return apiFetch<Message>(`/dashboard/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}
