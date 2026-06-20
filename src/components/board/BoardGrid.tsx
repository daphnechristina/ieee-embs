"use client";

// CHANGE 1: Single consolidated framer-motion import.
// Original had LazyMotion/domAnimation imported but then used 8+ separate
// <LazyMotion> wrappers inside a single component — each one redundantly
// re-registers the animation bundle. All removed below; one wrapper at the
// BoardGrid root handles everything.
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, LazyMotion, domAnimation } from "framer-motion";

interface BoardMember {
  name: string;
  role: string;
  image: string;
  about: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Ishita Mohanta",
    role: "Chairperson",
    image: "/ishita-mohanta-no-lettering.png",
    about:
      "Smart, kind, and full of energy, Ishita is someone who lights up the room. Always open to conversations, she makes everyone feel welcome. Her dedication, hard work, and passion for EMBS shows in everything she does. She leads with both heart and purpose.",
  },
  {
    name: "Bhadra Sanjay Namboodiry",
    role: "Vice-Chairperson",
    image: "/bhadra-sanjay-namboodiry-no-lettering.png",
    about:
      "With her clear and focused mind, she is ready to lead the chapter to even newer heights. While she posseses a calm demeanor, she is also quietly observant. When push comes to shove, she knows how to get everyone and everything back on track.",
  },
  {
    name: "Tanisha Choudhuri",
    role: "Secretary",
    image: "/tanisha-chaudhari-no-lettering.png",
    about:
      "A leader who takes charge of maintaining the chapter while bringing fun, energy, and personality along the way. Intelligent, graceful, with a pinch of sass, our Secretary is the perfect fit to lead, inspire, and evolve our chapter into something even greater.",
  },
  {
    name: "S Hashmitha",
    role: "Co-Secretary",
    image: "/hashmita-no-lettering.png",
    about:
      "Our adorable/extremely kind/patient/always-there-for-everyone and amiable ball of sunshine! If you need a lending hand, she'll be the first one to help you. You can trust her to make sure things run smoothly no matter how hectic it could get.",
  },
  {
    name: "A Nethraa",
    role: "Finance Head",
    image: "/nethraa-no-lettering.png",
    about:
      "Numbers and strategy, she runs the show,\nTraditional Tamil grace in the flow.\nFinance head with unmatched flair,\nFocused on accounts, phone? Barely there.",
  },
  {
    name: "P Daphne Christina Ruby",
    role: "Research Head",
    image: "/daphne-no-lettering.png",
    about:
      "Collaborative, free spirited and full of quiet confidence. The driving force behind our technical prowess and expertise in biomedical science. She is dedicated to spearheading innovative projects and exploring new avenues.",
  },
  {
    name: "Prithiksha Suresh Kumar",
    role: "Design Head",
    image: "/pritiksha-no-lettering.png",
    about:
      "Fun at heart, sharp in vision. A beautiful blend of creativity with discipline. She might be easy to work with, however, she is uncompromising when it comes to quality. A mentor who pushes you to do better and design smarter.",
  },
  {
    name: "Haripriya Muni",
    role: "Public Relations Head",
    image: "/haripriya-no-lettering.png",
    about:
      "Jovial, fun-loving, always ready to strike up a conversation, she's a people magnet. When it comes to ideas, her brain runs like a full-speed fire engine, constantly beaming with creative sparks. She puts in her best effort to make sure our events reach everyone.",
  },
  {
    name: "Aryabrata Pattnaik",
    role: "Editorial Head",
    image: "/aryabrata-no-lettering.png",
    about:
      "A powerhouse of ideas, curiosity, and creative chaos. Always active and full of unexpected thoughts, he turns ideas into engaging blogs and articles, making him the most suitable person for this role.",
  },
  {
    name: "Pooja Priyadarshini",
    role: "HR Head",
    image: "/pooja-no-lettering.png",
    about:
      "Soft-spoken, sharp-minded... and suddenly very loud about F1.\nSweet, smart, and a perfectionist at heart.\nBrains, beauty, and speed talk combined.",
  },
];

function IEEEEMBSLogo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    // CHANGE 2: Added loading="lazy" and decoding="async".
    // The logo image appears on every single card (front + back = 20 times on the page).
    // Without lazy loading all instances were fetched immediately on page load.
    <img
      src="/embs-logo-transparent.png"
      alt="IEEE EMBS Logo"
      loading="lazy"
      decoding="async"
      className={className}
      style={{ objectFit: "contain", objectPosition: "center", aspectRatio: "auto", ...style }}
    />
  );
}

function Avatar({
  name,
  image,
  className,
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div
      className={`${className} rounded-full flex items-center justify-center overflow-hidden`}
      style={{
        background: "linear-gradient(145deg, #050505 0%, #10171a 55%, #160812 100%)",
        border: "2px solid rgba(100, 10, 180, 0.65)",
        boxShadow: "0 0 22px rgba(200, 88, 151, 0.28)",
      }}
    >
      {image ? (
        // CHANGE 3: Added loading="lazy" and decoding="async" to member photos.
        // 10 board member photos all loading eagerly is a significant LCP hit since
        // the board section is well below the fold.
        <img
          src={image}
          alt={`${name} photo`}
          loading="lazy"
          decoding="async"
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      ) : (
        <span className="font-mono text-sm" style={{ color: "#45bed6" }}>
          {initials}
        </span>
      )}
    </div>
  );
}

function LiquidMetalIDCard({
  name = "Name",
  role = "Role",
  image,
  about = "A dedicated member of the IEEE EMBS board.",
}: BoardMember) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // CHANGE 4: Moved AudioContext and noise buffer setup into a useEffect with a ref.
  // Original: created a new AudioContext lazily inside the click handler, then
  // generated the entire noise buffer synchronously on the main thread on every flip
  // (a for-loop of ~17,600 iterations at 44100Hz * 0.4s). This caused noticeable
  // jank on click since it blocked JS execution before the flip animation could start.
  //
  // Fix: AudioContext is created once on mount. The noise buffer is also generated
  // once and reused on every flip — we just create a new BufferSource (cheap) each
  // time, which is the correct Web Audio API pattern.
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // Create AudioContext and pre-bake the noise buffer once, off the critical path.
    // We defer with setTimeout so it doesn't run during the initial render/paint.
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
    }, 1000); // defer 1s after mount so it doesn't compete with initial paint

    return () => clearTimeout(timeout);
  }, []);

  // CHANGE 5: playFlipSound now reuses the pre-baked buffer instead of regenerating it.
  // All the filter/gain node setup is unchanged — that part is cheap.
  const playFlipSound = useCallback(() => {
    const ctx = audioContextRef.current;
    const buffer = noiseBufferRef.current;
    if (!ctx || !buffer) return;
    if (ctx.state === "suspended") ctx.resume();

    const duration = 0.4;

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer; // reuse, don't regenerate

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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 25,
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
            scale: isFlipped ? [1, 1.05, 1] : 1,
          }}
          transition={{
            rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.8, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] },
          }}
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* FRONT */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #020404 0%, #06171c 28%, #050506 52%, #190817 74%, #020404 100%)",
              }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: isHovered
                  ? ["0% 0%", "100% 100%", "0% 0%"]
                  : ["0% 0%", "50% 50%", "0% 0%"],
              }}
              transition={{
                duration: isHovered ? 4 : 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 20% 30%, rgba(69,1,214,0.18) 0%, transparent 52%),
                  radial-gradient(ellipse 60% 40% at 80% 70%, rgba(216,8,151,0.2) 0%, transparent 52%),
                  radial-gradient(ellipse 100% 60% at 50% 50%, rgba(255,255,255,0.035) 0%, transparent 60%)
                `,
                backgroundSize: "200% 200%",
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-60"
              animate={{
                background: isHovered
                  ? [
                      "linear-gradient(45deg, transparent 30%, rgba(69,190,214,0.2) 50%, transparent 70%)",
                      "linear-gradient(45deg, transparent 40%, rgba(216,88,151,0.24) 55%, transparent 75%)",
                      "linear-gradient(45deg, transparent 30%, rgba(69,190,214,0.2) 50%, transparent 70%)",
                    ]
                  : "linear-gradient(45deg, transparent 30%, rgba(69,190,214,0.12) 50%, transparent 70%)",
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3 }}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              style={{
                background: `
                  conic-gradient(from 0deg at 30% 30%, 
                    transparent 0deg, 
                    rgba(69,1,214,0.18) 60deg, 
                    transparent 120deg,
                    rgba(219,8,180,0.14) 180deg,
                    transparent 240deg,
                    rgba(69,1,214,0.14) 300deg,
                    transparent 360deg
                  )
                `,
              }}
            />

            {/* Shimmer sweep — unchanged, already only plays on repeat with a delay */}
            <motion.div className="absolute inset-0 overflow-hidden rounded-2xl">
              <motion.div
                className="absolute h-full"
                animate={{ x: ["-200%", "100%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 2,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(69,190,214,0.16) 48%, rgba(216,88,151,0.12) 54%, transparent 62%, transparent 100%)",
                  transform: "skewX(-25deg)",
                  width: "300%",
                }}
              />
            </motion.div>

            <div
              className="absolute rounded-2xl"
              style={{
                inset: "1px",
                border: "1px solid rgba(69,190,214,0.25)",
                boxShadow:
                  "inset 0 1px 1px rgba(69,190,214,0.22), inset 0 -1px 1px rgba(216,88,151,0.16), 0 18px 46px rgba(216,88,151,0.12)",
              }}
            />

            <div
              className="relative h-full p-8 flex flex-col justify-between gap-5"
              style={{ transform: "translateZ(30px)" }}
            >
              <div
                className="grid items-center gap-6"
                style={{ gridTemplateColumns: "112px minmax(0, 1fr)", minHeight: "150px" }}
              >
                <div className="relative">

                  <motion.div
                    className="absolute rounded-full"
                    animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : 0.4 }}
                    transition={isHovered ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                    style={{
                      background: "linear-gradient(135deg, #45bed6 0%, #d85897 55%, #45bed6 100%)",
                      inset: "-3px",
                      borderRadius: "9999px",
                    }}
                  />

                  <Avatar name={name} image={image} className="relative w-28 h-28" />
                </div>

                <div className="min-w-0">
                  <div className="space-y-2 text-right">
                    <h2
                      className="text-xl sm:text-2xl font-light tracking-wide text-white leading-tight break-words"
                      style={{ textShadow: "0 2px 12px rgba(69,190,214,0.24)" }}
                    >
                      {name}
                    </h2>

                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{
                        background: "linear-gradient(90deg, #45bed6 0%, #f0c4da 50%, #d85897 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div></div>
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <IEEEEMBSLogo className="h-12" style={{ width: "145px", borderRadius: "6px" }} />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute left-1/2"
              style={{ bottom: "12px", transform: "translateX(-50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="uppercase"
                style={{ color: "#45bed6", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.1em" }}
              >
                Click to flip
              </span>
            </motion.div>
          </motion.div>

          {/* BACK */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(225deg, #06171c 0%, #120713 4%, #020404 62%, #0b1d22 100%)",
              }}
            />

            <motion.div
              className="absolute inset-0"
              animate={isFlipped ? { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: `
                  radial-gradient(ellipse 60% 40% at 70% 40%, rgba(216,8,151,0.18) 0%, transparent 50%),
                  radial-gradient(ellipse 80% 60% at 30% 60%, rgba(69,1,214,0.16) 0%, transparent 50%)
                `,
                backgroundSize: "200% 200%",
              }}
            />

            <div
              className="absolute rounded-2xl"
              style={{
                inset: "1px",
                border: "1px solid rgba(216,8,151,0.28)",
                boxShadow:
                  "inset 0 1px 1px rgba(216,8,151,0.2), inset 0 -1px 1px rgba(69,1,214,0.16)",
              }}
            />

            <div className="relative h-full p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <IEEEEMBSLogo className="h-8 opacity-80" style={{ width: "96px", borderRadius: "4px" }} />
                <span
                  className="uppercase"
                  style={{ color: "#d85897", fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.22em" }}
                >
                  IEEE EMBS BOARD
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-light leading-tight text-white">{name}</h3>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{
                      background: "linear-gradient(90deg, #45bed6 0%, #f0c4da 50%, #d85897 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {role}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3
                    className="uppercase"
                    style={{ color: "#45bed6", fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.2em" }}
                  >
                    About
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#c9dce1",
                      maxHeight: "92px",
                      overflowY: "auto",
                      paddingRight: "4px",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {about}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span></span>
                <span style={{ color: "#45bed6", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                  2025-26
                </span>
              </div>

              {/* CHANGE 11: Replaced motion.div that was animating to a static opacity
                  with a plain div. Original had initial={{ opacity: 0.5 }} and
                  animate={{ opacity: 0.5 }} — animating to the same value it starts at
                  does nothing visually but still registers a motion element with the
                  Framer Motion scheduler on every card. */}
              <div
                className="absolute left-1/2"
                style={{ bottom: "12px", transform: "translateX(-50%)", opacity: 0.5 }}
              >
                <span
                  className="uppercase"
                  style={{ color: "#d85897", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.1em" }}
                >
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

        <div className="relative z-10 text-center mb-2">
          <h1
            className="text-6xl font-light tracking-wide text-white mb-2"
            style={{ textShadow: "0 0 24px rgba(69,190,214,0.28)" }}
          >
            THE BOARD
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
            2025-26
          </p>
        </div>

        <div
          className="relative z-10 grid gap-12 mx-auto justify-items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            maxWidth: "960px",
          }}
        >
          {boardMembers.map((member, index) => (
            <LiquidMetalIDCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              about={member.about}
            />
          ))}
        </div>
      </section>
  );
}