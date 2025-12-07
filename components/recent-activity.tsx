import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown } from "lucide-react"

interface RecentActivityProps {
  recentQuizzes: any[]
}

export function RecentActivity({ recentQuizzes }: RecentActivityProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreIcon = (score: number) => {
    return score >= 70 ? TrendingUp : TrendingDown
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your latest quiz attempts</CardDescription>
      </CardHeader>
      <CardContent>
        {!recentQuizzes || recentQuizzes.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {recentQuizzes.map((attempt) => {
              if (!attempt || !attempt.quizzes) return null
              const score = Math.round(attempt.score || 0) || 0
              const ScoreIcon = getScoreIcon(score)
              return (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-gray-50 transition-colors gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs sm:text-sm break-words">{attempt.quizzes.title || "Quiz"}</h4>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {attempt.quizzes.topics?.category?.toUpperCase() || "GENERAL"}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {attempt.completed_at ? new Date(attempt.completed_at).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`${getScoreColor(score)} text-xs`}>{score}%</Badge>
                    <ScoreIcon className="h-3 w-3 text-gray-400" />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}