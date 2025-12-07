import { mockQuestions, mockTopics } from "./mock-data"

export interface GeneratedQuiz {
  id: string
  title: string
  topicId: string
  topicName: string
  difficulty: number
  questionCount: number
  questions: QuizQuestion[]
  createdAt: Date
  timeLimit: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: string
  explanation: string
  code?: string
}

export interface QuizAttempt {
  id: string
  quizId: string
  answers: Record<number, string>
  score: number
  timeTaken: number
  submittedAt: Date
}

// Generate a unique quiz ID
export function generateQuizId(): string {
  return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get a topic by ID
export function getTopicById(topicId: string) {
  return mockTopics.find((t) => t.id === topicId)
}

// Generate quiz questions with difficulty-based filtering
export function generateQuizQuestions(topicId: string, difficulty: number, count: number): QuizQuestion[] {
  const topic = getTopicById(topicId)
  if (!topic) return []

  // In real implementation, this would filter questions by topic and difficulty
  // For now, shuffle and return the requested count
  const shuffled = mockQuestions.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Create a new quiz
export function createQuiz(topicId: string, difficulty: number, questionCount: number): GeneratedQuiz {
  const topic = getTopicById(topicId)
  if (!topic) throw new Error("Topic not found")

  const questions = generateQuizQuestions(topicId, difficulty, questionCount)
  const timePerQuestion = 60 // seconds
  const totalTime = timePerQuestion * questions.length

  return {
    id: generateQuizId(),
    title: `${topic.name} Quiz - ${["Beginner", "Easy", "Medium", "Hard", "Expert"][difficulty - 1]}`,
    topicId,
    topicName: topic.name,
    difficulty,
    questionCount: questions.length,
    questions,
    createdAt: new Date(),
    timeLimit: totalTime,
  }
}

// Calculate quiz score
export function calculateScore(
  questions: QuizQuestion[],
  answers: Record<number, string>,
): { score: number; percentage: number; correctCount: number } {
  let correctCount = 0

  questions.forEach((question, index) => {
    if (answers[index] === question.correct_answer) {
      correctCount++
    }
  })

  const percentage = Math.round((correctCount / questions.length) * 100)
  const score = correctCount

  return { score, percentage, correctCount }
}

// Get performance feedback
export function getPerformanceFeedback(percentage: number): string {
  if (percentage >= 90) return "Excellent! You have mastered this topic."
  if (percentage >= 80) return "Great work! You have a strong understanding."
  if (percentage >= 70) return "Good! You understand the core concepts."
  if (percentage >= 60) return "Fair. Keep practicing to improve."
  return "Needs improvement. Review the concepts and try again."
}

// Store quiz attempt in local storage
export function storeQuizAttempt(attempt: QuizAttempt): void {
  const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "[]")
  attempts.push(attempt)
  localStorage.setItem("quizAttempts", JSON.stringify(attempts))
}

// Retrieve quiz attempts
export function getQuizAttempts(): QuizAttempt[] {
  const attempts = JSON.parse(localStorage.getItem("quizAttempts") || "[]")
  return attempts.map((a: any) => ({
    ...a,
    submittedAt: new Date(a.submittedAt),
  }))
}
