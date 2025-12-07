import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const supabase = await createClient()

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch latest data for analysis
    const [progressData, quizAttempts] = await Promise.all([
      supabase
        .from("user_progress")
        .select(`
          *,
          topics (
            id,
            name,
            category,
            difficulty_level
          )
        `)
        .eq("user_id", userId),

      supabase
        .from("quiz_attempts")
        .select(`
          *,
          quizzes (
            title,
            difficulty_level,
            topics (
              name,
              category
            )
          )
        `)
        .eq("user_id", userId)
        .order("completed_at", { ascending: false }),
    ])

    // Trigger analysis refresh (this would normally be more sophisticated)
    const analysisTimestamp = new Date().toISOString()

    // Update user profile with last analysis timestamp
    await supabase
      .from("profiles")
      .update({
        updated_at: analysisTimestamp,
      })
      .eq("id", userId)

    return NextResponse.json({
      success: true,
      message: "Analysis refreshed successfully",
      timestamp: analysisTimestamp,
    })
  } catch (error) {
    console.error("Error refreshing analysis:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
