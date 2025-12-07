import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { quizId, answers, timeTaken, userId } = await request.json()

    if (!quizId || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock quiz questions for scoring
    const mockQuestions = [
      {
        question: "What is the time complexity of accessing an element in an array by index?",
        correct_answer: "O(1)",
      },
      {
        question: "Which sorting algorithm has O(n log n) time complexity in the best, average, and worst cases?",
        correct_answer: "Merge Sort",
      },
      {
        question: "In a binary search tree, what is the average time complexity of search operation?",
        correct_answer: "O(log n)",
      },
      {
        question: "What data structure uses LIFO (Last In First Out) principle?",
        correct_answer: "Stack",
      },
      {
        question: "Which of the following is NOT a valid time complexity?",
        correct_answer: "O(√n)",
      },
    ]

    // Calculate score
    let correctCount = 0
    const detailedAnswers: any[] = []

    mockQuestions.forEach((question: any, index: number) => {
      const userAnswer = answers[index]
      const isCorrect = userAnswer === question.correct_answer

      if (isCorrect) {
        correctCount++
      }

      detailedAnswers.push({
        question: question.question,
        user_answer: userAnswer,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
      })
    })

    const score = Math.round((correctCount / mockQuestions.length) * 100)
    const attemptId = `attempt-${Date.now()}`

    console.log("[v0] Quiz submitted - Score:", score, "Correct:", correctCount, "Total:", mockQuestions.length)

    return NextResponse.json({
      attemptId,
      score,
      correctCount,
      totalQuestions: mockQuestions.length,
      answers: detailedAnswers,
    })
  } catch (error) {
    console.error("[v0] Error submitting quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
