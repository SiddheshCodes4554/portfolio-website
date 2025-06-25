"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, User, MessageSquare, TrendingUp, LogOut, Eye, Clock, X } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

interface SubmissionStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [stats, setStats] = useState<SubmissionStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions?stats=true")

      if (response.status === 401) {
        router.push("/admin/login")
        return
      }

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return formatDate(timestamp)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Manage contact form submissions</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Submissions</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Today</p>
                    <p className="text-2xl font-bold text-white">{stats.today}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Week</p>
                    <p className="text-2xl font-bold text-white">{stats.thisWeek}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
                  </div>
                  <Mail className="w-8 h-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Submissions List */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Submissions</CardTitle>
            <CardDescription className="text-gray-400">
              Latest contact form submissions from your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{submission.name}</h3>
                          <p className="text-sm text-gray-400">{submission.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {getTimeAgo(submission.timestamp)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSubmission(submission)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium text-white mb-1">{submission.subject}</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{submission.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>IP: {submission.ipAddress}</span>
                      <span>{formatDate(submission.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-black border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Submission Details</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedSubmission(null)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="text-white">{selectedSubmission.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <p className="text-white">{selectedSubmission.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Subject</label>
                <p className="text-white">{selectedSubmission.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Message</label>
                <p className="text-white whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="text-sm font-medium text-gray-400">Submitted</label>
                  <p className="text-white text-sm">{formatDate(selectedSubmission.timestamp)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">IP Address</label>
                  <p className="text-white text-sm">{selectedSubmission.ipAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
