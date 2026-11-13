import type { Comment } from '../types/comment'
import type { Message } from '../types/message'
import { apiFetch } from './client'

export function listComments(): Promise<Comment[]> {
  return apiFetch<Comment[]>('/dashboard/comments')
}

export function replyToComment(commentId: number, text: string): Promise<Message> {
  return apiFetch<Message>(`/dashboard/comments/${commentId}/replies`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}
