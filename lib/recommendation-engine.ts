export interface StudentProfile {
  masteryLevels: Record<string, number>
  viewedResources: string[]
  completedQuizzes: number
  learningStyle: "visual" | "kinesthetic" | "auditory" | "mixed"
  preferredDifficulty: "beginner" | "intermediate" | "advanced"
}

export interface Recommendation {
  id: string
  title: string
  type: "youtube" | "github" | "article" | "course"
  url: string
  topic: string
  relevanceScore: number
  difficulty: string
  estimatedTime: number
  source: string
  tags: string[]
}

export function generateRecommendations(profile: StudentProfile, topicFocusAreas: string[]): Recommendation[] {
  const recommendations: Recommendation[] = []

  // Content-based filtering: recommend based on weak areas
  topicFocusAreas.forEach((topic) => {
    const mastery = profile.masteryLevels[topic] || 0
    recommendations.push(...getResourcesForTopic(topic, mastery, profile.learningStyle))
  })

  // Collaborative filtering: recommend based on similar learners
  recommendations.push(...getCollaborativeRecommendations(profile))

  // Sort by relevance score and remove duplicates
  const uniqueRecommendations = Array.from(new Map(recommendations.map((item) => [item.id, item])).values()).sort(
    (a, b) => b.relevanceScore - a.relevanceScore,
  )

  return uniqueRecommendations.slice(0, 10)
}

function getResourcesForTopic(topic: string, masteryLevel: number, learningStyle: string): Recommendation[] {
  const resources: Recommendation[] = []

  // YouTube resources
  if (masteryLevel < 0.5) {
    resources.push({
      id: `yt-intro-${topic}`,
      title: `${topic} - Complete Introduction for Beginners`,
      type: "youtube",
      url: `https://youtube.com/watch?v=intro-${topic}`,
      topic,
      relevanceScore: 0.95,
      difficulty: "beginner",
      estimatedTime: 45,
      source: "YouTube",
      tags: ["beginner", "tutorial", topic],
    })
  }

  if (masteryLevel >= 0.5 && masteryLevel < 0.8) {
    resources.push({
      id: `yt-advanced-${topic}`,
      title: `${topic} - Advanced Concepts and Applications`,
      type: "youtube",
      url: `https://youtube.com/watch?v=advanced-${topic}`,
      topic,
      relevanceScore: 0.88,
      difficulty: "intermediate",
      estimatedTime: 60,
      source: "YouTube",
      tags: ["intermediate", "advanced", topic],
    })
  }

  // GitHub resources
  resources.push({
    id: `github-${topic}`,
    title: `${topic} - Complete Solutions and Examples`,
    type: "github",
    url: `https://github.com/examples/${topic.toLowerCase().replace(/\s+/g, "-")}-solutions`,
    topic,
    relevanceScore: 0.82,
    difficulty: "intermediate",
    estimatedTime: 120,
    source: "GitHub",
    tags: ["code", "examples", topic],
  })

  return resources
}

function getCollaborativeRecommendations(profile: StudentProfile): Recommendation[] {
  // Simulate collaborative filtering: based on what similar learners found helpful
  const recommendations: Recommendation[] = []

  if (profile.completedQuizzes > 10) {
    recommendations.push({
      id: "collab-advanced-path",
      title: "Advanced Learning Path for High Achievers",
      type: "course",
      url: "https://example.com/advanced-path",
      topic: "Multiple Topics",
      relevanceScore: 0.75,
      difficulty: "advanced",
      estimatedTime: 300,
      source: "Learning Platform",
      tags: ["path", "advanced", "comprehensive"],
    })
  }

  return recommendations
}

export function calculateRelevanceScore(
  resource: Recommendation,
  studentMastery: number,
  viewHistory: string[],
): number {
  let score = 0.5 // Base score

  // Check if already viewed
  if (viewHistory.includes(resource.id)) {
    score *= 0.5 // Lower score for already viewed
  }

  // Adjust based on mastery level and resource difficulty
  const difficultyMap: Record<string, number> = { beginner: 0.3, intermediate: 0.6, advanced: 0.9 }
  const resourceDifficulty = difficultyMap[resource.difficulty] || 0.5

  const masteryResourceGap = Math.abs(studentMastery - resourceDifficulty)
  const difficultyScore = Math.max(0, 1 - masteryResourceGap)

  score += difficultyScore * 0.3

  // Boost fresh recommendations
  score += 0.2

  return Math.min(1, score)
}
