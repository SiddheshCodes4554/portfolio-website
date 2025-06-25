"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { CodeXml, ClapperboardIcon, WrenchIcon, SquareCodeIcon } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Skill {
  name: string
  level: number
  color: string
  image: string
  category: "Web Development" | "Programming" | "Video Editing" | "Tools"
}

const skills: Skill[] = [
  // Frontend
  {
    name: "HTML",
    level: 100,
    color: "#FFA500",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Web Development",
  },
  {
    name: "CSS",
    level: 95,
    color: "blue",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Web Development",
  },
  {
    name: "React",
    level: 60,
    color: "#3178C6",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Web Development",
  },
  {
    name: "JavaScript",
    level: 90,
    color: "#F7DF1E",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Web Development",
  },
  {
    name: "Node.js",
    level: 30,
    color: "#339933",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Web Development",
  },

  {
    name: "PHP",
    level: 90,
    color: "#CBC3E3",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Web Development",
  },

  {
    name: "MySQL",
    level: 90,
    color: "#0000FF",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Web Development",
  },

  {
    name: "MongoDB",
    level: 45,
    color: "#2E8B57",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Web Development",
  },

  // Backend
  {
    name: "Python",
    level: 40,
    color: "#3776AB",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Programming",
  },
  {
    name: "JavaScript",
    level: 90,
    color: "#F7DF1E",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Programming",
  },
  {
    name: "C",
    level: 20,
    color: "#3776AB",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    category: "Programming",
  },
  {
    name: "C++",
    level: 40,
    color: "#3776AB",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    category: "Programming",
  },
  
  // Cloud & DevOps
  {
    name: "Adobe Premiere Pro",
    level: 80,
    color: "#AA336A",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
    category: "Video Editing",
  },
  {
    name: "Adobe After Effects",
    level: 40,
    color: "#C9A9A6",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    category: "Video Editing",
  },
  {
    name: "Filmora",
    level: 100,
    color: "#96DED1",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Wondershare_filmora_logo.svg/200px-Wondershare_filmora_logo.svg.png?20200924203624",
    category: "Video Editing",
  },

  // Design & Video
  {
    name: "ChatGPT",
    level: 90,
    color: "#74AA9C",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/768px-ChatGPT_logo.svg.png?20230903231118",
    category: "Tools",
  },
  {
    name: "Lovable.dev",
    level: 100,
    color: "#FF61F6",
    image: "https://cdn.brandfetch.io/idH9OjyiUq/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    category: "Tools",
  },
  {
    name: "Figma",
    level: 85,
    color: "#F24E1E",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Tools",
  },
]

const categories = [
  { id: "Web Development", name: "Web Development", icon: CodeXml, color: "cyan" },
  { id: "Programming", name: "Programming", icon: SquareCodeIcon, color: "purple" },
  { id: "Video Editing", name: "Video Editing", icon: ClapperboardIcon, color: "pink" },
  { id: "Tools", name: "Tools", icon: WrenchIcon, color: "yellow" },
]

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>("Web Development")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Background floating elements
      gsap.to(".floating-element", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      })

      gsap.to(".rotating-element", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2,
      })

      // Section reveal animation
      gsap.fromTo(
        ".skills-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Category buttons animation
      gsap.fromTo(
        ".category-btn",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".categories-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  // Animate skills when category changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.fromTo(
      ".skill-orb",
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [activeCategory]);

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.color || "cyan"
  }

  return (
    <section ref={skillsRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="skills">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-element absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="floating-element absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="rotating-element absolute top-20 left-20 w-4 h-4 bg-cyan-400/60 rotate-45"></div>
        <div className="rotating-element absolute top-40 right-32 w-6 h-6 bg-purple-400/60 rounded-full"></div>
        <div className="rotating-element absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400/60"></div>
        <div className="rotating-element absolute bottom-20 right-20 w-5 h-5 bg-cyan-300/60 rotate-45"></div>

        {/* Grid pattern */}
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
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20 skills-title">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            SKILLS<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">Technologies That Power My Creativity</p>
          <div className="w-16 md:w-24 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </div>

        {/* Category Navigation */}
        <div className="categories-container flex justify-center mb-12 md:mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            {categories.map((category) => {
              const IconComponent = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold transition-all duration-500 text-sm md:text-base group ${
                    isActive
                      ? `bg-gradient-to-r ${
                          category.color === "cyan"
                            ? "from-cyan-500 to-blue-500"
                            : category.color === "purple"
                              ? "from-purple-500 to-indigo-500"
                              : category.color === "pink"
                                ? "from-pink-500 to-rose-500"
                                : "from-yellow-500 to-orange-500"
                        } text-white shadow-lg`
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Skills Display */}
        <div className="max-w-5xl mx-auto">
          {/* Skills Orbs */}
          <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center mb-12">
            <div className="relative w-full h-full">
              {filteredSkills.map((skill, index) => {
                const angle = (index * 360) / filteredSkills.length
                const radius = 160 + (index % 2) * 50 // Increased radius for more space
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                return (
                  <div
                    key={skill.name}
                    className="skill-orb absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Orb */}
                    <div className="relative">
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                        style={{ backgroundColor: skill.color }}
                      ></div>

                      {/* Main orb */}
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-white/40 transition-all duration-500">
                        <div className="w-8 h-8 md:w-10 md:h-10 relative">
                          <Image
                            src={skill.image || "/placeholder.svg"}
                            alt={`${skill.name} logo`}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                            style={{
                              filter: skill.name === "Next.js" ? "invert(1)" : "none",
                            }}
                          />
                        </div>
                      </div>

                      {/* Skill name and level */}
                      <div
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center transition-all duration-300 ${
                          hoveredSkill === skill.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                      >
                        <p className="text-white font-bold text-sm whitespace-nowrap">{skill.name}</p>
                        <div className="flex items-center justify-center mt-1">
                          <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: skill.color,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 ml-2">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Center decoration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${
                      getCategoryColor(activeCategory) === "cyan"
                        ? "from-cyan-500 to-blue-500"
                        : getCategoryColor(activeCategory) === "purple"
                          ? "from-purple-500 to-indigo-500"
                          : getCategoryColor(activeCategory) === "pink"
                            ? "from-pink-500 to-rose-500"
                            : "from-yellow-500 to-orange-500"
                    } rounded-full flex items-center justify-center shadow-2xl`}
                  >
                    {(() => {
                      const category = categories.find((c) => c.id === activeCategory)
                      const IconComponent = category?.icon || CodeXml
                      return <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </section>
  )
}
