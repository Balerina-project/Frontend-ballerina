export interface Event {
  id: string
  title: string
  description: string
  category: "community" | "sports" | "workshop" | "concert" | "performance"
  date: string
  time: string
  location: string
  address: string
  price: number
  maxAttendees: number
  currentAttendees: number
  imageUrl: string
  organizer: {
    name: string
    email: string
  }
  tags: string[]
  featured: boolean
}

export interface EventCategory {
  id: string
  name: string
  icon: string
  color: string
}
