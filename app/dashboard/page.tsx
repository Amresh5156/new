import { MainNav } from "@/components/main-nav"
import { ProgressOverview } from "@/components/progress-overview"
import { TopicProgress } from "@/components/topic-progress"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { mockProgress, mockRecentActivity } from "@/lib/mock-data"

export default function DashboardPage() {
  const totalTopics = mockProgress.length
  const averageMastery =
    mockProgress.length > 0
      ? Math.round((mockProgress.reduce((sum, p) => sum + (p.mastery_level || 0), 0) / mockProgress.length) * 100)
      : 0
  const totalAttempts = mockProgress.reduce((sum, p) => sum + (p.total_attempts || 0), 0)
  const overallAccuracy =
    totalAttempts > 0
      ? Math.round((mockProgress.reduce((sum, p) => sum + (p.correct_attempts || 0), 0) / totalAttempts) * 100)
      : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
          <p className="text-lg text-gray-600">Start your adaptive learning journey</p>
        </div>

        <div className="grid gap-8">
          <ProgressOverview
            totalTopics={totalTopics}
            averageMastery={averageMastery}
            overallAccuracy={overallAccuracy}
            totalAttempts={totalAttempts}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TopicProgress progressData={mockProgress} />
            </div>

            <div className="space-y-6">
              <QuickActions />
              <RecentActivity recentQuizzes={mockRecentActivity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
