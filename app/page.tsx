import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, Target, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Tech Tutor</span>
          </div>
          <div className="flex items-center gap-4"></div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Coding & DSA with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI-Powered Learning
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized quizzes, track your progress, and receive intelligent recommendations tailored to your
            learning style and weak areas.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/dashboard">Start Learning Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Tech Tutor?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI tutor adapts to your learning pace and identifies areas for improvement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-blue-100 rounded-lg w-fit">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Machine learning algorithms identify your weak areas and adapt content accordingly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-green-100 rounded-lg w-fit">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Personalized Quizzes</CardTitle>
              <CardDescription>Auto-generated quizzes based on your progress and learning gaps</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-purple-100 rounded-lg w-fit">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Detailed analytics and insights into your learning journey</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-orange-100 rounded-lg w-fit">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>Curated YouTube tutorials and GitHub repos based on your needs</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-red-100 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>AI-generated study notes that evolve with your understanding</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-2 bg-teal-100 rounded-lg w-fit">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle>Comprehensive Coverage</CardTitle>
              <CardDescription>From basic programming concepts to advanced data structures</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already improving their skills with AI
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8">
            <Link href="/dashboard">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-600 rounded">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Tech Tutor</span>
          </div>
          <p className="text-sm text-gray-600">© 2025 Tech Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
