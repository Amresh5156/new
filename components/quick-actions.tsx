"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Brain, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Jump into your learning activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="/quiz" className="block">
          <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Take New Quiz</span>
          </Button>
        </Link>
        <Link href="/recommendations" className="block">
          <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">AI Recommendations</span>
          </Button>
        </Link>
        <Link href="/notes" className="block">
          <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Study Notes</span>
          </Button>
        </Link>
        <Link href="/analytics" className="block">
          <Button className="w-full justify-start bg-transparent" variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Detailed Analytics</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}