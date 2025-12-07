interface PerformanceData {
  topicName: string
  masteryLevel: number
  accuracy: number
  attempts: number
  correctAnswers: number
  averageTimePerQuestion: number
  lastPracticed: Date
}

interface WeakAreaResult {
  topic: string
  severity: "critical" | "high" | "medium" | "low"
  masteryl: number
  accuracy: number
  issues: string[]
  recommendations: string[]
  predictedMasteryIn30Days: number
}

export function analyzeWeakAreas(performanceData: PerformanceData[]): WeakAreaResult[] {
  const results: WeakAreaResult[] = []

  performanceData.forEach((data) => {
    const analysisResult = performanceAnalysis(data)
    if (analysisResult.isWeakArea) {
      results.push({
        topic: data.topicName,
        severity: analysisResult.severity,
        masteryl: data.masteryLevel,
        accuracy: data.accuracy,
        issues: identifyIssues(data),
        recommendations: generateRecommendations(data, analysisResult.severity),
        predictedMasteryIn30Days: predictMastery(data),
      })
    }
  })

  return results.sort((a, b) => {
    const severityOrder: Record<string, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })
}

function performanceAnalysis(data: PerformanceData): { isWeakArea: boolean; severity: WeakAreaResult["severity"] } {
  const masteryScore = data.masteryLevel * 100
  const accuracyScore = data.accuracy * 100

  let severity: WeakAreaResult["severity"] = "low"
  let isWeakArea = false

  if (masteryScore < 30 || accuracyScore < 40) {
    severity = "critical"
    isWeakArea = true
  } else if (masteryScore < 50 || accuracyScore < 55) {
    severity = "high"
    isWeakArea = true
  } else if (masteryScore < 70 || accuracyScore < 70) {
    severity = "medium"
    isWeakArea = true
  }

  return { isWeakArea, severity }
}

function identifyIssues(data: PerformanceData): string[] {
  const issues: string[] = []
  const accuracyRate = data.correctAnswers / Math.max(data.attempts, 1)

  if (data.masteryLevel < 0.4) {
    issues.push("Fundamental concepts need reinforcement")
  }

  if (accuracyRate < 0.6) {
    issues.push("Problem-solving approach needs improvement")
  }

  if (data.averageTimePerQuestion > 120) {
    issues.push("Slow problem-solving speed")
  }

  if (data.attempts < 5) {
    issues.push("Insufficient practice attempts")
  }

  const daysSincePractice = Math.floor((Date.now() - data.lastPracticed.getTime()) / (1000 * 60 * 60 * 24))
  if (daysSincePractice > 14) {
    issues.push("Long time since last practice - knowledge decay risk")
  }

  return issues.length > 0 ? issues : ["General understanding needs improvement"]
}

function generateRecommendations(data: PerformanceData, severity: string): string[] {
  const recommendations: string[] = []

  if (severity === "critical") {
    recommendations.push("Start with easier difficulty levels")
    recommendations.push("Review fundamental concepts from basics")
    recommendations.push("Work with step-by-step tutorials")
  } else if (severity === "high") {
    recommendations.push("Focus on understanding core concepts")
    recommendations.push("Practice similar problems multiple times")
  }

  recommendations.push("Review incorrect answer explanations")
  recommendations.push("Take more practice quizzes")
  recommendations.push("Use spaced repetition for better retention")

  return recommendations
}

function predictMastery(data: PerformanceData): number {
  // Simple linear projection based on current trajectory
  const improvementRate = 0.02 // 2% improvement per day if practicing consistently
  const daysProjection = 30
  const projectedImprovement = improvementRate * daysProjection

  const predictedMastery = Math.min(1, data.masteryLevel + projectedImprovement)
  return Math.round(predictedMastery * 100)
}
