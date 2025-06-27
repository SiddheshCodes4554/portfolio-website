"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, ExternalLink, Play, Code, Video } from "lucide-react"
import Image from "next/image"
import VideoPlayer from "./video-player"
import { extractVideoThumbnail, extractVideoDuration, formatDuration } from "../utils/video-utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: number
  title: string
  description: string
  image?: string
  thumbnail?: string
  category: "coding" | "video"
  technologies?: string[]
  software?: string[]
  github?: string
  live?: string
  videoUrl?: string
  duration?: string
  year: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Sindhudurg Sainik School Website",
    description: "This is a full stack school website project along with admin panel allowing admin to manage each and every part of website without need to change the code.",
    image: "/project1.jpeg?height=300&width=400",
    category: "coding",
    technologies: ["HTML", "CSS", "PHP", "MYSQL", "JAVASCRIPT"],
    github: "https://github.com/SiddheshCodes4554/SchoolWebsite",
    live: "https://drive.google.com/file/d/1azlXpAYYxxQTSvqWOxuiKsodzI1Z0hIW/view?usp=sharing",
    year: "2024",
  },
  {
    id: 2,
    title: "Internship Sample Video",
    description: "I edited this raw footage and enhanced it with some music and added some effects using Adobe Premiere Pro and After Effects.",
    category: "video",
    software: ["Premiere Pro", "After Effects"],
    videoUrl: "/Video1.mp4",
    year: "2024",
  },
  {
    id: 3,
    title: "Github Readme Generator",
    description: "The GitHub Readme Generator is an AI-powered tool that simplifies the process of creating professional, detailed README files for GitHub repositories.",
    image: "/project2.jpeg?height=300&width=400",
    category: "coding",
    technologies: ["React", "No code", "Node.js", "MongoDB"],
    github: "https://github.com",
    live: "https://app--readmeai-40695e8a.base44.app/",
    year: "2023",
  },
  {
    id: 4,
    title: "Personal Financial Tracker",
    description: "This is a modern, responsive financial tracking web application built using the MERN stack with Supabase as the backend. The app allows users to seamlessly manage their income and expenses in real-time with a clean and intuitive UI",
    image: "/project4.jpeg?height=300&width=400",
    category: "coding",
    technologies: ["MERN", "MongoDB", "No Code"],
    github: "https://github.com/SiddheshCodes4554/personal-finance-app",
    live: "https://personal-finance-app-flame.vercel.app/",
    year: "2023",
  },
  {
    id: 5,
    title: "Farmstay Website",
    description: "A creative Hotel/Stay Showcase website with great ui. This projecct has a Admin panel making it a fully functional dynamic full stack Website.",
    image: "/project3.jpeg?height=300&width=400",
    category: "coding",
    technologies: ["HTML", "CSS", "PHP", "MYSQL", "JAVASCRIPT"],
    github: "https://github.com/SiddheshCodes4554/Farmstay-Website",
    live: "https://drive.google.com/file/d/1Jms67LAasMpuuGNjPVnlzYc2n0syYXSW/view?usp=sharing",
    year: "2023",
  },
]

export default function ProjectsSection() {
  const projectsRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<"coding" | "video">("coding")
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [loadingThumbnails, setLoadingThumbnails] = useState<Set<number>>(new Set())

  const filteredProjects = projects.filter((project) => project.category === filter)

  // Auto-generate thumbnails and extract duration for video projects
  useEffect(() => {
    const processVideoProjects = async () => {
      const videoProjects = projects.filter(
        (p) => p.category === "video" && p.videoUrl && (!p.thumbnail || !p.duration),
      )

      for (const project of videoProjects) {
        if (!project.videoUrl) continue

        setLoadingThumbnails((prev) => new Set(prev).add(project.id))

        try {
          const [thumbnail, duration] = await Promise.all([
            project.thumbnail ? Promise.resolve(project.thumbnail) : extractVideoThumbnail(project.videoUrl),
            project.duration ? Promise.resolve(0) : extractVideoDuration(project.videoUrl),
          ])

          setProjects((prevProjects) =>
            prevProjects.map((p) =>
              p.id === project.id
                ? {
                    ...p,
                    thumbnail: thumbnail,
                    duration: project.duration || formatDuration(duration),
                  }
                : p,
            ),
          )
        } catch (error) {
          console.error(`Failed to process video ${project.id}:`, error)
          // Set fallback values
          setProjects((prevProjects) =>
            prevProjects.map((p) =>
              p.id === project.id
                ? {
                    ...p,
                    thumbnail: p.thumbnail || "/placeholder.svg?height=300&width=400",
                    duration: p.duration || "0:00",
                  }
                : p,
            ),
          )
        } finally {
          setLoadingThumbnails((prev) => {
            const newSet = new Set(prev)
            newSet.delete(project.id)
            return newSet
          })
        }
      }
    }

    processVideoProjects()
  }, [projects])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, projectsRef)

    return () => ctx.revert()
  }, [filter])

  const handleVideoPlay = (videoUrl: string, title: string) => {
    setSelectedVideo({ url: videoUrl, title })
  }

  const closeVideoPlayer = () => {
    setSelectedVideo(null)
  }

  return (
    <section ref={projectsRef} className="py-16 md:py-24 bg-black relative overflow-hidden" id="projects">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            PROJECTS<span className="text-purple-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">My Best Work</p>
          <div className="w-16 md:w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("coding")}
              className={`flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                filter === "coding"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <Code className="w-4 h-4 md:w-5 md:h-5" />
              <span>Development</span>
            </button>

            <button
              onClick={() => setFilter("video")}
              className={`flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                filter === "video"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <Video className="w-4 h-4 md:w-5 md:h-5" />
              <span>Video Editing</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                {loadingThumbnails.has(project.id) ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                  </div>
                ) : (
                  <Image
                    src={
                      project.category === "video"
                        ? project.thumbnail || "/placeholder.svg?height=300&width=400"
                        : project.image || "/placeholder.svg?height=300&width=400"
                    }
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

               

                {/* Duration Badge for Videos */}
                {project.category === "video" && project.duration && (
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                    {project.duration}
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {project.category === "coding" ? (
                    <>
                      <button
                        className="p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </button>
                      <button
                        className="p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => project.videoUrl && handleVideoPlay(project.videoUrl, project.title)}
                      className="p-4 md:p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors group/play"
                      disabled={!project.videoUrl}
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white group-hover/play:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 md:p-6">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm md:text-base">{project.description}</p>

                {project.category === "coding" ? (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm font-medium border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-pink-400 font-bold text-base md:text-lg">
                      {project.duration || "Loading..."}
                    </span>
                    <div className="flex gap-2">
                      {project.software?.slice(0, 2).map((software) => (
                        <span
                          key={software}
                          className="px-2 md:px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs md:text-sm font-medium border border-pink-500/30"
                        >
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          isOpen={!!selectedVideo}
          onClose={closeVideoPlayer}
        />
      )}
    </section>
  )
}
