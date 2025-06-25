"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 3,
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      })
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        duration: 0.5,
        ease: "power3.out",
      })
    }
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="nav-item">
            <h1 className="text-2xl font-bold text-white">
              ALEX<span className="text-cyan-400">.</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Work", "Skills", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-item text-white hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden nav-item text-white hover:text-cyan-400 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 w-full h-screen bg-black/95 backdrop-blur-lg z-30 translate-x-full md:hidden">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {["Home", "About", "Work", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="text-3xl text-white hover:text-cyan-400 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
