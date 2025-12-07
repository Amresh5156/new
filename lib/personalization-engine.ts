export interface PersonalizationProfile {
  studentId: string
  learningStyle: "visual" | "kinesthetic" | "auditory" | "mixed"
  preferredDifficulty: number
  optimalSessionDuration: number
  bestLearningTime: string
  spacedRepetitionInterval: number
  adaptiveThreshold: number
}

export interface AdaptiveRecommendation {
  nextDifficulty: number
  recommendedTopics: string[]
  suggestedSessionDuration: number
  bestTimeToLearn: string
  resourceTypes: string[]
  breakFrequency: number
}

export function generatePersonalizationProfile(studentId: string, learningHistory: any[]): PersonalizationProfile {
  return {
    studentId,
    learningStyle: detectLearningStyle(learningHistory),
    preferredDifficulty: calculateOptimalDifficulty(learningHistory),
    optimalSessionDuration: determineSessionDuration(learningHistory),
    bestLearningTime: identifyBestLearningTime(learningHistory),
    spacedRepetitionInterval: calculateSpacedRepetitionInterval(learningHistory),
    adaptiveThreshold: 0.75, // Target mastery level
  }
}

export function generateAdaptiveRecommendation(
  profile: PersonalizationProfile,
  currentPerformance: number,
): AdaptiveRecommendation {
  let nextDifficulty = profile.preferredDifficulty

  if (currentPerformance > 0.85) {
    nextDifficulty = Math.min(5, profile.preferredDifficulty + 1)
  } else if (currentPerformance < 0.5) {
    nextDifficulty = Math.max(1, profile.preferredDifficulty - 1)
  }

  return {
    nextDifficulty,
    recommendedTopics: ["Weak Area 1", "Weak Area 2", "Challenge Area"],
    suggestedSessionDuration: profile.optimalSessionDuration,
    bestTimeToLearn: profile.bestLearningTime,
    resourceTypes: getResourceTypesForStyle(profile.learningStyle),
    breakFrequency: Math.max(5, 30 - profile.optimalSessionDuration),
  }
}

function detectLearningStyle(history: any[]): "visual" | "kinesthetic" | "auditory" | "mixed" {
  // Analyze which resource types lead to better performance
  let visualScore = 0
  let kinestheticScore = 0
  let auditoryScore = 0

  // Simplified logic - in production, use more sophisticated analysis
  history.slice(-10).forEach((entry) => {
    if (entry.resourceType === "video") visualScore += entry.performanceScore || 0.5
    if (entry.resourceType === "practice") kinestheticScore += entry.performanceScore || 0.5
    if (entry.resourceType === "lecture") auditoryScore += entry.performanceScore || 0.5
  })

  const scores = { visual: visualScore, kinesthetic: kinestheticScore, auditory: auditoryScore }
  const styles = Object.entries(scores).sort((a, b) => b[1] - a[1])

  if (styles[0][1] === styles[1][1]) return "mixed"
  return styles[0][0] as any
}

function calculateOptimalDifficulty(history: any[]): number {
  const recentPerformances = history.slice(-20).map((h) => h.performance || 0.5)
  const averagePerformance = recentPerformances.reduce((a, b) => a + b, 0) / recentPerformances.length

  if (averagePerformance > 0.8) return Math.min(5, 4)
  if (averagePerformance > 0.6) return 3
  if (averagePerformance > 0.4) return 2
  return 1
}

function determineSessionDuration(history: any[]): number {
  const recentDurations = history.slice(-20).map((h) => h.sessionDuration || 30)
  const averageDuration = recentDurations.reduce((a, b) => a + b, 0) / recentDurations.length

  // Optimize for 25-60 minute sessions (Pomodoro-inspired)
  if (averageDuration < 20) return 25
  if (averageDuration > 60) return 45
  return Math.round(averageDuration / 5) * 5 // Round to nearest 5
}

function identifyBestLearningTime(history: any[]): string {
  const timeScores: Record<string, number> = {
    morning: 0,
    afternoon: 0,
    evening: 0,
  }

  history.slice(-30).forEach((entry) => {
    const hour = entry.timestamp ? new Date(entry.timestamp).getHours() : 12
    const performance = entry.performance || 0.5

    if (hour < 12) timeScores.morning += performance
    else if (hour < 18) timeScores.afternoon += performance
    else timeScores.evening += performance
  })

  const bestTime = Object.entries(timeScores).sort((a, b) => b[1] - a[1])[0][0]
  return bestTime
}

function calculateSpacedRepetitionInterval(history: any[]): number {
  // Based on forgetting curve - review intervals increase over time
  const topicReviewCount = history.length

  if (topicReviewCount < 3) return 1 // 1 day
  if (topicReviewCount < 5) return 3 // 3 days
  if (topicReviewCount < 10) return 7 // 7 days
  return 14 // 14 days for well-learned topics
}

function getResourceTypesForStyle(style: string): string[] {
  const resourceMap: Record<string, string[]> = {
    visual: ["video", "diagrams", "infographics", "screenshots"],
    auditory: ["lecture", "podcast", "explanations", "discussion"],
    kinesthetic: ["practice", "coding", "hands-on", "projects"],
    mixed: ["video", "practice", "lecture", "diagrams"],
  }

  return resourceMap[style] || resourceMap.mixed
}
