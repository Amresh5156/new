import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, filters } = await request.json()

    const supabase = await createClient()

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Build query based on filters
    const query = supabase
      .from("recommendations")
      .select(`
        *,
        topics (
          name,
          category,
          difficulty_level
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      // This would require a join or separate query in a real implementation
      // For now, we'll return all and filter client-side
    }

    const { data: recommendations, error } = await query

    if (error) {
      console.error("Error fetching filtered recommendations:", error)
      return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
    }

    // Apply client-side filtering based on focus mode and other criteria
    let filteredRecommendations = recommendations || []

    if (filters.category && filters.category !== "all") {
      filteredRecommendations = filteredRecommendations.filter((rec) => rec.topics.category === filters.category)
    }

    if (filters.difficulty && filters.difficulty !== "all") {
      const targetDifficulty = Number.parseInt(filters.difficulty)
      filteredRecommendations = filteredRecommendations.filter(
        (rec) => rec.topics.difficulty_level === targetDifficulty,
      )
    }

    // Apply focus mode filtering
    if (filters.focusMode === "weak-areas") {
      filteredRecommendations = filteredRecommendations.filter((rec) => rec.relevance_score >= 0.7)
    }

    return NextResponse.json({
      recommendations: filteredRecommendations,
      count: filteredRecommendations.length,
    })
  } catch (error) {
    console.error("Error in filter endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
