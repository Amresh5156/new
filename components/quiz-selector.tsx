"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Code, Database, Brain, Play, Settings, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createQuiz } from "@/lib/quiz-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QuizSelectorProps {
  topics: any[]
  userId: string
}

export function QuizSelector({ topics, userId }: QuizSelectorProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [difficulty, setDifficulty] = useState([3])
  const [questionCount, setQuestionCount] = useState([10])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const codingTopics = topics.filter((t) => t.category === "coding")
  const dsaTopics = topics.filter(
    (t) => t.category === "data structures" || t.category === "dsa" || t.category === "Data Structures",
  )

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
        return "Medium"
    }
  }

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

  const handleGenerateQuiz = async () => {
    if (!selectedTopic) {
      setError("Please select a topic to continue")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Find the selected topic
      const topic = topics.find((t) => t.id === selectedTopic)
      if (!topic) {
        setError("Topic not found")
        setIsGenerating(false)
        return
      }

      // Create quiz locally
      const quiz = createQuiz(selectedTopic, difficulty[0], questionCount[0])

      // Store quiz in local storage
      const quizzes = JSON.parse(localStorage.getItem("generatedQuizzes") || "[]")
      quizzes.push(quiz)
      localStorage.setItem("generatedQuizzes", JSON.stringify(quizzes))

      // Navigate to quiz
      router.push(`/quiz/${quiz.id}`)
    } catch (error) {
      console.error("[v0] Error generating quiz:", error)
      setError("Failed to generate quiz. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Topic Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Select Topic
          </CardTitle>
          <CardDescription>Choose a topic to practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Coding Topics */}
          {codingTopics.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Coding Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {codingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTopic === topic.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm flex-1">{topic.name}</h4>
                      <Badge className={`${getDifficultyColor(topic.difficulty_level)} whitespace-nowrap`}>
                        {getDifficultyLabel(topic.difficulty_level)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DSA Topics */}
          {dsaTopics.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Structures & Algorithms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dsaTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTopic === topic.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm flex-1">{topic.name}</h4>
                      <Badge className={`${getDifficultyColor(topic.difficulty_level)} whitespace-nowrap`}>
                        {getDifficultyLabel(topic.difficulty_level)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quiz Settings
          </CardTitle>
          <CardDescription>Customize your quiz experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Difficulty Level: {getDifficultyLabel(difficulty[0])}
            </label>
            <Slider value={difficulty} onValueChange={setDifficulty} max={5} min={1} step={1} className="w-full" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Number of Questions: {questionCount[0]}
            </label>
            <Slider
              value={questionCount}
              onValueChange={setQuestionCount}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
          </div>

          <Button onClick={handleGenerateQuiz} disabled={!selectedTopic || isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              "Generating Quiz..."
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Generate AI Quiz
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}