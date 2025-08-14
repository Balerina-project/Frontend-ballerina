export interface Review {
  id: string
  eventId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: Date
  helpful: number
}

export interface EventRating {
  eventId: string
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}
