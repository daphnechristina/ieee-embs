"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BoardMember {
  name: string;
  role: string;
  image: string;
  about: string;
  insta: string;
  linkedin: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Ishita Mohanta",
    role: "Chairperson",
    insta: "https://www.instagram.com/ish.i.i.i",
    image: "/ishita-mohanta-no-lettering.png",
    linkedin: "https://www.linkedin.com/in/ishita-mohanta-798350287/",
    about:
      "Smart, kind, and full of energy, Ishita is someone who lights up the room. Always open to conversations, she makes everyone feel welcome. Her dedication, hard work, and passion for EMBS shows in everything she does. She leads with both heart and purpose.",
  },
  {
    name: "Bhadra Sanjay Namboodiry",
    role: "Vice-Chairperson",
    image: "/bhadra-sanjay-namboodiry-no-lettering.png",
    insta: "https://www.instagram.com/bhadrasanjayn",
    linkedin: "https://www.linkedin.com/in/bhadra-sanjay-namboodiry-97aa7732b/",
    about:
      "With her clear and focused mind, she is ready to lead the chapter to even newer heights. While she posseses a calm demeanor, she is also quietly observant. When push comes to shove, she knows how to get everyone and everything back on track.",
  },
  {
    name: "Tanisha Choudhuri",
    role: "Secretary",
    image: "/tanisha-chaudhari-no-lettering.png",
    insta: "https://www.instagram.com/choudhuritanisha",
    linkedin: "https://www.linkedin.com/in/tanisha-choudhuri/",
    about:
      "A leader who takes charge of maintaining the chapter while bringing fun, energy, and personality along the way. Intelligent, graceful, with a pinch of sass, our Secretary is the perfect fit to lead, inspire, and evolve our chapter into something even greater.",
  },
  {
    name: "S Hashmitha",
    role: "Co-Secretary",
    image: "/hashmita-no-lettering.png",
    insta: "https://www.instagram.com/hashmitha112358",
    linkedin: "https://www.linkedin.com/in/hashmitha-sampathkumar/",
    about:
      "Our adorable/extremely kind/patient/always-there-for-everyone and amiable ball of sunshine! If you need a lending hand, she'll be the first one to help you. You can trust her to make sure things run smoothly no matter how hectic it could get.",
  },
  {
    name: "A Nethraa",
    role: "Finance Head",
    image: "/nethraa-no-lettering.png",
    insta: "https://www.instagram.com/nethraa1218",
    linkedin: "https://www.linkedin.com/in/nethraa-a-14b7aa320/",
    about:
      "Numbers and strategy, she runs the show,\nTraditional Tamil grace in the flow.\nFinance head with unmatched flair,\nFocused on accounts, phone? Barely there.",
  },
  {
    name: "P Daphne Christina Ruby",
    role: "Research Head",
    image: "/daphne-no-lettering.png",
    insta: "https://www.instagram.com/_._daphnee_._",
    linkedin: "https://www.linkedin.com/in/daphne-christina-ruby",
    about:
      "Collaborative, free spirited and full of quiet confidence. The driving force behind our technical prowess and expertise in biomedical science. She is dedicated to spearheading innovative projects and exploring new avenues.",
  },
  {
    name: "Prithiksa Suresh Kumar",
    role: "Design Head",
    image: "/pritiksha-no-lettering.png",
    insta: "https://www.instagram.com/prithiksa_2007",
    linkedin: "https://www.linkedin.com/in/prithiksa-suresh-kumar-56032628b/",
    about:
      "Fun at heart, sharp in vision. A beautiful blend of creativity with discipline. She might be easy to work with, however, she is uncompromising when it comes to quality. A mentor who pushes you to do better and design smarter.",
  },
  {
    name: "Haripriya Muni",
    role: "Public Relations Head",
    image: "/haripriya-no-lettering.png",
    insta: "https://www.instagram.com/haripriyyya_",
    linkedin: "https://www.linkedin.com/in/haripriyamuni/",
    about:
      "Jovial, fun-loving, always ready to strike up a conversation, she's a people magnet. When it comes to ideas, her brain runs like a full-speed fire engine, constantly beaming with creative sparks. She puts in her best effort to make sure our events reach everyone.",
  },
  {
    name: "Aryabrata Pattnaik",
    role: "Editorial Head",
    image: "/aryabrata-no-lettering.png",
    insta: "https://www.instagram.com/brata.boi",
    linkedin: "https://www.linkedin.com/in/aryabrata-pattnaik-0262a6240/",
    about:
      "A powerhouse of ideas, curiosity, and creative chaos. Always active and full of unexpected thoughts, he turns ideas into engaging blogs and articles, making him the most suitable person for this role.",
  },
  {
    name: "Pooja Priyadarshini",
    role: "HR Head",
    image: "/pooja-no-lettering.png",
    insta: "https://www.instagram.com/snowy.7433",
    linkedin: "https://www.linkedin.com/in/aryabrata-pattnaik-0262a6240/",
    about:
      "Soft-spoken, sharp-minded... and suddenly very loud about F1.\nSweet, smart, and a perfectionist at heart.\nBrains, beauty, and speed talk combined.",
  },
  {
    name: "Dr. Debashis Maji",
    role: "Faculty Coordinator",
    image: "/debashis-maji.png",
    insta: "",
    linkedin: "https://www.linkedin.com/in/debashismaji/",
    about:
      "Dedicated to fostering innovation and excellence in biomedical engineering. His expertise and leadership contribute significantly to our academic and research initiatives.",
  },
];

function LiquidMetalIDCard({
  name = "Name",
  role = "Role",
  image,
  about = "A dedicated member of the IEEE EMBS board.",
  insta,
  linkedin,
}: BoardMember) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const duration = 0.4;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      noiseBufferRef.current = buffer;
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const playFlipSound = useCallback(() => {
    const ctx = audioContextRef.current;
    const buffer = noiseBufferRef.current;
    if (!ctx || !buffer) return;
    if (ctx.state === "suspended") ctx.resume();

    const duration = 0.4;

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = 0.8;
    bandpass.frequency.setValueAtTime(200, ctx.currentTime);
    bandpass.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration * 0.3);
    bandpass.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(2000, ctx.currentTime);
    lowpass.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + duration * 0.4);
    lowpass.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + duration);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    whiteNoise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(ctx.currentTime);
    whiteNoise.stop(ctx.currentTime + duration);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    playFlipSound();
    setIsFlipped((current) => !current);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative" style={{ perspective: "1500px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          width: "min(440px, calc(100vw - 48px))",
          height: "272px",
        }}
        className="relative cursor-pointer"
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? [1, 1.03, 1] : 1,
          }}
          transition={{
            rotateY: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.7, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] },
          }}
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* FRONT */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
              background: "#07090e",
            }}
          >
            {/* Ambient Background Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(69, 190, 214, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(216, 88, 151, 0.12) 0%, transparent 40%)",
              }}
            />

            {/* FRONT CONTENT GRID */}
            <div className="relative z-10 h-full flex items-center">
              {/* Left rectangular image area */}
              <div className="relative w-[200px] h-full overflow-hidden border-r border-white/10 bg-zinc-900 shrink-0">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xl">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Right text area */}
              <div className="flex-1 h-full p-6 flex flex-col justify-between min-w-0">
                <div className="space-y-1 mt-2">
                  <h2
                    className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-white leading-snug break-words"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                  >
                    {name}
                  </h2>
                  <p className="text-xs font-sans font-medium tracking-wider uppercase text-purple-300/90">
                    {role}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase">
                    Click to Flip
                  </span>
                  <div className="flex items-center gap-3">
                    {insta && (
                      <img
                        src="/insta-transparent.webp"
                        alt="Instagram"
                        className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(insta, "_blank");
                        }}
                      />
                    )}
                    {linkedin && (
                      <img
                        src="/linkedin-transparent.webp"
                        alt="LinkedIn"
                        className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(linkedin, "_blank");
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BACK */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-pink-500/20"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#08070c",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 80%, rgba(216, 88, 151, 0.15) 0%, transparent 50%)",
              }}
            />

            <div className="relative h-full p-6 flex flex-col justify-between z-10">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-[10px] font-sans tracking-widest text-pink-400 uppercase">
                    IEEE EMBS BOARD
                  </span>
                  <span className="text-[10px] font-sans text-zinc-500">2025-26</span>
                </div>

                <h3 className="text-lg font-semibold text-white leading-tight">{name}</h3>
                <p className="text-xs font-sans text-neutral-400 uppercase mt-0.5 mb-3">{role}</p>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed max-h-[110px] overflow-y-auto pr-2">
                  {about}
                </p>
              </div>

              <div className="text-center pt-2 border-t border-white/5">
                <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-widest">
                  Click to flip back
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function BoardGrid() {
  return (
    <section className="relative bg-transparent py-16 px-8">
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 42% 36%, rgba(69, 190, 220, 0.12) 0%, transparent 48%), radial-gradient(ellipse at 68% 72%, rgba(216, 88, 151, 0.12) 0%, transparent 52%)",
        }}
      />

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-bold tracking-relaxed font-sans text-white mb-2">BOARD</h1>
        <p className="text-xs font-sans tracking-[0.3em] text-pink-300 uppercase">2025-26</p>
      </div>

      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto justify-items-center"
        style={{
          maxWidth: "960px",
        }}
      >
        {boardMembers.map((member) => {
          const isFaculty = member.role === "Faculty Coordinator";

          return (
            <div
              key={member.name}
              className={isFaculty ? "sm:col-span-2 sm:justify-self-center" : ""}
            >
              <LiquidMetalIDCard
                name={member.name}
                role={member.role}
                image={member.image}
                about={member.about}
                insta={member.insta}
                linkedin={member.linkedin}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}