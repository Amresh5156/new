"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Database, Play, AlertCircle, BookOpen } from "lucide-react"
import Link from "next/link"

interface TopicProgressProps {
  progressData: any[]
}

export function TopicProgress({ progressData }: TopicProgressProps) {
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-800"
      case 2:
        return "bg-blue-100 text-blue-800"
      case 3:
        return "bg-yellow-100 text-yellow-800"
      case 4:
        return "bg-orange-100 text-orange-800"
      case 5:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Easy"
      case 3:
        return "Medium"
      case 4:
        return "Hard"
      case 5:
        return "Expert"
      default:
        return "Unknown"
    }
  }

  const getCategoryIcon = (category: string) => {
    return category === "coding" ? Code : Database
  }

  const getWeakAreas = (weakAreas: any) => {
    if (!weakAreas || !Array.isArray(weakAreas) || weakAreas.length === 0) {
      return []
    }
    return weakAreas
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Progress</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Your mastery level across different coding and DSA topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!progressData || progressData.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No progress yet</h3>
            <p className="text-sm text-gray-500 mb-4">Start taking quizzes to track your progress</p>
            <Link href="/quiz">
              <Button size="sm">Take Your First Quiz</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {progressData.map((progress) => {
              const category = progress.topics?.category || "coding"
              const Icon = getCategoryIcon(category)
              const masteryPercentage = Math.round((progress.mastery_level || 0) * 100)
              const accuracy =
                progress.total_attempts > 0
                  ? Math.round((progress.correct_attempts / progress.total_attempts) * 100)
                  : 0
              const weakAreas = getWeakAreas(progress.weak_areas)

              return (
                <div key={progress.id} className="p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900 break-words">
                          {progress.topics?.name || "Unknown Topic"}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`${getDifficultyColor(progress.topics?.difficulty_level || 3)} text-xs`}
                          >
                            {getDifficultyLabel(progress.topics?.difficulty_level || 3)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {category.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Link href="/quiz" className="w-full sm:w-auto">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                        Practice
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3">
                    <div>
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-600">Mastery</span>
                        <span className="font-medium">{masteryPercentage}%</span>
                      </div>
                      <Progress value={masteryPercentage} className="h-1.5 md:h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-600">Accuracy</span>
                        <span className="font-medium">{accuracy}%</span>
                      </div>
                      <Progress value={accuracy} className="h-1.5 md:h-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-600">
                    <span>{progress.total_attempts} attempts</span>
                    <span className="break-words">
                      Last practiced:{" "}
                      {progress.last_practiced ? new Date(progress.last_practiced).toLocaleDateString() : "Never"}
                    </span>
                  </div>

                  {weakAreas.length > 0 && (
                    <div className="mt-3 p-2 bg-orange-50 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-3 w-3 text-orange-600 flex-shrink-0" />
                        <span className="text-xs font-medium text-orange-800">Areas to improve:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {weakAreas.map((area: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs bg-orange-100 text-orange-700">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}