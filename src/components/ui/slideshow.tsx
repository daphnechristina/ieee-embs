"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  { src: "/embs-1.jpeg", alt: "embs 2026" },
  { src: "/embs-25.png", alt: "embs 2026" },
  { src: "/embs-10.jpeg", alt: "embs 2024" },  
  { src: "/embs-8.jpeg", alt: "embs 2025" },
  { src: "/embs-16.jpeg", alt: "embs 2026" },
 
  { src: "/embs3.jpeg", alt: "embs 2026" },
  { src: "/embs-11.jpeg", alt: "embs 2025" },
  { src: "/embs-9.jpeg", alt: "embs 2024" },
  { src: "/embs4.jpeg", alt: "embs 2026" },
  { src: "/embs-5.jpeg", alt: "embs 2025" },
  { src: "/embs-17.jpeg", alt: "embs 2026" },
  { src: "/embs-7.jpeg", alt: "embs 2025" },
  { src: "/embs-19.jpeg", alt: "embs 2026" },
  { src: "/embs2.jpeg", alt: "embs 2026" },
  { src: "/embs-6.jpeg", alt: "embs 2025" },
  { src: "/embs-18.jpeg", alt: "embs 2026" },
  { src: "/embs-13.jpeg", alt: "embs 2025" },
  { src: "/embs-15.jpeg", alt: "embs 2026" },
  { src: "/embs-12.jpeg", alt: "embs 2025" },
]

// How long each slide stays visible, in milliseconds
const SLIDE_DURATION = 3000

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      // When we reach the last slide, wrap back to 0
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    // Cleanup: clear the interval when the component unmounts
    // so it doesn't keep running in the background
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex-1 flex justify-center items-center">
      {/* 
      */}
      <div className="relative w-full max-w-md aspect-video">
        <AnimatePresence mode="sync">
          <motion.img
            // Key is critical — when the key changes, AnimatePresence
            // treats it as a new element entering and the old one exiting.
            // Without a unique key, React reuses the same img element
            // and no animation happens at all.
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            // absolute so all slides occupy the same space and overlap
            className="absolute inset-0 w-full h-full border-amber-50 border-4 backdrop-blur-2xl rounded-2xl object-cover"
            // starting state when this slide enters
            initial={{ opacity: 0 }}
            // state while it's visible
            animate={{ opacity: 1 }}
            // state as it leaves (when the next slide takes over)
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
      </div>
    </div>
  )
}