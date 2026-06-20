// src/components/ui/IntroAnimation.tsx
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >

            <svg viewBox="0 0 185 80" className="w-64">
              <path
                d="M 0 40 
         C 10 40, 15 35, 20 40 
         L 25 40 
         L 27 42 L 30 10 L 33 60 L 35 40 
         L 40 40 
         C 45 40, 50 30, 55 40   
         L 60 40 C 70 40, 75 35, 80 40 L 85 40 L 87 42 L 90 10 L 93 60 L 95 40 L 100 40 C 105 40, 110 30, 115 40 L 120 40 
         L 125 40 C 135 40, 140 35, 145 40 L 150 40 L 152 42 L 155 10 L 158 60 L 160 40 L 165 40 C 170 40, 175 30, 180 40 
         L 185 40" 
                fill="none"
                stroke="url(#intro-gradient)"
                strokeWidth="2.5"
                strokeDasharray="600"
                strokeDashoffset="600"
                style={{ animation: "draw 3s ease forwards 0.5s" }}
              />
              <defs>
                <linearGradient id="intro-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Text fades in after the line draws */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="text-white font-mono text-sm tracking-widest"
            >
              Welcome to IEEE EMBS
            </motion.p>
          </motion.div>

          <style>{`
            @keyframes draw { to { stroke-dashoffset: 0; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}