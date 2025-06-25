"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to(".loading-text", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(".loading-bar", {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
        })
        .to(".loading-screen", {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => setIsLoading(false),
        })
    }, loadingRef)

    return () => ctx.revert()
  }, [])

  if (!isLoading) return null

  return (
    <div ref={loadingRef} className="loading-screen fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="loading-text opacity-0 translate-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4"></h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">Loading Experience...</p>
        </div>

        <div className="w-48 md:w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="loading-bar h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-0 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
