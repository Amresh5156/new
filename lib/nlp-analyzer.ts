export interface NLPAnalysisResult {
  keyTopics: string[]
  sentiment: "positive" | "neutral" | "negative"
  complexity: number
  summary: string
  concepts: string[]
  relatedTopics: string[]
}

// Simple keyword extraction and concept identification
const conceptKeywords: Record<string, string[]> = {
  "Data Structures": ["array", "linked list", "tree", "graph", "hash", "heap", "queue", "stack"],
  Algorithms: ["sorting", "searching", "recursion", "dynamic programming", "greedy", "divide and conquer"],
  Complexity: ["time complexity", "space complexity", "big o", "o(n)", "o(log n)", "o(n^2)"],
  Optimization: ["optimize", "efficient", "improve", "faster", "reduce", "minimize"],
}

export function analyzeText(text: string): NLPAnalysisResult {
  const lowerText = text.toLowerCase()

  return {
    keyTopics: extractKeyTopics(lowerText),
    sentiment: analyzeSentiment(lowerText),
    complexity: calculateComplexity(text),
    summary: generateSummary(text),
    concepts: extractConcepts(lowerText),
    relatedTopics: findRelatedTopics(lowerText),
  }
}

function extractKeyTopics(text: string): string[] {
  const topics: string[] = []
  const topicPatterns = [/(?:about|discuss|topic|chapter|unit|section)\s+([a-z\s]+?)(?:[.,;]|$)/gi, /^###\s+(.+?)$/gm]

  topicPatterns.forEach((pattern) => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      topics.push(match[1].trim())
    }
  })

  return Array.from(new Set(topics)).slice(0, 5)
}

function analyzeSentiment(text: string): "positive" | "neutral" | "negative" {
  const positiveWords = ["good", "great", "excellent", "understand", "clear", "easy", "learned", "improved"]
  const negativeWords = ["difficult", "hard", "confused", "struggle", "unclear", "bad", "failed"]

  let positiveScore = 0
  let negativeScore = 0

  positiveWords.forEach((word) => {
    positiveScore += (text.match(new RegExp(word, "gi")) || []).length
  })

  negativeWords.forEach((word) => {
    negativeScore += (text.match(new RegExp(word, "gi")) || []).length
  })

  if (positiveScore > negativeScore) return "positive"
  if (negativeScore > positiveScore) return "negative"
  return "neutral"
}

function calculateComplexity(text: string): number {
  // Based on text length, vocabulary diversity, and sentence structure
  const wordCount = text.split(/\s+/).length
  const uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size
  const averageSentenceLength = wordCount / Math.max(text.split(/[.!?]+/).length, 1)

  const vocabularyRatio = uniqueWords / wordCount
  const complexityScore = (vocabularyRatio * 0.5 + (averageSentenceLength / 20) * 0.5) * 100

  return Math.min(100, Math.max(0, complexityScore))
}

function generateSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const importantSentences = sentences.slice(0, Math.ceil(sentences.length * 0.3))

  return importantSentences.join(". ") + "."
}

function extractConcepts(text: string): string[] {
  const concepts: string[] = []

  for (const [topic, keywords] of Object.entries(conceptKeywords)) {
    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        concepts.push(topic)
      }
    })
  }

  return Array.from(new Set(concepts))
}

function findRelatedTopics(text: string): string[] {
  const relatedTopics: string[] = []

  if (text.includes("array") || text.includes("list")) {
    relatedTopics.push("Data Structures")
  }
  if (text.includes("sort") || text.includes("search")) {
    relatedTopics.push("Algorithms")
  }
  if (text.includes("o(n)") || text.includes("complexity")) {
    relatedTopics.push("Complexity Analysis")
  }

  return Array.from(new Set(relatedTopics))
}
