"use client"

import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Name */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Siddhesh Gawade
            </h3>
            <p className="text-gray-400 mt-2">Full Stack Developer & Video Editor</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            <a
              href="https://github.com/SiddheshCodes4554"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
            >
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/siddhesh-gawade-b77535369/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
            >
              <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://x.com/SiddheshGa75887"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
            >
              <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.instagram.com/siddhesh_gawade11/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
            >
              <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 w-full">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Siddhesh Gawade. All rights reserved. Built with passion and creativity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
