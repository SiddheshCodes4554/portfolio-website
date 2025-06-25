"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    location: "New York, NY",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    achievements: ["Increased app performance by 40%", "Led team of 5 developers", "Implemented CI/CD pipeline"],
    color: "cyan",
  },
  {
    title: "Video Production Specialist",
    company: "Creative Studios",
    period: "2021 - 2022",
    location: "Los Angeles, CA",
    description: "Created compelling video content for major brands using advanced editing and motion graphics.",
    achievements: ["Produced 50+ commercial videos", "Won 3 industry awards", "Managed $2M+ in projects"],
    color: "purple",
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    period: "2020 - 2021",
    location: "San Francisco, CA",
    description: "Built responsive web applications and improved user experience across multiple platforms.",
    achievements: ["Reduced load time by 60%", "Implemented design system", "Mentored junior developers"],
    color: "pink",
  },
]

export default function ExperienceSection() {
  const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-item",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, experienceRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={experienceRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="work">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            EXPERIENCE<span className="text-purple-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">My Professional Journey</p>
          <div className="w-16 md:w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-start mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform md:-translate-x-1/2 z-10 ${
                    exp.color === "cyan" ? "bg-cyan-400" : exp.color === "purple" ? "bg-purple-400" : "bg-pink-400"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                      exp.color === "cyan" ? "bg-cyan-400" : exp.color === "purple" ? "bg-purple-400" : "bg-pink-400"
                    }`}
                  ></div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p
                        className={`font-semibold ${
                          exp.color === "cyan"
                            ? "text-cyan-400"
                            : exp.color === "purple"
                              ? "text-purple-400"
                              : "text-pink-400"
                        }`}
                      >
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm text-gray-400 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{exp.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start">
                            <div
                              className={`w-1.5 h-1.5 rounded-full mr-2 mt-2 flex-shrink-0 ${
                                exp.color === "cyan"
                                  ? "bg-cyan-400"
                                  : exp.color === "purple"
                                    ? "bg-purple-400"
                                    : "bg-pink-400"
                              }`}
                            ></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
