"use client"

import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, Linkedin, Copy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SocialSharingProps {
  eventTitle: string
  eventUrl: string
}

export function SocialSharing({ eventTitle, eventUrl }: SocialSharingProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const shareText = `Check out this amazing event: ${eventTitle}`
  const fullUrl = `${window.location.origin}${eventUrl}`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast({
        title: "Link copied!",
        description: "Event link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => openShareWindow(shareLinks.facebook)}
            >
              <Facebook className="h-4 w-4 mr-2 text-blue-600" />
              Facebook
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => openShareWindow(shareLinks.twitter)}
            >
              <Twitter className="h-4 w-4 mr-2 text-blue-400" />
              Twitter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => openShareWindow(shareLinks.linkedin)}
            >
              <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
              LinkedIn
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
