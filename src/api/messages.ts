import { mockConversations } from '../mocks/fixtures'
import type { Conversation, Message } from '../types/message'
import { sleep } from './client'

// MOCK: backend has no conversation-listing endpoint yet.
export async function listConversations(): Promise<Conversation[]> {
  await sleep(300)
  return mockConversations
}

// MOCK: backend has no conversation-detail endpoint yet.
export async function getConversation(conversationId: string): Promise<Conversation | undefined> {
  await sleep(200)
  return mockConversations.find((conversation) => conversation.id === conversationId)
}

// MOCK: backend has no manual reply-to-DM endpoint yet — today replies only
// happen automatically via the /webhook -> ReplyRulesService flow.
export async function replyToMessage(conversationId: string, text: string): Promise<Message> {
  await sleep(300)
  const conversation = mockConversations.find((c) => c.id === conversationId)
  const message: Message = {
    id: `m${Date.now()}`,
    text,
    direction: 'outbound',
    timestamp: new Date().toISOString(),
  }
  if (conversation) {
    conversation.messages.push(message)
    conversation.lastMessagePreview = text
    conversation.lastMessageAt = message.timestamp
    conversation.unread = false
  }
  return message
}
