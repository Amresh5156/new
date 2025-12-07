"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp, Clock, Play, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { createQuiz } from "@/lib/quiz-utils"

interface UserProgress {
  id: string
  topic_id: string
  mastery_level: number
  topics?: {
    id: string
    name: string
    category: string
  }
}

interface StudySessionModalProps {
  isOpen: boolean
  onClose: () => void
  topicId: string
  topicName: string
}

function StudySessionModal({ isOpen, onClose, topicId, topicName }: StudySessionModalProps) {
  const [sessionTime, setSessionTime] = useState([30])
  const [difficulty, setDifficulty] = useState([3])
  const router = useRouter()

  if (!isOpen) return null

  const handleStartSession = () => {
    // Create a quick quiz with random questions from the topic
    const quiz = createQuiz(topicId, difficulty[0], 5) // 5 random questions
    const quizzes = JSON.parse(localStorage.getItem("generatedQuizzes") || "[]")
    quizzes.push(quiz)
    localStorage.setItem("generatedQuizzes", JSON.stringify(quizzes))
    router.push(`/quiz/${quiz.id}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Start Study Session: {topicName}</CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Session Duration: {sessionTime[0]} minutes
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={sessionTime[0]}
              onChange={(e) => setSessionTime([Number.parseInt(e.target.value)])}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Difficulty: {["Beginner", "Easy", "Medium", "Hard", "Expert"][difficulty[0] - 1]}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={difficulty[0]}
              onChange={(e) => setDifficulty([Number.parseInt(e.target.value)])}
              className="w-full"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-900">
            You'll receive 5 random questions from {topicName} with a {sessionTime[0]} minute timer.
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleStartSession} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function StudyPlanner({ userProgress }: { userProgress: UserProgress[] }) {
  const [showSessionModal, setShowSessionModal] = useState(false)

  // Get topics that need attention (low mastery level)
  const weakAreas = userProgress
    .filter((p) => p.mastery_level < 60)
    .sort((a, b) => a.mastery_level - b.mastery_level)
    .slice(0, 3)

  // Get topics in progress
  const inProgress = userProgress.filter((p) => p.mastery_level >= 20 && p.mastery_level < 80).slice(0, 3)

  // Get recommended topic for today's session
  const todaysTopic = weakAreas.length > 0 ? weakAreas[0] : inProgress.length > 0 ? inProgress[0] : userProgress[0]

  return (
    <div className="space-y-6">
      <StudySessionModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        topicId={todaysTopic?.topic_id || ""}
        topicName={todaysTopic?.topics?.name || "Topic"}
      />

      {/* Today's Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Today's Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">30 min session</span>
            </div>
            <p className="text-sm text-blue-800">Focus on {todaysTopic?.topics?.name || "DSA Fundamentals"}</p>
            <Button
              size="sm"
              className="mt-2 bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => setShowSessionModal(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Session
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 text-sm">Recommended Actions:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Complete 5 random practice problems</li>
              <li>• Review weak concepts</li>
              <li>• Focus on {todaysTopic?.topics?.name}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Weak Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-600" />
            Areas Needing Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weakAreas.length === 0 ? (
            <p className="text-gray-600 text-sm">Great job! No weak areas identified.</p>
          ) : (
            <div className="space-y-3">
              {weakAreas.map((progress) => (
                <div key={progress.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">{progress.topics?.name}</p>
                    <p className="text-xs text-red-700">{Math.round(progress.mastery_level)}% mastery</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Priority
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* In Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          {inProgress.length === 0 ? (
            <p className="text-gray-600 text-sm">No topics in progress.</p>
          ) : (
            <div className="space-y-3">
              {inProgress.map((progress) => (
                <div key={progress.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-orange-900">{progress.topics?.name}</p>
                    <p className="text-xs text-orange-700">{Math.round(progress.mastery_level)}% complete</p>
                  </div>
                  <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}