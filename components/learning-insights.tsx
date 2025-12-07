import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Target, Award, Brain } from "lucide-react"

interface LearningInsightsProps {
  progressData: any[]
  quizAttempts: any[]
}

export function LearningInsights({ progressData, quizAttempts }: LearningInsightsProps) {
  // Calculate learning insights
  const totalAttempts = quizAttempts.length
  const averageScore =
    totalAttempts > 0 ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts : 0

  const recentAttempts = quizAttempts.slice(0, 5)
  const recentAverageScore =
    recentAttempts.length > 0
      ? recentAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / recentAttempts.length
      : 0

  const improvement = recentAverageScore - averageScore

  // Learning patterns analysis
  const categoryPerformance = progressData.reduce(
    (acc, progress) => {
      const category = progress.topics.category
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0, mastery: 0 }
      }
      acc[category].total += progress.mastery_level
      acc[category].count += 1
      acc[category].mastery = acc[category].total / acc[category].count
      return acc
    },
    {} as Record<string, any>,
  )

  const strongestCategory = Object.entries(categoryPerformance).sort(([, a], [, b]) => b.mastery - a.mastery)[0]

  const weakestCategory = Object.entries(categoryPerformance).sort(([, a], [, b]) => a.mastery - b.mastery)[0]

  // Study patterns
  const studyStreak = calculateStudyStreak(quizAttempts)
  const averageSessionTime = calculateAverageSessionTime(quizAttempts)
  const preferredDifficulty = calculatePreferredDifficulty(quizAttempts)

  const insights = [
    {
      icon: TrendingUp,
      title: "Performance Trend",
      value: improvement > 0 ? `+${improvement.toFixed(1)}%` : `${improvement.toFixed(1)}%`,
      description: improvement > 0 ? "Improving over recent attempts" : "Needs attention",
      color: improvement > 0 ? "text-green-600" : "text-red-600",
      bgColor: improvement > 0 ? "bg-green-100" : "bg-red-100",
    },
    {
      icon: Target,
      title: "Strongest Area",
      value: strongestCategory ? strongestCategory[0] : "N/A",
      description: strongestCategory ? `${Math.round(strongestCategory[1].mastery * 100)}% mastery` : "No data",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Brain,
      title: "Focus Area",
      value: weakestCategory ? weakestCategory[0] : "N/A",
      description: weakestCategory ? `${Math.round(weakestCategory[1].mastery * 100)}% mastery` : "No data",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Award,
      title: "Study Streak",
      value: `${studyStreak} days`,
      description: studyStreak > 7 ? "Excellent consistency!" : "Build your streak",
      color: studyStreak > 7 ? "text-green-600" : "text-gray-600",
      bgColor: studyStreak > 7 ? "bg-green-100" : "bg-gray-100",
    },
    {
      icon: Clock,
      title: "Avg Session",
      value: `${averageSessionTime} min`,
      description: "Time per quiz session",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Learning Insights
        </CardTitle>
        <CardDescription>AI-powered analysis of your learning patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <span className={`font-semibold ${insight.color}`}>{insight.value}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Learning Recommendations */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">AI Recommendations</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {improvement < 0 && <li>• Focus on reviewing incorrect answers to improve performance</li>}
            {studyStreak < 3 && <li>• Try to maintain a consistent daily study schedule</li>}
            {averageScore < 70 && <li>• Consider starting with easier difficulty levels to build confidence</li>}
            {averageScore > 85 && <li>• Challenge yourself with higher difficulty levels</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function calculateStudyStreak(quizAttempts: any[]): number {
  if (quizAttempts.length === 0) return 0

  const dates = quizAttempts
    .map((attempt) => new Date(attempt.completed_at).toDateString())
    .filter((date, index, arr) => arr.indexOf(date) === index)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  let streak = 0
  const today = new Date().toDateString()

  for (let i = 0; i < dates.length; i++) {
    const expectedDate = new Date()
    expectedDate.setDate(expectedDate.getDate() - i)

    if (dates[i] === expectedDate.toDateString()) {
      streak++
    } else {
      break
    }
  }

  return streak
}

function calculateAverageSessionTime(quizAttempts: any[]): number {
  if (quizAttempts.length === 0) return 0

  const totalTime = quizAttempts
    .filter((attempt) => attempt.time_taken)
    .reduce((sum, attempt) => sum + attempt.time_taken, 0)

  const validAttempts = quizAttempts.filter((attempt) => attempt.time_taken).length

  return validAttempts > 0 ? Math.round(totalTime / validAttempts / 60) : 0
}

function calculatePreferredDifficulty(quizAttempts: any[]): number {
  if (quizAttempts.length === 0) return 3

  const difficulties = quizAttempts.map((attempt) => attempt.quizzes.difficulty_level)
  const sum = difficulties.reduce((a, b) => a + b, 0)

  return Math.round(sum / difficulties.length)
}
