import { type NextRequest, NextResponse } from "next/server"
import { mockQuestions } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { topicId, difficulty, questionCount } = await request.json()

    if (!topicId) {
      return NextResponse.json({ error: "Topic ID required" }, { status: 400 })
    }

    // Shuffle and filter questions based on difficulty
    const filteredQuestions = mockQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(questionCount || 5, mockQuestions.length))

    const quiz = {
      id: `quiz-${Date.now()}`,
      title: `Quiz - Level ${difficulty || 1}`,
      difficulty_level: difficulty || 1,
      questions: filteredQuestions,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({ quizId: quiz.id, quiz })
  } catch (error) {
    console.error("[v0] Error generating quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
