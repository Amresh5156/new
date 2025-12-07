import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { QuizResults } from "@/components/quiz-results"

interface QuizResultsPageProps {
  params: {
    id: string
    attemptId: string
  }
}

export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch quiz attempt data with quiz and topic information
  const { data: attempt } = await supabase
    .from("quiz_attempts")
    .select(`
      *,
      quizzes (
        *,
        topics (
          name,
          category
        )
      )
    `)
    .eq("id", params.attemptId)
    .eq("user_id", user.id)
    .single()

  if (!attempt) {
    redirect("/quiz")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <QuizResults attempt={attempt} userId={user.id} />
    </div>
  )
}
