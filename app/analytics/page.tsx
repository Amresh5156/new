import { MainNav } from "@/components/main-nav"
import { AnalyticsHeader } from "@/components/analytics-header"
import { WeakAreasAnalysis } from "@/components/weak-areas-analysis"
import { LearningInsights } from "@/components/learning-insights"
import { PerformanceTrends } from "@/components/performance-trends"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { mockProgress, mockRecentActivity } from "@/lib/mock-data"

export default async function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <AnalyticsHeader user={{ email: "demo@example.com" }} profile={{ full_name: "Demo User", avatar_url: null }} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <WeakAreasAnalysis progressData={mockProgress} quizAttempts={mockRecentActivity} userId="demo-user" />

          <div className="grid lg:grid-cols-2 gap-8">
            <LearningInsights progressData={mockProgress} quizAttempts={mockRecentActivity} />
            <PerformanceTrends quizAttempts={mockRecentActivity} />
          </div>

          <PersonalizedRecommendations progressData={mockProgress} userId="demo-user" />
        </div>
      </main>
    </div>
  )
}
