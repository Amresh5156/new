export interface ProgressPrediction {
  predictedMasteryIn7Days: number
  predictedMasteryIn30Days: number
  predictedMasteryIn90Days: number
  learningVelocity: number
  atRiskFlag: boolean
  estimatedTimeToMastery: number
  confidenceScore: number
}

export interface StudentHistoryData {
  topic: string
  masteryLevel: number
  attempts: number
  correctAttempts: number
  daysSincePractice: number
  consistencyScore: number
  averageTimePerAttempt: number
}

export function predictProgress(studentData: StudentHistoryData): ProgressPrediction {
  const learningVelocity = calculateLearningVelocity(studentData)
  const currentMastery = studentData.masteryLevel
  const timeToMastery = estimateTimeToMastery(currentMastery, learningVelocity)

  return {
    predictedMasteryIn7Days: projectMastery(currentMastery, learningVelocity, 7),
    predictedMasteryIn30Days: projectMastery(currentMastery, learningVelocity, 30),
    predictedMasteryIn90Days: projectMastery(currentMastery, learningVelocity, 90),
    learningVelocity,
    atRiskFlag: identifyAtRiskStudent(studentData, learningVelocity),
    estimatedTimeToMastery: timeToMastery,
    confidenceScore: calculateConfidenceScore(studentData),
  }
}

function calculateLearningVelocity(data: StudentHistoryData): number {
  // Learning velocity = (correct attempts / total attempts) * consistency * (1 / days since practice)
  const successRate = data.correctAttempts / Math.max(data.attempts, 1)
  const consistencyFactor = data.consistencyScore || 0.5
  const recencyFactor = Math.max(0.1, 1 - data.daysSincePractice / 30)

  return successRate * consistencyFactor * recencyFactor
}

function projectMastery(currentMastery: number, velocity: number, daysAhead: number): number {
  // Logistic growth model: mastery approaches 1.0 with diminishing returns
  const projectedGrowth = velocity * daysAhead * 0.01 // Growth rate per day
  const projected = currentMastery + projectedGrowth * (1 - currentMastery)

  return Math.min(1, Math.max(0, projected))
}

function estimateTimeToMastery(currentMastery: number, velocity: number): number {
  // Estimate days to reach 90% mastery
  const targetMastery = 0.9
  const masteryGap = targetMastery - currentMastery

  if (velocity <= 0 || masteryGap <= 0) return 999 // Unable to reach or already mastered

  // Inverse of logistic growth
  const daysNeeded = (masteryGap / velocity) * 100

  return Math.max(1, Math.round(daysNeeded))
}

function identifyAtRiskStudent(data: StudentHistoryData, velocity: number): boolean {
  // Flag students who are struggling or have low engagement
  const isLowPerformer = data.masteryLevel < 0.4
  const isInactive = data.daysSincePractice > 14
  const isLowVelocity = velocity < 0.05
  const lowAttempts = data.attempts < 3

  return (isLowPerformer && isLowVelocity) || (isInactive && isLowPerformer) || lowAttempts
}

function calculateConfidenceScore(data: StudentHistoryData): number {
  // Higher confidence with more attempts and recent practice
  const attemptConfidence = Math.min(1, data.attempts / 10)
  const recencyConfidence = Math.max(0.3, 1 - data.daysSincePractice / 60)
  const consistencyConfidence = data.consistencyScore || 0.5

  return attemptConfidence * 0.4 + recencyConfidence * 0.35 + consistencyConfidence * 0.25
}

export function comparePredictions(pred1: ProgressPrediction, pred2: ProgressPrediction): string {
  if (pred1.learningVelocity > pred2.learningVelocity) {
    return `Student 1 is learning faster (${(pred1.learningVelocity * 100).toFixed(1)}% vs ${(pred2.learningVelocity * 100).toFixed(1)}%)`
  }
  return `Student 2 is learning faster (${(pred2.learningVelocity * 100).toFixed(1)}% vs ${(pred1.learningVelocity * 100).toFixed(1)}%)`
}
