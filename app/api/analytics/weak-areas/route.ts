import { type NextRequest, NextResponse } from "next/server"
import { mockProgress, mockRecentActivity } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { progressData, quizAttempts, userId } = await request.json()

    const data = progressData || mockProgress
    const attempts = quizAttempts || mockRecentActivity

    const weakAreas = analyzeWeakAreas(data, attempts)

    console.log("[v0] Weak areas analyzed:", weakAreas.length, "areas identified")

    return NextResponse.json({ weakAreas })
  } catch (error) {
    console.error("[v0] Error analyzing weak areas:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function analyzeWeakAreas(progressData: any[], quizAttempts: any[]) {
  const weakAreas: any[] = []

  // Analyze each topic's performance
  progressData.forEach((progress) => {
    const masteryLevel = progress.mastery || progress.masteryLevel || 0
    const totalAttempts = progress.attempts || 1
    const correct = progress.correct || 0
    const accuracy = totalAttempts > 0 ? correct / totalAttempts : 0

    // Identify if this is a weak area
    const isWeakArea = masteryLevel < 0.6 || accuracy < 0.65

    if (isWeakArea) {
      const severity = determineSeverity(masteryLevel, accuracy)
      const issues = identifySpecificIssues(progress, severity)
      const recommendations = generateRecommendations(progress, issues, severity)

      weakAreas.push({
        topicId: progress.topicId || progress.id,
        topic: progress.topicName || progress.name,
        category: progress.category,
        masteryLevel,
        accuracy: Math.round(accuracy * 100),
        severity,
        issues,
        recommendations,
      })
    }
  })

  // Sort by severity (critical first)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  weakAreas.sort((a, b) => (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3))

  return weakAreas
}

function determineSeverity(masteryLevel: number, accuracy: number): string {
  if (masteryLevel < 0.3 || accuracy < 0.4) return "critical"
  if (masteryLevel < 0.5 || accuracy < 0.55) return "high"
  if (masteryLevel < 0.7 || accuracy < 0.7) return "medium"
  return "low"
}

function identifySpecificIssues(progress: any, severity: string): string[] {
  const issues: string[] = []
  const masteryLevel = progress.mastery || progress.masteryLevel || 0
  const accuracy = progress.correct ? progress.correct / Math.max(progress.attempts, 1) : 0

  if (masteryLevel < 0.5) {
    issues.push("Basic concepts need reinforcement")
  }
  if (accuracy < 0.6) {
    issues.push("Problem-solving approach needs improvement")
  }
  if (severity === "critical") {
    issues.push("Requires fundamental practice")
  }

  return issues.length > 0 ? issues : ["General understanding needs improvement"]
}

function generateRecommendations(progress: any, issues: string[], severity: string): string[] {
  const recommendations: string[] = []

  if (severity === "critical") {
    recommendations.push("Start with easier difficulty levels")
    recommendations.push("Review fundamental concepts first")
  }

  recommendations.push("Take more quizzes on this topic")
  recommendations.push("Review explanations for incorrect answers")
  recommendations.push("Practice with similar problems")

  return recommendations
}
