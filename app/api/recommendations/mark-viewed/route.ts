import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { recommendationId, userId } = await request.json()

    const supabase = await createClient()

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark recommendation as viewed
    const { error } = await supabase
      .from("recommendations")
      .update({ is_viewed: true })
      .eq("id", recommendationId)
      .eq("user_id", userId)

    if (error) {
      console.error("Error marking recommendation as viewed:", error)
      return NextResponse.json({ error: "Failed to update recommendation" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in mark-viewed endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
