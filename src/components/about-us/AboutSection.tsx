// src/components/about-us/AboutSection.tsx
"use client"

import { motion, LazyMotion, domAnimation  } from "framer-motion"
import {
  Palette,
  FlaskConical,
  PenTool,
  Wallet,
  Megaphone,
  CalendarDays,
} from "lucide-react"


export default function AboutSection() {
  return (
    <div className="relative z-10 flex min-h-screen w-full items-center justify-center py-20">
      <div className="flex flex-col items-center justify-center px-6 text-center mx-auto">
        <div className="relative z-10 text-center mb-2">
          <h1
            className="text-6xl font-light tracking-wide text-white mb-2"
            style={{ textShadow: "0 0 24px rgba(69,190,214,0.28)" }}
          >
            ABOUT US
          </h1>
          <p
            className="text-sm uppercase"
            style={{
              letterSpacing: "0.3em",
              background: "linear-gradient(90deg, #45bed6 0%, #f0c4da 45%, #d85897 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            engineering the future of healthcare
          </p>
        </div>


      <motion.div
        className="max-w-4xl mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-white font-sans text-lg leading-relaxed">
          IEEE Engineering in Medicine and Biology Society (EMBS) is the
          world's largest international community of biomedical engineers,
          researchers, and innovators dedicated to advancing healthcare
          through technology.
        </p>

        <p className="text-white font-sans text-lg leading-relaxed mt-6">
          By bringing together engineering, medicine, and biology, EMBS
          fosters scientific excellence, interdisciplinary collaboration,
          and innovation that address global healthcare challenges and
          improve lives worldwide.
        </p>
      </motion.div>

      <p className="text-white font-sans text-lg mt-8 max-w-3xl mx-auto">
        At IEEE EMBS VIT, we cultivate innovation, research, and collaboration,
        empowering students to explore the intersection of technology and healthcare.
      </p>


      <h2 className="text-4xl font-semibold text-white mt-10 mb-2">
        Our Pillars
      </h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:bg-white/[0.07] hover:scale-[1.02]">
          <h3 className="text-blue-400 font-semibold text-xl">
            Innovation
          </h3>
          <p className="text-white/70 leading-relaxed mt-2">
            Advancing biomedical technologies and healthcare solutions.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:bg-white/[0.07] hover:scale-[1.02]">
          <h3 className="text-purple-400 font-semibold text-xl">
            Collaboration
          </h3>
          <p className="text-white/70 leading-relaxed mt-2">
            Bridging engineering, medicine, and biological sciences.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:bg-white/[0.07] hover:scale-[1.02]">
          <h3 className="text-pink-400 font-semibold text-xl">
            Impact
          </h3>
          <p className="text-white/70 leading-relaxed mt-2">
            Creating solutions that improve healthcare worldwide.
          </p>
        </div>
      </div>

      <div className="text-center items-center justify-center mt-10 mb-2">
        <h2 className="text-4xl font-semibold text-white">
          Our Departments
        </h2>

        <p className="text-white/70 leading-relaxed mt-2">
          Specialized teams working together to drive innovation and impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 gap-8 max-w-6xl w-full">
        <motion.div
          whileHover={{
            y: -8,
            rotateX: 4,
            rotateY: -4,
          }}
          transition={{ duration: 0.35 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
        >
          {/* Animated glow */}
          <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <div className="absolute -inset-[100px] bg-cyan-500/20 blur-3xl" />
          </div>

          {/* Animated top line */}
          <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-700 group-hover:left-full" />

            {/* Icon */}
            <div className="relative z-10 flex items-center gap-4 mb-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 transition-all duration-300 group-hover:scale-110">
                <Palette className="h-7 w-7 text-cyan-300" />
              </div>

              <h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-cyan-200">
                Design
              </h3>

            </div>

            {/* Description */}
            <p className="relative z-10 mt-3 leading-relaxed text-white/65">
              Creative media, branding, posters, and visual storytelling.
            </p>

        </motion.div>

        <motion.div
          whileHover={{
            y: -8,
            rotateX: 4,
            rotateY: -4,
          }}
          transition={{ duration: 0.35 }}
          className="group relative overflow-hidden rounded-3xl border border-purple-400/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
        >
          <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <div className="absolute -inset-[100px] bg-purple-500/20 blur-3xl" />
          </div>

          <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-700 group-hover:left-full" />
            <div className="relative z-10 flex items-center gap-4 mb-5">

  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 transition-all duration-300 group-hover:scale-110">
    <FlaskConical className="h-7 w-7 text-purple-300" />
  </div>

  <h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-purple-200">
  Research &  Development
</h3>

          </div>

          <p className="relative z-10 mt-3 leading-relaxed text-white/65">
            Biomedical research initiatives, discussions, and technical projects.
          </p>

        </motion.div>


        <motion.div
          whileHover={{
            y: -8,
            rotateX: 4,
            rotateY: -4,
          }}
          transition={{ duration: 0.35 }}
          className="group relative overflow-hidden rounded-3xl border border-pink-400/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
        >
          <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <div className="absolute -inset-[100px] bg-pink-500/20 blur-3xl" />
          </div>

          <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-pink-400 to-transparent transition-all duration-700 group-hover:left-full" />
            <div className="relative z-10 flex items-center gap-4 mb-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-400/20 transition-all duration-300 group-hover:scale-110">
                <PenTool className="h-7 w-7 text-pink-300" />
              </div>

              <h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-pink-200">
                Editorial
              </h3>

            </div>
            <p className="relative z-10 mt-3 leading-relaxed text-white/65">
              Blogs, content writing, documentation, and digital publications.
            </p>

        </motion.div>
      </div>
      
      <div className="bg-transparent relative w-3xl items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full">
          <motion.div
            whileHover={{
              y: -8,
              rotateX: 4,
              rotateY: -4,
            }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
          >
            <div className="absolute item-center inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="absolute -inset-[100px] bg-emerald-500/20 blur-3xl" />
            </div>

            <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-700 group-hover:left-full" />

            <div className="relative z-10 flex items-center gap-4 mb-5">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 transition-all duration-300 group-hover:scale-110">
              <Wallet className="h-7 w-7 text-emerald-300" />
            </div>

            <h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-emerald-200">
              Finance
            </h3>

          </div>

          <p className="relative z-10 mt-3 leading-relaxed text-white/65">
            Budget planning, sponsorship management, and financial operations.
          </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              rotateX: 4,
              rotateY: -4,
            }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-3xl border border-violet-300/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="absolute -inset-[100px] bg-violet-400/20 blur-3xl" />
            </div>

            <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-violet-300 to-transparent transition-all duration-700 group-hover:left-full" />

            <div className="relative z-10 flex items-center gap-4 mb-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 transition-all duration-300 group-hover:scale-110">
                <Megaphone className="h-7 w-7 text-violet-200" />
              </div>

              <h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-violet-100">
                PR & Outreach
              </h3>

            </div>

            <p className="relative z-10 mt-3 leading-relaxed text-white/65">
              Industry connections, collaborations, networking, and publicity.
            </p>

          </motion.div>
        </div>
      </div>  
    </div>
  </div>
  )
} 

