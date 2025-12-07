"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { calculateScore, storeQuizAttempt, generateQuizId } from "@/lib/quiz-utils"

interface QuizInterfaceProps {
  quiz: any
  userId: string
}

export function QuizInterface({ quiz, userId }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTimeWarning, setShowTimeWarning] = useState(false)
  const router = useRouter()

  const questions = quiz.questions
  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 60) setShowTimeWarning(true)
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true)

    try {
      const { score, percentage, correctCount } = calculateScore(questions, answers)
      const timeTaken = quiz.timeLimit - timeLeft

      const attempt = {
        id: generateQuizId(),
        quizId: quiz.id,
        answers,
        score: percentage,
        timeTaken,
        submittedAt: new Date(),
      }

      storeQuizAttempt(attempt)

      // Navigate to results with data
      const resultData = {
        score: percentage,
        correctCount,
        totalCount: questions.length,
        timeTaken,
        topicName: quiz.topicName,
      }

      router.push(`/quiz/${quiz.id}/results/${attempt.id}?data=${encodeURIComponent(JSON.stringify(resultData))}`)
    } catch (error) {
      console.error("Error submitting quiz:", error)
      alert("Failed to submit quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const answeredCount = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{quiz.title}</h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline">{quiz.topicName}</Badge>
                <Badge variant="secondary">Difficulty: {quiz.difficulty}/5</Badge>
              </div>
            </div>
            <div className={`text-right flex-shrink-0 p-3 rounded-lg ${showTimeWarning ? "bg-red-50" : "bg-gray-100"}`}>
              <div
                className={`flex items-center gap-2 text-lg font-mono ${showTimeWarning ? "text-red-600" : "text-gray-900"}`}
              >
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
              <p className={`text-sm ${showTimeWarning ? "text-red-600" : "text-gray-500"}`}>
                {showTimeWarning ? "Hurry up!" : "Time remaining"}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>{answeredCount} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{currentQ.question}</CardTitle>
            {currentQ.code && (
              <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto mt-4">
                <pre className="whitespace-pre-wrap">{currentQ.code}</pre>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option: string, index: number) => {
                const optionKey = String.fromCharCode(65 + index)
                const isSelected = answers[currentQuestion] === option

                return (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5 ${
                          isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"
                        }`}
                      >
                        {optionKey}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm sm:text-base break-words">{option}</span>
                      </div>
                      {isSelected && <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="w-full sm:w-auto bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentQuestion === totalQuestions - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1 sm:flex-none">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question Overview</CardTitle>
            <CardDescription>Click on any question to jump to it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {questions.map((_: any, index: number) => {
                const isAnswered = answers[index] !== undefined
                const isCurrent = index === currentQuestion

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-full aspect-square rounded-lg border-2 text-sm font-medium transition-all ${
                      isCurrent
                        ? "border-blue-500 bg-blue-500 text-white"
                        : isAnswered
                          ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
