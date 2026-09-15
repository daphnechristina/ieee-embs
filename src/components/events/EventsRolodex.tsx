"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const events = [
  {
    date: "Mar 25",
    year: "2026",
    title: "The Silent Toxin",
    image: "/events/silenttoxin.jpeg",
    description:
      "A mystery-driven biomedical challenge exploring hidden toxins, diagnosis, and critical thinking through immersive problem-solving.",
  },
  {
    date: "Feb",
    year: "2026",
    title: "ElectroBio",
    image: "/events/electro-bio.jpg.jpeg",
    description:
      "An innovation showcase where participants presented biomedical engineering projects blending electronics, healthcare, and futuristic technology.",
  },
  {
    date: "Feb 10",
    year: "2026",
    title: "Crypt-a-Pharm",
    image: "/events/cryptapharmm.jpg.jpeg",
    description:
      "A pharmaceutical decoding challenge combining medical clues, chemistry, and strategy in a high-energy competitive experience.",
  },
  {
    date: "Sep 26",
    year: "2025",
    title: "404: Cure Not Found",
    image: "/events/curenotfound.jpg.jpeg",
    description:
      "A biomedical mystery event where participants searched for missing cures through diagnosis puzzles, research clues, and medical reasoning.",
  },
  {
    date: "Jul 23",
    year: "2025",
    title: "Bio Bluff",
    image: "/events/bioblufff.jpg.jpeg",
    description:
      "An interactive challenge of scientific deception, deduction, and biomedical trivia where participants separated facts from convincing bluffs.",
  },
  {
    date: "Jun",
    year: "2025",
    title: "Inventrek",
    image: "/events/iventrek.jpg.jpeg",
    description:
      "A creativity-driven innovation event encouraging participants to ideate futuristic biomedical solutions and breakthrough healthcare concepts.",
  },
  {
    date: "Apr 7",
    year: "2025",
    title: "Lab-on-a-Chip",
    image: "/events/labonchip.jpg.jpeg",
    description:
      "An insightful session exploring advanced lab-on-chip technologies and their revolutionary applications in neuroscience and precision medicine.",
  },
  {
    date: "Mar 6",
    year: "2025",
    title: "BioConnect",
    image: "/events/bioconnect.jpg.jpeg",
    description:
      "A networking and collaboration experience bringing together curious minds passionate about biomedical engineering and healthcare innovation.",
  },
  {
    date: "Sep 29",
    year: "2024",
    title: "Lab of Lunacy",
    image: "/events/laboflunacy.jpeg",
    description:
      "A biomedical escape room where participants solved medical mysteries and experimental challenges hidden within a mad scientist’s lab.",
  },
  {
    date: "Sep 21",
    year: "2024",
    title: "Circuit of Lies",
    image: "/events/circuitoflies.jpeg",
    description:
      "Circuit of Lies was a hands-on workshop where participants built a lie detector from scratch and tested it on themselves and friends.",
  },
  {
    date: "Aug 21",
    year: "2024",
    title: "CASA",
    image: "/events/casa.jpg.jpeg",
    description:
      "An engaging biomedical initiative focused on collaboration, awareness, and interactive learning through creative scientific activities.",
  },
  {
    date: "Jul 8",
    year: "2024",
    title: "Nexum",
    image: "/events/nexum.jpg.jpeg",
    description:
      "An exploration of emerging biomedical breakthroughs and innovative pathways shaping the future of diagnosis and treatment.",
  },
  {
    date: "Jun 26",
    year: "2024",
    title: "Road to Recovery",
    image: "/events/roadtorecovery.jpg.jpeg",
    description:
      "A healthcare-focused event highlighting patient recovery journeys, medical innovation, and the science behind rehabilitation.",
  },
  {
    date: "Mar 19",
    year: "2024",
    title: "CrisisX 2.0",
    image: "/events/crisisx2024.jpeg",
    description:
      "A medical emergency simulation event where students see the daily lives of healthcare professionals motivating them to innovate making emergency healthcare more efficient.",
  },
  {
    date: "Jun 7",
    year: "2023",
    title: "CrisisX",
    image: "/events/crisisx2023.jpeg",
    description:
      "An immersive emergency-response challenge where participants tackled critical healthcare scenarios with technology and developed decision-making skills under pressure.",
  },
]

export default function EventsRolodex() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateYActive = useTransform(mouseX, (v) => v * 0.3)
  const rotateXActive = useTransform(mouseY, (v) => -2 - v)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return
      e.preventDefault()

      scrollAccumulator.current += e.deltaY
      const THRESHOLD = 120
      const steps = Math.trunc(scrollAccumulator.current / THRESHOLD)

      if (steps === 0) return

      scrollAccumulator.current -= steps * THRESHOLD

      setActive((prev) => {
        const next = prev + steps
        return Math.max(0, Math.min(events.length - 1, next))
      })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 3)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 3)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-8 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* HORIZONTAL TIMELINE TOP NAV */}
      <div className="w-full max-w-5xl mb-8 overflow-x-auto no-scrollbar py-2 px-4 z-30">
        <div className="flex items-center justify-between min-w-max gap-6 mx-auto">
          {events.map((event, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={`${event.title}-${event.year}`}
                onClick={() => setActive(i)}
                whileHover={{ y: -3 }}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1.5 focus:outline-none"
              >
                <div
                  className={`text-center transition-colors duration-300 ${
                    isActive ? "text-pink-200" : "text-zinc-500"
                  }`}
                >
                  <div className="text-[12px] font-semibold uppercase tracking-wider">
                    {event.date}
                  </div>
                  <div className="text-[10px] opacity-75">{event.year}</div>
                </div>

                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 h-[3px] bg-pink-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "w-2 h-[2px] bg-zinc-700"
                  }`}
                />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* LANDSCAPE CARD STACK */}
      <div
        className="relative w-full max-w-screen h-[420px] sm:h-[450px]"
        style={{ perspective: "2500px" }}
      >
        {events.map((event, i) => {
          const offset = i - active
          const uniqueKey = `${event.title}-${event.year}`

          if (Math.abs(offset) > 3) return null

          return (
            <motion.div
              key={uniqueKey}
              animate={{
                x: offset * 45,
                scale: 1 - Math.abs(offset) * 0.06,
                rotateY: offset === 0 ? rotateYActive.get() : offset * 2,
                rotateX: offset === 0 ? rotateXActive.get() : -2,
                z: -Math.abs(offset) * 150,
                opacity: 1 - Math.abs(offset) * 0.25,
              }}
              transition={{
                x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.7 },
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden border border-pink-400/20 bg-zinc-950/90 backdrop-blur-md shadow-2xl"
              style={{
                zIndex: 100 - Math.abs(offset),
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 h-full p-6 md:p-8 gap-6 items-center">
                {/* Left Side: Image */}
                <div className="md:col-span-6 h-48 w-full md:h-full relative  rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Side: Details */}
                <div className="md:col-span-6 flex flex-col justify-between h-full py-2">
                  <div>
                    <h2 className="text-white font-sans text-2xl md:text-3xl font-bold leading-tight mt-1 mb-3">
                      {event.title}
                    </h2>

                    <p className="text-zinc-300 font-sans leading-relaxed text-sm md:text-base line-clamp-4">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cyan-400/20 flex items-center justify-between mt-auto">
                    <p className="text-pink-300 font-sans font-semibold text-sm md:text-base">
                      {event.date}, {event.year}
                    </p>
                    <span className="text-zinc-500 text-xs">Learn more</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}