"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/custom-cursor"
import ModernHero from "@/components/modern-hero"
import AboutSection from "@/components/about-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import LoadingScreen from "@/components/loading-screen"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ModernPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Smooth scrolling setup
    let scrollY = 0
    const handleScroll = () => {
      scrollY = window.scrollY
      document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      <main ref={containerRef} className="relative">
        <ModernHero />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
