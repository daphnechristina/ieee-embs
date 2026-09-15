"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const targetDate = new Date("2026-09-18T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-16 overflow-x-hidden bg-transparent font-sans">
      {/* Centered Wrapper Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-20">
        
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-4 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none font-sans">
            IEEE EMBS
          </h1>

          <h2 className="max-w-lg mx-auto md:mx-0 text-lg md:text-xl font-normal text-zinc-300 leading-relaxed font-sans">
            Where <span className="font-semibold text-white">engineering</span> meets{" "}
            <span className="font-semibold text-white">biology</span>.
            <br />
            Advancing technology for the benefit of global healthcare.
          </h2>
        </motion.div>

        {/* Right Countdown Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md font-sans shrink-0"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 sm:p-8 space-y-6 backdrop-blur-sm">
            {/* Header with Larger Logo */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border border-white/10 bg-zinc-900/60 p-2 flex items-center justify-center shrink-0">
                <img
                  src="/medopoly.png"
                  alt="Med-O-Poly Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium font-sans">
                  GRAVITAS &apos;26 • IEEE EMBS
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight font-sans leading-tight">
                  MED-O-POLY
                </h3>
              </div>
            </div>

            {/* Countdown Units */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-zinc-900/50 border border-white/5"
                >
                  <span className="text-2xl font-semibold text-white font-sans tracking-tight">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans tracking-wider mt-0.5 uppercase">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <a
              href="https://gravitas.vit.ac.in/events/b3738745-3184-40dd-8e91-a9d77049a94c"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 text-center text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded-xl transition-colors font-sans"
            >
              Register for Event
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}