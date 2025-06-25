import type { NextRequest } from "next/server"

// Simple admin credentials (in production, use environment variables and proper hashing)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, use bcrypt hashing
}

export interface AdminSession {
  isAuthenticated: boolean
  username?: string
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function createSessionToken(): string {
  return Buffer.from(`admin:${Date.now()}`).toString("base64")
}

export function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [username, timestamp] = decoded.split(":")

    // Check if token is valid and not expired (24 hours)
    const tokenAge = Date.now() - Number.parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    return username === "admin" && tokenAge < maxAge
  } catch {
    return false
  }
}

export function getSessionFromRequest(request: NextRequest): AdminSession {
  const token = request.cookies.get("admin-session")?.value

  if (token && validateSessionToken(token)) {
    return { isAuthenticated: true, username: "admin" }
  }

  return { isAuthenticated: false }
}
