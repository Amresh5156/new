import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { progressData, userId } = await request.json()

    const supabase = await createClient()

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate personalized recommendations
    const recommendations = generatePersonalizedRecommendations(progressData)

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generatePersonalizedRecommendations(progressData: any[]) {
  const recommendations: any[] = []

  // Analyze overall progress patterns
  const totalTopics = progressData.length
  const averageMastery = totalTopics > 0 ? progressData.reduce((sum, p) => sum + p.mastery_level, 0) / totalTopics : 0

  // Find topics that need attention
  const weakTopics = progressData.filter((p) => p.mastery_level < 0.7).sort((a, b) => a.mastery_level - b.mastery_level)

  const strongTopics = progressData
    .filter((p) => p.mastery_level >= 0.8)
    .sort((a, b) => b.mastery_level - a.mastery_level)

  // Generate recommendations based on analysis

  // 1. Focus on weakest areas first
  if (weakTopics.length > 0) {
    const weakest = weakTopics[0]
    recommendations.push({
      title: `Focus on ${weakest.topics.name}`,
      topic: weakest.topics.name,
      description: `Your mastery level is ${Math.round(weakest.mastery_level * 100)}%. This topic needs immediate attention to improve your overall performance.`,
      actionType: "quiz",
      actionText: "Take Practice Quiz",
      priority: "high",
      estimatedTime: 15,
      benefits: [
        "Improve fundamental understanding",
        "Build confidence in weak areas",
        "Increase overall mastery score",
      ],
    })
  }

  // 2. Balanced learning recommendation
  if (averageMastery < 0.6) {
    recommendations.push({
      title: "Build Strong Foundations",
      topic: "Multiple Topics",
      description:
        "Your overall mastery is below 60%. Focus on building strong foundations across all topics before advancing to harder concepts.",
      actionType: "study",
      actionText: "Review Fundamentals",
      priority: "high",
      estimatedTime: 30,
      benefits: ["Strengthen core concepts", "Improve problem-solving skills", "Prepare for advanced topics"],
    })
  }

  // 3. Challenge yourself if doing well
  if (strongTopics.length > 0 && averageMastery > 0.8) {
    const strongest = strongTopics[0]
    recommendations.push({
      title: `Challenge Yourself in ${strongest.topics.name}`,
      topic: strongest.topics.name,
      description: `You're excelling in this area (${Math.round(strongest.mastery_level * 100)}% mastery). Try harder difficulty levels to push your limits.`,
      actionType: "quiz",
      actionText: "Take Advanced Quiz",
      priority: "medium",
      estimatedTime: 20,
      benefits: ["Test advanced knowledge", "Prepare for expert-level concepts", "Maintain engagement and motivation"],
    })
  }

  // 4. Consistency recommendation
  const inconsistentTopics = progressData.filter(
    (p) => p.total_attempts > 0 && p.correct_attempts / p.total_attempts < 0.7 && p.mastery_level > 0.6,
  )

  if (inconsistentTopics.length > 0) {
    const inconsistent = inconsistentTopics[0]
    recommendations.push({
      title: `Improve Consistency in ${inconsistent.topics.name}`,
      topic: inconsistent.topics.name,
      description:
        "Your understanding is good, but your quiz performance is inconsistent. Focus on applying knowledge more reliably.",
      actionType: "practice",
      actionText: "Practice More",
      priority: "medium",
      estimatedTime: 25,
      benefits: [
        "Improve answer accuracy",
        "Build reliable problem-solving patterns",
        "Increase confidence in assessments",
      ],
    })
  }

  // 5. Explore new areas
  const masteredTopics = progressData.filter((p) => p.mastery_level >= 0.9)
  if (masteredTopics.length > 2) {
    recommendations.push({
      title: "Explore Advanced Topics",
      topic: "New Learning Areas",
      description:
        "You've mastered several topics! Consider exploring more advanced or specialized areas to continue growing.",
      actionType: "study",
      actionText: "Discover New Topics",
      priority: "low",
      estimatedTime: 10,
      benefits: [
        "Expand knowledge breadth",
        "Stay challenged and engaged",
        "Prepare for advanced career opportunities",
      ],
    })
  }

  // 6. Review and reinforce
  const needsReview = progressData.filter((p) => {
    const daysSinceLastPractice = Math.floor(
      (Date.now() - new Date(p.last_practiced).getTime()) / (1000 * 60 * 60 * 24),
    )
    return daysSinceLastPractice > 7 && p.mastery_level < 0.9
  })

  if (needsReview.length > 0) {
    const oldestReview = needsReview.sort(
      (a, b) => new Date(a.last_practiced).getTime() - new Date(b.last_practiced).getTime(),
    )[0]

    recommendations.push({
      title: `Review ${oldestReview.topics.name}`,
      topic: oldestReview.topics.name,
      description:
        "It's been a while since you practiced this topic. Regular review helps maintain and strengthen your knowledge.",
      actionType: "quiz",
      actionText: "Quick Review Quiz",
      priority: "low",
      estimatedTime: 10,
      benefits: ["Prevent knowledge decay", "Reinforce learned concepts", "Maintain high performance levels"],
    })
  }

  return recommendations.slice(0, 5) // Return top 5 recommendations
}
