"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const educationData = [
  {
    school: "Shanitiketan English Medium School",
    degree: "10th Grade (SSC)",
    duration: "2013 - 2023",
    location: "Sawantwadi",
    percentage: "95%",
    description: "Completed Class 10 with 95.20 Percentage, excelling in Mathematics with 100% score",
    color: "cyan",
  },
  {
    school: "Dheeraj Jr. College of Arts, Commerce & Science",
    degree: "12th Grade (HSC)",
    duration: "2023 - 2025",
    location: "Pune",
    percentage: "83%",
    description: "Completed Class 12 with 83.50 Percentage, excelling in Mathematics with 91% score",
    color: "purple",
  },
  {
    school: "Nxtwave Institute of Advanced Technologies, NIAT",
    degree: "Btech. Computer Science and Engineering",
    duration: "2025-2029",
    location: "Pune",
    percentage: "Ongoing",
    description: "Pursuing B.Tech in Computer Science and Engineering in specialization in Artificial Intelligence and Machine Learning",
    color: "pink",
  },
]

export default function EducationSection() {
  const educationRef = useRef<HTMLDivElement>(null)

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
            trigger: educationRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, educationRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={educationRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="education">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            EDUCATION<span className="text-purple-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">My Academic Journey</p>
          <div className="w-16 md:w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2"></div>

            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-start mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform md:-translate-x-1/2 z-10 ${
                    edu.color === "cyan"
                      ? "bg-cyan-400"
                      : edu.color === "purple"
                        ? "bg-purple-400"
                        : edu.color === "pink"
                          ? "bg-pink-400"
                          : "bg-yellow-400"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                      edu.color === "cyan"
                        ? "bg-cyan-400"
                        : edu.color === "purple"
                          ? "bg-purple-400"
                          : edu.color === "pink"
                            ? "bg-pink-400"
                            : "bg-yellow-400"
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <GraduationCap
                          className={`w-6 h-6 ${
                            edu.color === "cyan"
                              ? "text-cyan-400"
                              : edu.color === "purple"
                                ? "text-purple-400"
                                : edu.color === "pink"
                                  ? "text-pink-400"
                                  : "text-yellow-400"
                          }`}
                        />
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">{edu.school}</h3>
                          <p
                            className={`font-semibold ${
                              edu.color === "cyan"
                                ? "text-cyan-400"
                                : edu.color === "purple"
                                  ? "text-purple-400"
                                  : edu.color === "pink"
                                    ? "text-pink-400"
                                    : "text-yellow-400"
                            }`}
                          >
                            {edu.degree}
                          </p>
                        </div>
                      </div>
                      <Award
                        className={`w-5 h-5 ${
                          edu.color === "cyan"
                            ? "text-cyan-400"
                            : edu.color === "purple"
                              ? "text-purple-400"
                              : edu.color === "pink"
                                ? "text-pink-400"
                                : "text-yellow-400"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm text-gray-400 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Grade/Percentage */}
                    <div className="mb-4">
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          edu.color === "cyan"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : edu.color === "purple"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : edu.color === "pink"
                                ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {edu.percentage}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{edu.description}</p>

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
