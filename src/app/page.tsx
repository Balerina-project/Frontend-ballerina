import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, MapPin, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">EventHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/events">
              <Button variant="ghost">Browse Events</Button>
            </Link>
            <Link href="/calendar">
              <Button variant="ghost">Calendar</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Join Your Community:
          <br />
          <span className="text-primary">Discover, Connect, and Participate!</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Uncover exciting local events tailored just for you. Dive into workshops, sports, and performances that unite
          our community!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-3">
              Register Now to Secure Your Spot!
            </Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Browse Events
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose EventHub?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Diverse Events</h4>
              <p className="text-gray-600">From workshops to concerts, find events that match your interests</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Community Focus</h4>
              <p className="text-gray-600">Connect with like-minded people in your local area</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Local Discovery</h4>
              <p className="text-gray-600">Find events happening right in your neighborhood</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Easy Registration</h4>
              <p className="text-gray-600">Simple one-click registration for all your favorite events</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of community members discovering amazing local events
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Create Your Account Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-6 w-6" />
            <span className="text-xl font-bold">EventHub</span>
          </div>
          <p className="text-gray-400">Connecting communities through local events and activities</p>
        </div>
      </footer>
    </div>
  )
}
