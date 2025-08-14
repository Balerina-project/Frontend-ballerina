"use client"

import { Badge } from "@/components/ui/badge"
import { eventCategories } from "@/lib/mock-events"
import { Users, Trophy, BookOpen, Music, Theater } from "lucide-react"

interface EventCategoriesProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

const iconMap = {
  Users,
  Trophy,
  BookOpen,
  Music,
  Theater,
}

export function EventCategories({ selectedCategory, onCategorySelect }: EventCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Badge
        variant={selectedCategory === null ? "default" : "outline"}
        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        onClick={() => onCategorySelect(null)}
      >
        All Events
      </Badge>
      {eventCategories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap]
        return (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-1"
            onClick={() => onCategorySelect(category.id)}
          >
            <IconComponent className="h-3 w-3" />
            {category.name}
          </Badge>
        )
      })}
    </div>
  )
}
