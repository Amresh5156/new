"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Code, Database } from "lucide-react"
import { useState } from "react"

interface RecommendationFiltersProps {
  progressData: any[]
  userId: string
}

export function RecommendationFilters({ progressData, userId }: RecommendationFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [focusMode, setFocusMode] = useState<string>("weak-areas")

  const categories = ["all", "coding", "dsa"]
  const difficulties = ["all", "1", "2", "3", "4", "5"]
  const focusModes = [
    { value: "weak-areas", label: "Focus on Weak Areas" },
    { value: "strengths", label: "Build on Strengths" },
    { value: "balanced", label: "Balanced Learning" },
    { value: "advanced", label: "Advanced Topics" },
  ]

  const handleApplyFilters = async () => {
    try {
      await fetch("/api/recommendations/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          filters: {
            category: selectedCategory,
            difficulty: selectedDifficulty,
            focusMode,
          },
        }),
      })
      window.location.reload()
    } catch (error) {
      console.error("Failed to apply filters:", error)
    }
  }

  // Get weak areas for quick filter buttons
  const weakAreas = progressData
    .filter((p) => p.mastery_level < 0.7)
    .sort((a, b) => a.mastery_level - b.mastery_level)
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-500" />
          Recommendation Filters
        </CardTitle>
        <CardDescription>Customize recommendations based on your learning goals and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="coding">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Coding
                  </div>
                </SelectItem>
                <SelectItem value="dsa">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Data Structures & Algorithms
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="1">Beginner (1)</SelectItem>
                <SelectItem value="2">Easy (2)</SelectItem>
                <SelectItem value="3">Medium (3)</SelectItem>
                <SelectItem value="4">Hard (4)</SelectItem>
                <SelectItem value="5">Expert (5)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Focus Mode */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Focus Mode</label>
            <Select value={focusMode} onValueChange={setFocusMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {focusModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Apply Button */}
          <div className="flex items-end">
            <Button onClick={handleApplyFilters} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Quick Filter Buttons for Weak Areas */}
        {weakAreas.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((area, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-50 hover:border-orange-300"
                  onClick={() => {
                    setSelectedCategory(area.topics.category)
                    setFocusMode("weak-areas")
                  }}
                >
                  {area.topics.name} ({Math.round(area.mastery_level * 100)}%)
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
