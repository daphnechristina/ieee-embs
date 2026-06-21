"use client";

import {  motion } from "framer-motion";
import HeroSlideshow from "../ui/slideshow";

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
          <span className="text-[10px] md:text-xs font-mono text-blue-300 uppercase tracking-widest">
            VIT Vellore
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
            IEEE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r  from-cyan-600 to-pink-500 drop-shadow-[0_0_8px_rgba(180,50,200,0.5)]">EMBS</span>
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
          <HeroSlideshow/>
        </div>

      </motion.div>
    </section>
  );
}