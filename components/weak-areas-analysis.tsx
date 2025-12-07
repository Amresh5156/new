"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingDown, Target, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

interface WeakAreasAnalysisProps {
  progressData: any[]
  quizAttempts: any[]
  userId: string
}

export function WeakAreasAnalysis({ progressData, quizAttempts, userId }: WeakAreasAnalysisProps) {
  const [weakAreas, setWeakAreas] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    analyzeWeakAreas()
  }, [progressData, quizAttempts])

  const analyzeWeakAreas = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analytics/weak-areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progressData,
          quizAttempts,
          userId,
        }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setWeakAreas(analysis.weakAreas)
      }
    } catch (error) {
      console.error("Failed to analyze weak areas:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return AlertTriangle
      case "medium":
        return TrendingDown
      default:
        return Target
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Weak Areas Analysis
          </CardTitle>
          <CardDescription>AI is analyzing your performance patterns...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Analyzing learning patterns...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Weak Areas Analysis
        </CardTitle>
        <CardDescription>
          AI-identified areas where you need more practice based on your performance patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {weakAreas.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Great job!</h3>
            <p className="text-gray-500">No significant weak areas detected. Keep up the excellent work!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {weakAreas.map((area, index) => {
              const SeverityIcon = getSeverityIcon(area.severity)

              return (
                <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(area.severity)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <SeverityIcon className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">{area.topic}</h4>
                        <p className="text-sm opacity-80">{area.category ? area.category.toUpperCase() : "GENERAL"}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {area.severity}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Current Mastery</span>
                      <span>{Math.round(area.masteryLevel * 100)}%</span>
                    </div>
                    <Progress value={area.masteryLevel * 100} className="h-2" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Key Issues:</p>
                    <ul className="text-sm space-y-1">
                      {area.issues.map((issue: string, issueIndex: number) => (
                        <li key={issueIndex} className="flex items-start gap-2">
                          <span className="text-xs mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">AI Recommendations:</p>
                    <ul className="text-sm space-y-1">
                      {area.recommendations.map((rec: string, recIndex: number) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <span className="text-xs mt-1">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Practice Now
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Resources
                    </Button>
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