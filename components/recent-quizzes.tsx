import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Play, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface RecentQuizzesProps {
  quizzes: any[]
}

export function RecentQuizzes({ quizzes }: RecentQuizzesProps) {
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
        <CardTitle>Recent Quizzes</CardTitle>
        <CardDescription>Your quiz history and performance</CardDescription>
      </CardHeader>
      <CardContent>
        {quizzes.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-4">No quizzes taken yet</p>
            <p className="text-xs text-gray-400">Start with your first quiz above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((attempt) => {
              const ScoreIcon = getScoreIcon(attempt.score)
              return (
                <div key={attempt.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{attempt.quizzes.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {attempt.quizzes.topics.category.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(attempt.completed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getScoreColor(attempt.score)}>{Math.round(attempt.score)}%</Badge>
                      <ScoreIcon className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {attempt.time_taken ? `${Math.round(attempt.time_taken / 60)} min` : "N/A"}
                    </span>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/quiz/${attempt.quizzes.id}/review`}>
                        <Play className="h-3 w-3 mr-1" />
                        Review
                      </Link>
                    </Button>
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
