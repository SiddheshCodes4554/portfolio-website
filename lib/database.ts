import fs from "fs/promises"
import path from "path"

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

const DB_PATH = path.join(process.cwd(), "data", "submissions.json")

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read submissions from file
export async function getSubmissions(): Promise<ContactSubmission[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DB_PATH, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save submission to file
export async function saveSubmission(
  submission: Omit<ContactSubmission, "id" | "timestamp">,
): Promise<ContactSubmission> {
  await ensureDataDir()

  const submissions = await getSubmissions()
  const newSubmission: ContactSubmission = {
    ...submission,
    id: generateId(),
    timestamp: new Date().toISOString(),
  }

  submissions.unshift(newSubmission) // Add to beginning
  await fs.writeFile(DB_PATH, JSON.stringify(submissions, null, 2))

  return newSubmission
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Get submission statistics
export async function getSubmissionStats() {
  const submissions = await getSubmissions()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    total: submissions.length,
    today: submissions.filter((s) => new Date(s.timestamp) >= today).length,
    thisWeek: submissions.filter((s) => new Date(s.timestamp) >= thisWeek).length,
    thisMonth: submissions.filter((s) => new Date(s.timestamp) >= thisMonth).length,
  }
}
