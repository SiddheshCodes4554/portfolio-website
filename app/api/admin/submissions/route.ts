import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { getSubmissions, getSubmissionStats } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = getSessionFromRequest(request)
    if (!session.isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const includeStats = url.searchParams.get("stats") === "true"

    const submissions = await getSubmissions()

    if (includeStats) {
      const stats = await getSubmissionStats()
      return NextResponse.json({
        submissions,
        stats,
      })
    }

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Get submissions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
