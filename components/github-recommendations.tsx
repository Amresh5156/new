"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Star, GitFork, Code, BookmarkPlus } from "lucide-react"
import { useState } from "react"

interface GitHubRecommendationsProps {
  recommendations: any[]
  progressData: any[]
  userId: string
}

export function GitHubRecommendations({ recommendations, progressData, userId }: GitHubRecommendationsProps) {
  const [savedRepos, setSavedRepos] = useState<Set<string>>(new Set())

  const handleSaveRepo = async (recommendationId: string) => {
    try {
      await fetch("/api/recommendations/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendationId, userId }),
      })
      setSavedRepos((prev) => new Set([...prev, recommendationId]))
    } catch (error) {
      console.error("Failed to save repository:", error)
    }
  }

  const handleMarkAsViewed = async (recommendationId: string) => {
    try {
      await fetch("/api/recommendations/mark-viewed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendationId, userId }),
      })
    } catch (error) {
      console.error("Failed to mark as viewed:", error)
    }
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 text-green-800"
    if (score >= 0.6) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const getRepoTypeIcon = (description: string) => {
    if (description.toLowerCase().includes("tutorial") || description.toLowerCase().includes("guide")) {
      return Code
    }
    return Github
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5 text-gray-900" />
          GitHub Repositories
        </CardTitle>
        <CardDescription>Code examples and projects to enhance your learning</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No repositories yet</h3>
            <p className="text-gray-500 mb-4">Complete more quizzes to get personalized GitHub recommendations</p>
            <Button variant="outline">Generate Recommendations</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const RepoIcon = getRepoTypeIcon(rec.description)

              return (
                <div
                  key={rec.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    rec.is_viewed ? "bg-gray-50 opacity-75" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Repository Icon */}
                    <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                      <RepoIcon className="h-6 w-6 text-gray-600" />
                    </div>

                    {/* Repository Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <Badge className={getRelevanceColor(rec.relevance_score)}>
                          {Math.round(rec.relevance_score * 100)}% match
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>

                      {/* Repository Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>2.3k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          <span>456</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3" />
                          <span>JavaScript</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {rec.topics.category.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {rec.topics.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.description.toLowerCase().includes("tutorial") ? "Tutorial" : "Project"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" asChild onClick={() => handleMarkAsViewed(rec.id)}>
                          <a href={rec.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Repository
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSaveRepo(rec.id)}
                          disabled={savedRepos.has(rec.id)}
                        >
                          <BookmarkPlus className="h-3 w-3 mr-1" />
                          {savedRepos.has(rec.id) ? "Saved" : "Save"}
                        </Button>
                      </div>
                    </div>
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
