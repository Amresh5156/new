"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar } from "lucide-react"

interface PerformanceTrendsProps {
  quizAttempts: any[]
}

export function PerformanceTrends({ quizAttempts }: PerformanceTrendsProps) {
  // Group attempts by date for trend analysis
  const trendData = quizAttempts
    .slice(0, 10) // Last 10 attempts
    .reverse()
    .map((attempt, index) => ({
      attempt: index + 1,
      score: Math.round(attempt.score),
      date: new Date(attempt.completed_at).toLocaleDateString(),
      topic: attempt.quizzes.topics.name,
    }))

  const averageScore =
    trendData.length > 0 ? Math.round(trendData.reduce((sum, data) => sum + data.score, 0) / trendData.length) : 0

  const trend = trendData.length >= 2 ? trendData[trendData.length - 1].score - trendData[0].score : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Performance Trends
        </CardTitle>
        <CardDescription>Your quiz performance over recent attempts</CardDescription>
      </CardHeader>
      <CardContent>
        {trendData.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No quiz data available yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trend Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
                <div className="text-sm text-blue-800">Average Score</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className={`text-2xl font-bold ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {trend >= 0 ? "+" : ""}
                  {trend}%
                </div>
                <div className="text-sm text-gray-600">Trend</div>
              </div>
            </div>

            {/* Performance Chart (Simple Bar Chart) */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Recent Performance</h4>
              <div className="space-y-2">
                {trendData.map((data, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 text-xs text-gray-500">{data.date}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className={`h-4 rounded-full transition-all duration-300 ${
                          data.score >= 80 ? "bg-green-500" : data.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${data.score}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {data.score}%
                      </div>
                    </div>
                    <div className="w-32 text-xs text-gray-600 truncate">{data.topic}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Trend Analysis</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {trend > 10 && <p>🎉 Excellent improvement! You're on the right track.</p>}
                {trend > 0 && trend <= 10 && <p>📈 Steady improvement. Keep up the good work!</p>}
                {trend === 0 && <p>📊 Consistent performance. Consider challenging yourself more.</p>}
                {trend < 0 && trend >= -10 && <p>📉 Slight decline. Review your weak areas.</p>}
                {trend < -10 && <p>⚠️ Performance declining. Consider taking a break or reviewing fundamentals.</p>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
