import { mockComments } from '../mocks/fixtures'
import type { Comment } from '../types/comment'
import { sleep } from './client'

// MOCK: backend has no GET /posts/{mediaId}/comments endpoint yet.
export async function listComments(mediaId?: string): Promise<Comment[]> {
  await sleep(300)
  return mediaId ? mockComments.filter((comment) => comment.mediaId === mediaId) : mockComments
}

// MOCK: backend has no manual reply-to-comment endpoint yet — today replies
// only happen automatically via the /webhook -> ReplyRulesService flow.
export async function replyToComment(commentId: string, _text: string): Promise<void> {
  await sleep(300)
  const comment = mockComments.find((c) => c.id === commentId)
  if (comment) comment.replied = true
}
