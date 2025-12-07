"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface AnalyticsHeaderProps {
  user: any
  profile: any
}

export function AnalyticsHeader({ user, profile }: AnalyticsHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshAnalysis = async () => {
    setIsRefreshing(true)
    try {
      await fetch("/api/analytics/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
      window.location.reload()
    } catch (error) {
      console.error("Failed to refresh analysis:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Analytics</h1>
                <p className="text-sm text-gray-500">Learning insights & recommendations</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button onClick={handleRefreshAnalysis} disabled={isRefreshing} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Analyzing..." : "Refresh Analysis"}
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || user.email} />
              <AvatarFallback className="text-xs">
                {profile?.full_name ? getInitials(profile.full_name) : user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
