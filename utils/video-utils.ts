// Utility functions for video processing
export const extractVideoThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      reject(new Error("Canvas context not available"))
      return
    }

    video.crossOrigin = "anonymous"
    video.currentTime = 1 // Extract thumbnail at 1 second

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }

    video.onseeked = () => {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        resolve(thumbnailDataUrl)
      } catch (error) {
        reject(error)
      }
    }

    video.onerror = () => {
      reject(new Error("Failed to load video"))
    }

    video.src = videoUrl
    video.load()
  })
}

export const extractVideoDuration = (videoUrl: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")

    video.onloadedmetadata = () => {
      resolve(video.duration)
    }

    video.onerror = () => {
      reject(new Error("Failed to load video"))
    }

    video.src = videoUrl
    video.load()
  })
}

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
