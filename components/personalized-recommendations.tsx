"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Play, BookOpen, Target } from "lucide-react"
import { useEffect, useState } from "react"

interface PersonalizedRecommendationsProps {
  progressData: any[]
  userId: string
}

export function PersonalizedRecommendations({ progressData, userId }: PersonalizedRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateRecommendations()
  }, [progressData])

  const generateRecommendations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analytics/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progressData, userId }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "quiz":
        return Play
      case "study":
        return BookOpen
      case "practice":
        return Target
      default:
        return Lightbulb
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>AI is generating personalized recommendations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <span className="ml-3 text-gray-600">Generating recommendations...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Personalized Recommendations
        </CardTitle>
        <CardDescription>AI-powered suggestions tailored to your learning progress and goals</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-500">Complete more quizzes to get personalized recommendations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const ActionIcon = getActionIcon(rec.actionType)

              return (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ActionIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.topic}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{rec.description}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-900">Why this helps:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {rec.benefits.map((benefit: string, benefitIndex: number) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <span className="text-xs mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm">
                      <ActionIcon className="h-3 w-3 mr-1" />
                      {rec.actionText}
                    </Button>
                    {rec.estimatedTime && <span className="text-xs text-gray-500">~{rec.estimatedTime} min</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
