// src/components/about-us/AboutSection.tsx

  "use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

import {
  Palette,
  FlaskConical,
  PenTool,
  Wallet,
  Megaphone,
  CalendarDays,
} from "lucide-react"

interface AnimatedGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function BeamsBackground({ className, intensity = "strong" }: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const MINIMUM_BEAMS = 20

  const opacityMap = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

   const updateCanvasSize = () => {
  const dpr = window.devicePixelRatio || 1

  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  )

  canvas.width = window.innerWidth * dpr
  canvas.height = pageHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${pageHeight}px`

  ctx.scale(dpr, dpr)

  const totalBeams = MINIMUM_BEAMS * 1.5
  beamsRef.current = Array.from(
    { length: totalBeams },
    () => createBeam(canvas.width, canvas.height)
  )
}

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam

      const column = index % 3
      const spacing = canvas.width / 3

      beam.y = canvas.height + 100
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4
      beam.hue = 190 + (index * 70) / totalBeams
      beam.opacity = 0.2 + Math.random() * 0.1
      return beam
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      // Calculate pulsing opacity
      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      // Enhanced gradient with multiple color stops
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(35px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(ctx, beam)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity])

  return (
    <div className={`relative min-h-screen w-full bg-neutral-950 ${className || ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: "blur(15px)" }} />

<motion.div
  className="absolute inset-0 bg-neutral-950/5"
  animate={{
    opacity: [0.05, 0.15, 0.05],
  }}
  transition={{
    duration: 10,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  }}
  style={{
    backdropFilter: "blur(50px)",
  }}
/>

<div className="relative z-10 flex min-h-screen w-full items-center justify-center py-20">
  <div className="flex flex-col items-center justify-center gap-8 px-6 text-center max-w-6xl mx-auto">
    
    <motion.h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      ABOUT EMBS
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl text-white/80 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Engineering the Future of Healthcare
    </motion.p>

    <motion.div
      className="max-w-4xl mt-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <p className="text-white/80 text-lg leading-relaxed">
        IEEE Engineering in Medicine and Biology Society (EMBS) is the
        world's largest international community of biomedical engineers,
        researchers, and innovators dedicated to advancing healthcare
        through technology.
      </p>

      <p className="text-white/70 text-lg leading-relaxed mt-6">
        By bringing together engineering, medicine, and biology, EMBS
        fosters scientific excellence, interdisciplinary collaboration,
        and innovation that address global healthcare challenges and
        improve lives worldwide.
      </p>
    </motion.div>

    <p className="text-white/70 text-lg mt-8 max-w-3xl mx-auto">
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

<div className="text-center mt-10 mb-2">
  <h2 className="text-4xl font-semibold text-white">
    Our Departments
  </h2>

  <p className="text-white/70 leading-relaxed mt-2">
    Specialized teams working together to drive innovation and impact.
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">

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

<motion.div
  whileHover={{
    y: -8,
    rotateX: 4,
    rotateY: -4,
  }}
  transition={{ duration: 0.35 }}
  className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
>
  <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
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

<motion.div
  whileHover={{
    y: -8,
    rotateX: 4,
    rotateY: -4,
  }}
  transition={{ duration: 0.35 }}
  className="group relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-zinc-900/85 p-6 backdrop-blur-xl"
>
  <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100">
    <div className="absolute -inset-[100px] bg-indigo-500/20 blur-3xl" />
  </div>

  <div className="absolute top-0 left-[-100%] h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent transition-all duration-700 group-hover:left-full" />

<div className="relative z-10 flex items-center gap-4 mb-5">

  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 transition-all duration-300 group-hover:scale-110">
    <CalendarDays className="h-7 w-7 text-indigo-300" />
  </div>

<h3 className="min-h-[56px] flex items-center text-lg leading-snug font-semibold text-violet-200">
    Events &  Management
  </h3>

</div>

  <p className="relative z-10 mt-3 leading-relaxed text-white/65">
    Event planning, logistics, coordination, and execution.
  </p>

</motion.div>
</div>

</div>

</div>

    </div>

  )
  }

