"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { Review, EventRating } from "@/types/review"

interface EventReviewsProps {
  eventId: string
}

export function EventReviews({ eventId }: EventReviewsProps) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      eventId,
      userId: "user1",
      userName: "Sarah Johnson",
      rating: 5,
      comment: "Amazing event! Great organization and fantastic speakers. Would definitely attend again.",
      createdAt: new Date("2024-01-15"),
      helpful: 12,
    },
    {
      id: "2",
      eventId,
      userId: "user2",
      userName: "Mike Chen",
      rating: 4,
      comment: "Really enjoyed the workshop. The hands-on activities were very engaging.",
      createdAt: new Date("2024-01-14"),
      helpful: 8,
    },
  ])

  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const eventRating: EventRating = {
    eventId,
    averageRating: 4.5,
    totalReviews: reviews.length,
    ratingDistribution: { 5: 8, 4: 4, 3: 2, 2: 1, 1: 0 },
  }

  const handleSubmitReview = () => {
    if (!user || !newReview.comment.trim()) return

    const review: Review = {
      id: Date.now().toString(),
      eventId,
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date(),
      helpful: 0,
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: "" })
    setShowReviewForm(false)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews & Ratings</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{eventRating.averageRating}</span>
              {renderStars(Math.round(eventRating.averageRating))}
              <span className="text-sm text-muted-foreground">({eventRating.totalReviews} reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-8">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(eventRating.ratingDistribution[rating as keyof typeof eventRating.ratingDistribution] / eventRating.totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {eventRating.ratingDistribution[rating as keyof typeof eventRating.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Review */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {!showReviewForm ? (
              <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                </div>
                <div>
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea
                    placeholder="Share your thoughts about this event..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSubmitReview}>Submit Review</Button>
                  <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {review.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
