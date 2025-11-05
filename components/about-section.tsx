"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Briefcase } from "lucide-react"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Stats reveal animation
      gsap.fromTo(
        ".stats-card",
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Philosophy section reveal
      gsap.fromTo(
        ".philosophy-section",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".philosophy-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={aboutRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20 about-item">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            ABOUT<span className="text-cyan-400">.</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* Profile Image */}
          <div className="about-item lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <Image
                  src="/Profile_website.png?height=384&width=320"
                  alt="About Alex"
                  width={320}
                  height={384}
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base">4+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="about-item lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                I create digital experiences that
                <span className="text-cyan-400"> matter</span>
              </h3>
              <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  I’m a passionate tech explorer who loves diving deep into the ever-evolving world of technology. From building dynamic web applications to now venturing into the fascinating realms of Artificial Intelligence, Data Structures & Algorithms, and Data Science, I’m constantly expanding my skillset.
                </p>
                <p>
                  I thrive on solving problems, creating impactful projects, and staying curious. Whether it's coding, tinkering with Robotics & IoT, or learning the next big thing in tech — I’m all in.
                </p>
                <p>
                  With hands-on experience in web development and a growing interest in smart, intelligent systems, I aim to merge innovation with functionality to build solutions that matter.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                Full Stack Web Development
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                Video Production
              </span>
              <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium border border-pink-500/30">
                UI/UX Design
              </span>
            </div>

            <a
  href="/Siddhesh-Gawade-Resume.pdf"
  download
  className="mt-6 inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 text-center"
>
  Download Resume
</a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-16">
          {/* Projects Stats */}
          <div className="stats-card text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">4</div>
            <div className="text-white font-bold text-lg md:text-xl mb-2">Projects Completed</div>
            <div className="text-gray-400 text-sm md:text-base">
              I created Full Stack Web Applications. Edited Videos and Created UI/UX</div>
          </div>

          {/* Experience Stats */}
          <div className="stats-card text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Briefcase className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">3+</div>
            <div className="text-white font-bold text-lg md:text-xl mb-2">Years Experience</div>
            <div className="text-gray-400 text-sm md:text-base">
              I have been learning and creating apps.
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="philosophy-section">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">My Philosophy</h4>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
              "Great design is not just about how it looks, but how it works. Every line of code, every frame of video,
              every interaction should serve a purpose and create value for the user."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
