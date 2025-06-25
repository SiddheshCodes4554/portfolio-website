"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function VideoPlayer({ videoUrl, isOpen, onClose, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  // Keyboard shortcuts handler
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key.toLowerCase()) {
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
        case "escape":
          e.preventDefault()
          if (isFullscreen) {
            exitFullscreen()
          } else {
            onClose()
          }
          break
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "arrowleft":
          e.preventDefault()
          skipTime(-10) // Rewind 10 seconds
          break
        case "arrowright":
          e.preventDefault()
          skipTime(10) // Forward 10 seconds
          break
        case "arrowup":
          e.preventDefault()
          adjustVolume(0.1)
          break
        case "arrowdown":
          e.preventDefault()
          adjustVolume(-0.1)
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
      }
    },
    [isOpen, isFullscreen, onClose],
  )

  // Add keyboard event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress)
      return () => document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isOpen, handleKeyPress])

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isOpen])

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("volumechange", handleVolumeChange)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("volumechange", handleVolumeChange)
    }
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds))
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const adjustVolume = (delta: number) => {
    if (videoRef.current) {
      const newVolume = Math.max(0, Math.min(1, videoRef.current.volume + delta))
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Fullscreen error:", error)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Exit fullscreen error:", error)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (Number.parseFloat(e.target.value) / 100) * duration
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = Number.parseFloat(e.target.value) / 100
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className={`relative bg-black rounded-2xl overflow-hidden ${
          isFullscreen ? "w-full h-full" : "w-full max-w-4xl"
        }`}
      >
        {/* Close Button */}
        {!isFullscreen && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Keyboard Shortcuts Info */}
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-1">
            <div>
              <kbd className="bg-white/20 px-1 rounded">F</kbd> Fullscreen
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">←→</kbd> Skip ±10s
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">Space</kbd> Play/Pause
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">Esc</kbd> Exit
            </div>
          </div>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          className={`w-full ${isFullscreen ? "h-full" : "aspect-video"} object-contain`}
          src={videoUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Time */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Title */}
              <h3 className="text-white font-semibold hidden md:block">{title}</h3>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .slider::-webkit-slider-track {
          background: #4a5568;
          height: 4px;
          border-radius: 2px;
        }

        .slider::-moz-range-track {
          background: #4a5568;
          height: 4px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}
