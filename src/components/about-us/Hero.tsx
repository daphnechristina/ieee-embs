"use client";

import { motion } from "framer-motion";
import { LucideRepeat, Repeat, Repeat1 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 overflow-hidden bg-transparent">

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 z-20 space-y-8"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
          <span className="text-[10px] md:text-xs font-mono text-cyan-300 uppercase tracking-widest">
            VIT Vellore
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
            IEEE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r  from-cyan-500 to-pink-500 drop-shadow-[0_0_8px_rgba(180,50,200,0.5)]">EMBS</span>
          </h1>
        </div>

        <p className="max-w-md text-lg md:text-xl font-sans text-gray-300 leading-relaxed pl-6">
          Where <span className="text-white font-bold">engineering</span> meets <span className="text-white font-bold">biology</span>. 
          <br />Advancing technology for the benefit of global healthcare.
        </p>


      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 relative md:mt-0 flex justify-center items-center"
      >

        <div className="flex-1 flex justify-center items-center">
          <svg viewBox="0 0 185 80" className="w-96">
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
              stroke="url(#ecg-gradient)"
              strokeWidth="2"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animation: "draw 3s ease forwards" }}
            />
            <defs>
              <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <style>{`
            @keyframes draw {
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>

      </motion.div>
    </section>
  );
}