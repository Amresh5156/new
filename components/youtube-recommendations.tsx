"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Youtube, ExternalLink, Clock, Eye, ThumbsUp, BookmarkPlus } from "lucide-react"
import { useState } from "react"

interface YouTubeRecommendationsProps {
  recommendations: any[]
  progressData: any[]
  userId: string
}

export function YouTubeRecommendations({ recommendations, progressData, userId }: YouTubeRecommendationsProps) {
  const [viewedVideos, setViewedVideos] = useState<Set<string>>(new Set())

  const handleMarkAsViewed = async (recommendationId: string) => {
    try {
      await fetch("/api/recommendations/mark-viewed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendationId, userId }),
      })
      setViewedVideos((prev) => new Set([...prev, recommendationId]))
    } catch (error) {
      console.error("Failed to mark as viewed:", error)
    }
  }

  const handleSaveForLater = async (recommendationId: string) => {
    try {
      await fetch("/api/recommendations/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendationId, userId }),
      })
    } catch (error) {
      console.error("Failed to save recommendation:", error)
    }
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 text-green-800"
    if (score >= 0.6) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          YouTube Tutorials
        </CardTitle>
        <CardDescription>Curated video tutorials based on your learning progress</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Youtube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-500 mb-4">Complete more quizzes to get personalized YouTube recommendations</p>
            <Button variant="outline">Generate Recommendations</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 border rounded-lg transition-colors ${
                  rec.is_viewed || viewedVideos.has(rec.id) ? "bg-gray-50 opacity-75" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Video Thumbnail Placeholder */}
                  <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Youtube className="h-8 w-8 text-gray-400" />
                  </div>

                  {/* Video Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{rec.title}</h4>
                      <Badge className={getRelevanceColor(rec.relevance_score)}>
                        {Math.round(rec.relevance_score * 100)}% match
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{rec.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>12:34</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>45K views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>98%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {rec.topics.category.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {rec.topics.name}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" asChild onClick={() => handleMarkAsViewed(rec.id)}>
                        <a href={rec.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Watch Now
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSaveForLater(rec.id)}>
                        <BookmarkPlus className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      {!rec.is_viewed && !viewedVideos.has(rec.id) && (
                        <Button size="sm" variant="ghost" onClick={() => handleMarkAsViewed(rec.id)}>
                          Mark as Viewed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
