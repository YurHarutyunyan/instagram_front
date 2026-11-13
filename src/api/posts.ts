import { mockPosts } from '../mocks/fixtures'
import type { Post } from '../types/post'
import { sleep } from './client'

// MOCK: backend has no GET /posts (list) endpoint yet — swap this body for
// apiFetch<Post[]>('/posts') once it exists.
export async function listPosts(): Promise<Post[]> {
  await sleep(300)
  return mockPosts
}

// MOCK: backend has no GET /posts/{mediaId} endpoint yet — swap this body
// for apiFetch<Post>(`/posts/${mediaId}`) once it exists.
export async function getPost(mediaId: string): Promise<Post | undefined> {
  await sleep(200)
  return mockPosts.find((post) => post.mediaId === mediaId)
}
