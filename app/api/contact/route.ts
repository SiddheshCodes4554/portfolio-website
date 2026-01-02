import { type NextRequest, NextResponse } from "next/server"
import { saveSubmission } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Save submission (locally)
    // Note: This might fail in serverless environments (like Vercel) which is fine.
    // We treat it as "best effort".
    let submissionId = "submitted-" + Date.now()
    try {
      const submission = await saveSubmission({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        ipAddress: request.ip || request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      })
      submissionId = submission.id
    } catch (fsError) {
      console.warn("Could not save to local filesystem (expected in serverless):", fsError)
    }

    // Send to Google Sheets if URL is configured
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL
    if (scriptUrl) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        await fetch(scriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError)
        // We continue because local save was successful
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      id: submissionId,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
