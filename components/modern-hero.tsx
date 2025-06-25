"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

export default function ModernHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 })

      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      }).from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      )

      // Animated background elements
      gsap.to(".floating-shape", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      })

      gsap.to(".rotating-shape", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2,
      })

      // Particle animation
      gsap.to(".particle", {
        y: -100,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "power2.out",
        stagger: {
          amount: 2,
          from: "random",
        },
      })

      // Dynamic text changing
      const roles = ["FULL STACK DEVELOPER", "VIDEO EDITOR", "CREATIVE DESIGNER"]
      let currentIndex = 0

      const changeText = () => {
        const textElement = document.querySelector(".dynamic-text")
        if (textElement) {
          gsap.to(textElement, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
              textElement.textContent = roles[currentIndex]
              gsap.to(textElement, {
                opacity: 1,
                y: 0,
                duration: 0.3,
              })
              currentIndex = (currentIndex + 1) % roles.length
            },
          })
        }
      }

      gsap.delayedCall(4, () => {
        setInterval(changeText, 3000)
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 md:px-6"
      id="home"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Blobs */}
        <div className="floating-shape absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="floating-shape absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        {/* Geometric Shapes */}
        <div className="rotating-shape absolute top-20 left-20 w-4 h-4 bg-cyan-400/60 rotate-45"></div>
        <div className="rotating-shape absolute top-40 right-32 w-6 h-6 bg-purple-400/60 rounded-full"></div>
        <div className="rotating-shape absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400/60"></div>
        <div className="rotating-shape absolute bottom-20 right-20 w-5 h-5 bg-cyan-300/60 rotate-45"></div>
        <div className="rotating-shape absolute top-1/2 left-10 w-2 h-8 bg-purple-300/40"></div>
        <div className="rotating-shape absolute top-1/3 right-10 w-8 h-2 bg-pink-300/40"></div>

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="floating-shape absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          <div className="floating-shape absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Text Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div className="hero-title">
              <h1 className="text-4xl md:text-8xl lg:text-7xl font-black text-white leading-none">
                SIDDHESH GAWADE<span className="text-cyan-400">.</span>
              </h1>
            </div>

            <div className="hero-subtitle">
              <div className="text-xl md:text-2xl lg:text-2xl font-bold text-cyan-400 h-8 md:h-10">
                <span className="dynamic-text">FULL STACK DEVELOPER</span>
              </div>
            </div>
          </div>

          <div className="hero-subtitle">
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences that push boundaries. Specializing in cutting-edge web development and
              quality Video Editing.
            </p>
          </div>

          <div className="hero-subtitle flex flex-col sm:flex-row gap-4 justify-center">
          <button
  onClick={() => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }}
  className="group relative px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold overflow-hidden transition-all duration-300 hover:text-black rounded-lg text-sm md:text-base"
>
  <span className="relative z-10">VIEW PROJECTS</span>
  <div className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
</button>

<button
  onClick={() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }}
  className="px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-300 rounded-lg text-sm md:text-base"
>
  GET IN TOUCH
</button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <span className="text-gray-400 text-sm">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </div>
    </section>
  )
}
