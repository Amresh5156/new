"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Topic {
  id: string
  name: string
  category: string
  description: string
}

interface UserProgress {
  topic_id: string
  mastery_level: number
  topics?: Topic
}

interface ContentLibraryProps {
  topics: Topic[]
  userProgress: UserProgress[]
}

export function ContentLibrary({ topics, userProgress }: ContentLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...new Set(topics.map((topic) => topic.category))]

  const getProgressForTopic = (topicId: string) => {
    return userProgress.find((p) => p.topic_id === topicId || p.topics?.id === topicId)?.mastery_level || 0
  }

  const getLeetCodeLink = (topicName: string) => {
    const topicMap: Record<string, string> = {
      Arrays: "https://leetcode.com/tag/array/",
      "Linked Lists": "https://leetcode.com/tag/linked-list/",
      "Binary Trees": "https://leetcode.com/tag/binary-tree/",
      "Sorting Algorithms": "https://leetcode.com/tag/sorting/",
      "Searching Algorithms": "https://leetcode.com/tag/binary-search/",
      "Dynamic Programming": "https://leetcode.com/tag/dynamic-programming/",
      "Hash Tables": "https://leetcode.com/tag/hash-table/",
      Graphs: "https://leetcode.com/tag/graph/",
    }
    return topicMap[topicName] || "https://leetcode.com/problemset/all/"
  }

  const getStatusIcon = (progress: number) => {
    if (progress >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (progress > 0) return <Clock className="h-4 w-4 text-orange-600" />
    return <Play className="h-4 w-4 text-gray-400" />
  }

  const getStatusText = (progress: number) => {
    if (progress >= 80) return "Completed"
    if (progress > 0) return "In Progress"
    return "Not Started"
  }

  const filteredTopics =
    selectedCategory === "all" ? topics : topics.filter((topic) => topic.category === selectedCategory)

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Learning Topics</h2>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize text-xs sm:text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const progress = getProgressForTopic(topic.id)
          const leetCodeLink = getLeetCodeLink(topic.name)
          return (
            <Card key={topic.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-gray-900">{topic.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {topic.category}
                    </Badge>
                  </div>
                  {getStatusIcon(progress)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.description}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-600 flex items-center gap-1 flex-shrink-0">
                      {getStatusIcon(progress)}
                      {getStatusText(progress)}
                    </span>
                    <Link href={leetCodeLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm bg-transparent">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}