import { QuizInterface } from "@/components/quiz-interface"
import { mockQuestions } from "@/lib/mock-data"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const mockQuiz = {
    id: params.id,
    title: "Data Structures Quiz",
    difficulty_level: 2,
    questions: mockQuestions,
    topics: {
      name: "Data Structures",
      category: "DSA",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <QuizInterface quiz={mockQuiz} userId="demo-user" />
    </div>
  )
}
