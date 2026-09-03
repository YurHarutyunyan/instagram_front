import { mockPosts } from '../mocks/fixtures'
import type { CreatePostRequest, CreatePostResponse, Post } from '../types/post'
import { apiFetch, sleep } from './client'

// REAL: backend implements POST /posts today (see insta_api PostController).
export async function createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
  return apiFetch<CreatePostResponse>('/posts', {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

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
