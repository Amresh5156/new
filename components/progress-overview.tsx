import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, BookOpen, Award } from "lucide-react"

interface ProgressOverviewProps {
  totalTopics: number
  averageMastery: number
  overallAccuracy: number
  totalAttempts: number
}

export function ProgressOverview({
  totalTopics,
  averageMastery,
  overallAccuracy,
  totalAttempts,
}: ProgressOverviewProps) {
  const masteryPercentage = Math.round((averageMastery || 0) * 100) || 0
  const accuracyValue = Math.round(overallAccuracy || 0) || 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">Topics Studied</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{totalTopics || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">Across coding & DSA</p>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">Average Mastery</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{masteryPercentage}%</div>
          <Progress value={masteryPercentage} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">Overall Accuracy</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{accuracyValue}%</div>
          <Progress value={accuracyValue} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">Total Attempts</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{totalAttempts || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">Quiz attempts</p>
        </CardContent>
      </Card>
    </div>
  )
}