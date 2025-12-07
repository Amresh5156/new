import { generateText } from "ai"

export interface GeneratedQuestion {
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: number
  topic: string
}

export async function generateQuizQuestions(
  topic: string,
  difficulty: number,
  count = 5,
): Promise<GeneratedQuestion[]> {
  try {
    const prompt = `Generate ${count} multiple choice quiz questions about "${topic}" at difficulty level ${difficulty}/5. 
    For each question, provide:
    1. The question
    2. Four options (A, B, C, D)
    3. The correct answer letter
    4. A brief explanation of why this is correct
    
    Format: Q1: [question]\\nOptions: A) [opt1]\\nB) [opt2]\\nC) [opt3]\\nD) [opt4]\\nAnswer: [letter]\\nExplanation: [explanation]`

    const { text } = await generateText({
      model: "openai/gpt-3.5-turbo",
      prompt,
      maxTokens: 2000,
    })

    return parseGeneratedQuestions(text, topic, difficulty)
  } catch (error) {
    console.error("Error generating questions with LLM:", error)
    return generateFallbackQuestions(topic, difficulty, count)
  }
}

export async function generateExplanation(question: string, answer: string, topic: string): Promise<string> {
  try {
    const prompt = `Provide a detailed explanation for this answer:
    Question: ${question}
    Answer: ${answer}
    Topic: ${topic}
    
    Keep the explanation concise but comprehensive (2-3 sentences).`

    const { text } = await generateText({
      model: "openai/gpt-3.5-turbo",
      prompt,
      maxTokens: 300,
    })

    return text
  } catch (error) {
    console.error("Error generating explanation:", error)
    return "Please review the course materials for more information on this topic."
  }
}

function parseGeneratedQuestions(text: string, topic: string, difficulty: number): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = []
  const questionBlocks = text.split(/Q\d+:/).filter((block) => block.trim())

  questionBlocks.forEach((block) => {
    const questionMatch = block.match(/^(.+?)(?=Options:)/s)
    const optionsMatch = block.match(/Options:(.+?)(?=Answer:)/s)
    const answerMatch = block.match(/Answer:\s*([A-D])/i)
    const explanationMatch = block.match(/Explanation:(.+?)$/s)

    if (questionMatch && optionsMatch && answerMatch && explanationMatch) {
      const questionText = questionMatch[1].trim()
      const optionsText = optionsMatch[1].trim()
      const answerLetter = answerMatch[1].toUpperCase()

      const options = optionsText
        .split(/[A-D]\)/)
        .filter((opt) => opt.trim())
        .map((opt) => opt.trim())

      const answerIndex = answerLetter.charCodeAt(0) - 65
      const correctAnswer = options[answerIndex] || ""

      questions.push({
        question: questionText,
        options,
        correctAnswer,
        explanation: explanationMatch[1].trim(),
        difficulty,
        topic,
      })
    }
  })

  return questions
}

function generateFallbackQuestions(topic: string, difficulty: number, count: number): GeneratedQuestion[] {
  const fallbackQuestions: GeneratedQuestion[] = [
    {
      question: `What is the primary characteristic of ${topic}?`,
      options: ["Property A", "Property B", "Property C", "Property D"],
      correctAnswer: "Property B",
      explanation: `The main characteristic of ${topic} is Property B due to its fundamental nature.`,
      difficulty,
      topic,
    },
    {
      question: `How would you apply ${topic} in practice?`,
      options: ["Method 1", "Method 2", "Method 3", "Method 4"],
      correctAnswer: "Method 2",
      explanation: `Method 2 is the most efficient approach for applying ${topic} concepts.`,
      difficulty,
      topic,
    },
  ]

  return fallbackQuestions.slice(0, count)
}
