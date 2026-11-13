import type { Message } from './message'

export interface PostInfo {
  mediaId: string
  caption: string | null
  imageUrl: string | null
  permalink: string | null
}

export interface Comment {
  id: number
  username: string | null
  text: string
  timestamp: string
  autoReply: string | null
  status: string | null
  replies: Message[]
  post: PostInfo | null
}
