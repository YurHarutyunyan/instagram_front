export interface Post {
  mediaId: string
  imageUrl: string
  caption: string
  permalink: string
  createdAt: string
}

export interface CreatePostRequest {
  imageUrl: string
  caption: string
}

export interface CreatePostResponse {
  mediaId: string
  permalink: string
}
