import { MainNav } from "@/components/main-nav"
import { QuizSelector } from "@/components/quiz-selector"
import { RecentQuizzes } from "@/components/recent-quizzes"
import { mockTopics, mockRecentActivity } from "@/lib/mock-data"

export default async function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Quizzes</h1>
          <p className="text-gray-600">Test your knowledge with AI-generated personalized quizzes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuizSelector topics={mockTopics} userId="demo-user" />
          </div>
          <div>
            <RecentQuizzes quizzes={mockRecentActivity} />
          </div>
        </div>
      </div>
    </div>
  )
}
