"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Background animation
      gsap.to(backgroundRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })

      // Name animation
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 },
      )

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.2, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.8 },
      )

      // Tagline text changing animation
      const taglines = ["Full Stack Developer", "Video Editor", "Creative Designer"]

      let currentIndex = 0

      const animateTagline = () => {
        gsap.to(taglineRef.current, {
          text: taglines[currentIndex],
          duration: 1,
          ease: "none",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % taglines.length
            gsap.delayedCall(2, animateTagline)
          },
        })
      }

      gsap.delayedCall(1.5, animateTagline)

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="section w-screen h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      {/* Parallax Background Elements */}
      <div className="parallax-bg absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-80"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300 rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
        {/* Name behind image effect */}
        <div className="relative mb-8">
          <div ref={nameRef} className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-8xl md:text-9xl font-bold text-white/10 select-none">SIDDHESH GAWADE</h1>
          </div>

          {/* Profile Image */}
          <div ref={imageRef} className="relative z-10 w-48 h-48 md:w-56 md:h-56 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
            <Image
              src="/placeholder.svg?height=224&width=224"
              alt="Alex - Full Stack Developer"
              width={224}
              height={224}
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/20"
            />
          </div>
        </div>

        {/* Dynamic Tagline */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-gray-300 mb-4">Hi, I'm Alex</p>
          <div className="h-16 flex items-center justify-center">
            <span
              ref={taglineRef}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {/* Full Stack Developer */}
            </span>
          </div>
        </div>

        {/* CTA */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
