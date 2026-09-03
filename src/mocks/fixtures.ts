import type { Comment } from '../types/comment'
import type { Conversation } from '../types/message'
import type { Post } from '../types/post'

export const mockPosts: Post[] = [
  {
    mediaId: '17900000000000001',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600',
    caption: 'Bright smiles start here ✨ Book your free consultation this week!',
    permalink: 'https://www.instagram.com/p/Cxxxxxxxxx1/',
    createdAt: '2026-09-01T09:15:00Z',
  },
  {
    mediaId: '17900000000000002',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
    caption: 'Meet Dr. Sargsyan, our lead orthodontist. Ask us about invisible aligners!',
    permalink: 'https://www.instagram.com/p/Cxxxxxxxxx2/',
    createdAt: '2026-08-28T14:30:00Z',
  },
  {
    mediaId: '17900000000000003',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600',
    caption: 'Whitening special all September — 20% off for new patients.',
    permalink: 'https://www.instagram.com/p/Cxxxxxxxxx3/',
    createdAt: '2026-08-20T11:00:00Z',
  },
]

export const mockComments: Comment[] = [
  {
    id: 'c1',
    mediaId: '17900000000000001',
    text: 'Do you have appointments available tomorrow?',
    username: 'anna.k',
    timestamp: '2026-09-03T08:12:00Z',
    likeCount: 2,
    replied: false,
  },
  {
    id: 'c2',
    mediaId: '17900000000000001',
    text: 'How much does a consultation cost?',
    username: 'mher_92',
    timestamp: '2026-09-02T19:45:00Z',
    likeCount: 0,
    replied: false,
  },
  {
    id: 'c3',
    mediaId: '17900000000000002',
    text: 'Do you accept walk-ins?',
    username: 'lilit.h',
    timestamp: '2026-08-29T10:05:00Z',
    likeCount: 1,
    replied: true,
  },
  {
    id: 'c4',
    mediaId: '17900000000000003',
    text: 'Is the whitening offer available for existing patients too?',
    username: 'davit.gr',
    timestamp: '2026-08-21T16:20:00Z',
    likeCount: 4,
    replied: false,
  },
]

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participantUsername: 'anna.k',
    lastMessagePreview: 'Do you have appointments tomorrow?',
    lastMessageAt: '2026-09-03T08:10:00Z',
    unread: true,
    messages: [
      { id: 'm1', text: 'Hi! Do you have appointments tomorrow?', direction: 'inbound', timestamp: '2026-09-03T08:10:00Z' },
    ],
  },
  {
    id: 'conv2',
    participantUsername: 'mher_92',
    lastMessagePreview: 'Yes, we have availability at 3pm',
    lastMessageAt: '2026-09-02T19:50:00Z',
    unread: false,
    messages: [
      { id: 'm2', text: 'How much is a whitening session?', direction: 'inbound', timestamp: '2026-09-02T19:40:00Z' },
      { id: 'm3', text: 'It starts at 25,000 AMD — want me to book a consultation?', direction: 'outbound', timestamp: '2026-09-02T19:50:00Z' },
    ],
  },
  {
    id: 'conv3',
    participantUsername: 'lilit.h',
    lastMessagePreview: 'Thank you, see you then!',
    lastMessageAt: '2026-08-29T10:30:00Z',
    unread: false,
    messages: [
      { id: 'm4', text: 'Do you accept walk-ins?', direction: 'inbound', timestamp: '2026-08-29T10:05:00Z' },
      { id: 'm5', text: 'We recommend booking ahead, but we can usually fit you in!', direction: 'outbound', timestamp: '2026-08-29T10:15:00Z' },
      { id: 'm6', text: 'Thank you, see you then!', direction: 'inbound', timestamp: '2026-08-29T10:30:00Z' },
    ],
  },
]
