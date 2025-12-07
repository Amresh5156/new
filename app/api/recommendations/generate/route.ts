import { type NextRequest, NextResponse } from "next/server"
import { mockRecommendations, mockProgress } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const progressData = mockProgress

    if (!progressData || progressData.length === 0) {
      return NextResponse.json({ recommendations: mockRecommendations }, { status: 200 })
    }

    // Generate recommendations based on mock progress
    const recommendations = generateRecommendations(progressData)

    console.log("[v0] Generated", recommendations.length, "recommendations")

    return NextResponse.json({
      success: true,
      count: recommendations.length,
      recommendations,
      message: "Recommendations generated successfully",
    })
  } catch (error) {
    console.error("[v0] Error generating recommendations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateRecommendations(progressData: any[]) {
  // Identify weak areas (mastery < 0.7)
  const weakAreas = progressData
    .filter((p) => (p.mastery || p.masteryLevel || 0) < 0.7)
    .sort((a, b) => (a.mastery || a.masteryLevel || 0) - (b.mastery || b.masteryLevel || 0))

  const recommendations: any[] = []

  // Add YouTube recommendations for weak areas
  weakAreas.slice(0, 3).forEach((area) => {
    recommendations.push({
      type: "youtube",
      title: `${area.topicName || area.name} - Complete Tutorial`,
      url: "https://youtube.com/watch?v=example",
      relevance: 90,
      difficulty: "intermediate",
    })
  })

  // Add GitHub recommendations
  weakAreas.slice(0, 2).forEach((area) => {
    recommendations.push({
      type: "github",
      title: `${(area.topicName || area.name).toLowerCase().replace(/\s+/g, "-")}-solutions`,
      url: "https://github.com/example/solutions",
      relevance: 85,
      stars: 3500,
    })
  })

  return recommendations.length > 0 ? recommendations : mockRecommendations
}
