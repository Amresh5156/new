import { MainNav } from "@/components/main-nav"
import { ContentHeader } from "@/components/content-header"
import { ContentLibrary } from "@/components/content-library"
import { StudyPlanner } from "@/components/study-planner"
import { mockTopics, mockProgress } from "@/lib/mock-data"

export default async function ContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <ContentHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ContentLibrary topics={mockTopics} userProgress={mockProgress} />
          </div>
          <div>
            <StudyPlanner userProgress={mockProgress} />
          </div>
        </div>
      </div>
    </div>
  )
}
