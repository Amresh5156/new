"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Trophy, BookOpen, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface QuizResultsProps {
  attempt: any
  userId: string
}

export function QuizResults({ attempt, userId }: QuizResultsProps) {
  const router = useRouter()
  const quiz = attempt.quizzes
  const answers = attempt.answers
  const score = attempt.score
  const timeTaken = attempt.time_taken

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "bg-green-100 text-green-800" }
    if (score >= 80) return { label: "Good", color: "bg-blue-100 text-blue-800" }
    if (score >= 60) return { label: "Fair", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" }
  }

  const correctCount = answers.filter((a: any) => a.is_correct).length
  const totalQuestions = answers.length
  const scoreBadge = getScoreBadge(score)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-gray-600">{quiz.title}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="outline">{quiz.topics.category.toUpperCase()}</Badge>
          <Badge variant="secondary">Level {quiz.difficulty_level}</Badge>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            <span className={getScoreColor(score)}>{Math.round(score)}%</span>
          </CardTitle>
          <CardDescription>
            <Badge className={scoreBadge.color}>{scoreBadge.label}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {correctCount}/{totalQuestions}
              </div>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                <Clock className="h-5 w-5" />
                {formatTime(timeTaken)}
              </div>
              <p className="text-sm text-gray-600">Time Taken</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((correctCount / totalQuestions) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
          </div>
          <div className="mt-6">
            <Progress value={score} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <CardDescription>Review your answers and explanations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {answers.map((answer: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0">
                    {answer.is_correct ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {answer.question}
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Your answer:</span>
                        <span className={answer.is_correct ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {answer.user_answer || "Not answered"}
                        </span>
                      </div>

                      {!answer.is_correct && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Correct answer:</span>
                          <span className="text-green-600 font-medium">{answer.correct_answer}</span>
                        </div>
                      )}

                      {answer.explanation && (
                        <div className="bg-blue-50 p-3 rounded-lg mt-2">
                          <p className="text-blue-800 text-sm">{answer.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => router.push("/quiz")} variant="outline" size="lg">
          <BookOpen className="h-4 w-4 mr-2" />
          Take Another Quiz
        </Button>
        <Button asChild size="lg">
          <Link href="/dashboard">
            View Progress
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
