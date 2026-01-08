"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, Award, Star, Medal, Target, Flag } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  date: string
  color: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Google Cloud Agentic AI Day Hackathon Finalist",
    description: "Got Selected in top 500 teams from about 70K+ teams. The event was a Guinness World Record breaker event for most participants.",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />,
    date: "2025",
    color: "from-yellow-400/20 to-yellow-600/20"
  },
]

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achievement-card",
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="achievements">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            ACHIEVEMENTS<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">Milestones & Recognition</p>
          <div className="w-16 md:w-24 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="achievement-card group relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10 overflow-hidden"
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <span className="text-gray-500 font-bold text-sm tracking-widest">{item.date}</span>
                </div>

                <h3 className="text-white font-bold text-xl md:text-2xl mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
