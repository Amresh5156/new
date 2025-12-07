import { MainNav } from "@/components/main-nav"
import { RecommendationsHeader } from "@/components/recommendations-header"
import { YouTubeRecommendations } from "@/components/youtube-recommendations"
import { GitHubRecommendations } from "@/components/github-recommendations"
import { RecommendationFilters } from "@/components/recommendation-filters"
import { mockProgress, mockRecommendations } from "@/lib/mock-data"

export default async function RecommendationsPage() {
  const youtubeRecs = mockRecommendations.filter((rec) => rec.type === "youtube")
  const githubRecs = mockRecommendations.filter((rec) => rec.type === "github")

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <RecommendationsHeader
        user={{ email: "demo@example.com" }}
        profile={{ full_name: "Demo User", avatar_url: null }}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <RecommendationFilters progressData={mockProgress} userId="demo-user" />

          <div className="grid lg:grid-cols-2 gap-8">
            <YouTubeRecommendations recommendations={youtubeRecs} progressData={mockProgress} userId="demo-user" />

            <GitHubRecommendations recommendations={githubRecs} progressData={mockProgress} userId="demo-user" />
          </div>
        </div>
      </main>
    </div>
  )
}
