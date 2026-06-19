"use client";

import { useEffect, useRef, useState } from "react";

const CONFIG = {
  totalDuration: 60,
  baseBPM: 50,
  maxBPM: 185,
  baseScrollSpeed: 240,
  targetZoneRatioX: 0.82,
  perfectWindowInit: 0.055,
  perfectWindowFinal: 0.035,
  goodWindowInit: 0.130,
  goodWindowFinal: 0.070,
  stabilityGainPerfect: 12,
  stabilityGainGood: 5,
  stabilityLossMiss: 16,
};

export default function EcgPeakGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const bpmRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number>(0);

  const gs = useRef({
    active: false,
    phase: "start",
    timeRemaining: CONFIG.totalDuration,
    bpm: CONFIG.baseBPM,
    stability: 50,
    combo: 0,
    maxCombo: 0,
    sessionBestStreak: 0,
    totalBeatsScheduled: 0,
    successfulHits: 0,
    totalInputs: 0,
    beats: [] as Beat[],
    lastScheduledTime: 0,
    gameTime: 0,
    systemClockPrev: 0,
    flashTimer: 0,
    flashColor: "",
  });

  const [showStart, setShowStart] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [goStats, setGoStats] = useState({ time: "0s", acc: "0%", streak: "0", best: "0" });
  const [winStats, setWinStats] = useState({ acc: "0%", streak: "0", bpm: "0 BPM", best: "0" });

  interface Beat {
    id: number;
    targetTime: number;
    status: "pending" | "perfect" | "good" | "miss";
    cleared: boolean;
  }

  function initAudio() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  function playSound(type: string) {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === "perfect") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      gainNode.gain.setValueAtTime(0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === "good") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(900 + gs.current.bpm * 0.8, now);
      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === "miss") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(130, now);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === "flatline") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 1.5);
      gainNode.gain.linearRampToValueAtTime(0.0, now + 2.0);
      osc.start(now);
      osc.stop(now + 2.0);
    }
  }

  function getActiveWindows() {
    const prog = gs.current.gameTime / CONFIG.totalDuration;
    return {
      perfect: CONFIG.perfectWindowInit - (CONFIG.perfectWindowInit - CONFIG.perfectWindowFinal) * prog,
      good: CONFIG.goodWindowInit - (CONFIG.goodWindowInit - CONFIG.goodWindowFinal) * prog,
    };
  }

  function applyStabilityShift(amount: number) {
    gs.current.stability += amount;
    if (gs.current.stability > 100) gs.current.stability = 100;
    if (gs.current.stability <= 0) {
      gs.current.stability = 0;
      triggerGameOver();
    }
  }

  function scheduleBeats() {
    while (gs.current.lastScheduledTime < gs.current.gameTime + 2.5) {
      let currentInterval = 60 / gs.current.bpm;
      if (gs.current.gameTime > 30) {
        const randomTrigger = Math.random();
        if (randomTrigger < 0.12) {
          currentInterval *= 0.58;
        } else if (randomTrigger > 0.88) {
          currentInterval *= 1.45;
        }
      }
      const nextTargetTime = gs.current.lastScheduledTime + currentInterval;
      gs.current.totalBeatsScheduled++;
      gs.current.beats.push({
        id: gs.current.totalBeatsScheduled,
        targetTime: nextTargetTime,
        status: "pending",
        cleared: false,
      });
      gs.current.lastScheduledTime = nextTargetTime;
    }
  }

  function processMissedBeats() {
    const currentGoodWindow = getActiveWindows().good;
    for (let i = 0; i < gs.current.beats.length; i++) {
      const beat = gs.current.beats[i];
      if (beat.status === "pending" && gs.current.gameTime - beat.targetTime > currentGoodWindow) {
        beat.status = "miss";
        applyStabilityShift(-CONFIG.stabilityLossMiss);
        gs.current.combo = 0;
        triggerFlash("miss");
        playSound("miss");
      }
    }
    gs.current.beats = gs.current.beats.filter((b) => gs.current.gameTime - b.targetTime < 2.0);
  }

  function triggerFlash(type: string) {
    gs.current.flashTimer = 0.15;
    gs.current.flashColor = type;
    if (!feedbackRef.current) return;
    if (type === "perfect") {
      feedbackRef.current.innerText = "PERFECT";
      feedbackRef.current.style.color = "var(--monitor-green)";
    } else if (type === "good") {
      feedbackRef.current.innerText = "GOOD";
      feedbackRef.current.style.color = "var(--monitor-amber)";
    } else {
      feedbackRef.current.innerText = "MISS";
      feedbackRef.current.style.color = "var(--monitor-red)";
    }
    feedbackRef.current.style.opacity = "1";
  }

  function updateDynamicTheme() {
    const container = containerRef.current;
    if (!container) return;
    let themeColor = "var(--monitor-green)";
    let glowColor = "rgba(0, 255, 102, 0.25)";
    if (gs.current.bpm >= 140) {
      themeColor = "var(--monitor-red)";
      glowColor = "rgba(255, 51, 51, 0.25)";
    } else if (gs.current.bpm >= 95) {
      themeColor = "var(--monitor-amber)";
      glowColor = "rgba(255, 170, 0, 0.25)";
    }
    container.style.setProperty("--theme-color", themeColor);
    container.style.setProperty("--theme-glow", glowColor);

    if (gs.current.flashTimer > 0) {
      gs.current.flashTimer -= 0.016;
      if (gs.current.flashTimer <= 0 && feedbackRef.current) {
        feedbackRef.current.style.opacity = "0";
      }
    }
  }

  function getECGMorphologyValue(dt: number) {
    let voltage = 0;
    voltage += -10 * Math.exp(-Math.pow((dt + 0.13) / 0.026, 2));
    voltage += 12 * Math.exp(-Math.pow((dt + 0.025) / 0.009, 2));
    voltage += -105 * Math.exp(-Math.pow(dt / 0.010, 2));
    voltage += 28 * Math.exp(-Math.pow((dt - 0.024) / 0.014, 2));
    voltage += -18 * Math.exp(-Math.pow((dt - 0.16) / 0.048, 2));
    return voltage;
  }

  function renderCanvas() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const container = containerRef.current;
    if (!canvas || !ctx || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const gridSpacing = 25;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const targetX = w * CONFIG.targetZoneRatioX;
    const currentWindows = getActiveWindows();
    const currentGoodWidthPx = currentWindows.good * CONFIG.baseScrollSpeed * 2;

    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    if (gs.current.flashTimer > 0) {
      if (gs.current.flashColor === "perfect") ctx.fillStyle = "rgba(0, 255, 102, 0.12)";
      else if (gs.current.flashColor === "good") ctx.fillStyle = "rgba(255, 170, 0, 0.12)";
      else ctx.fillStyle = "rgba(255, 51, 51, 0.12)";
    }
    ctx.fillRect(targetX - currentGoodWidthPx / 2, 0, currentGoodWidthPx, h);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(targetX, 0);
    ctx.lineTo(targetX, h);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(container).getPropertyValue("--theme-color").trim();
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = gs.current.bpm > 130 ? 14 : 8;
    ctx.shadowColor = ctx.strokeStyle;

    const centerY = h * 0.53;
    let shiftPulse = 0;
    if (gs.current.bpm > 140) {
      shiftPulse = Math.sin(gs.current.gameTime * 45) * ((gs.current.bpm - 140) * 0.08);
    }

    for (let x = 0; x < w; x++) {
      const timeDeltaFromTarget = (x - targetX) / CONFIG.baseScrollSpeed;
      const evaluationTime = gs.current.gameTime + timeDeltaFromTarget;
      let compoundVoltageOffset = 0;
      for (let i = 0; i < gs.current.beats.length; i++) {
        const beat = gs.current.beats[i];
        const dt = evaluationTime - beat.targetTime;
        if (Math.abs(dt) < 0.6) {
          compoundVoltageOffset += getECGMorphologyValue(dt);
        }
      }
      const finalY = centerY + compoundVoltageOffset + shiftPulse;
      if (x === 0) ctx.moveTo(x, finalY);
      else ctx.lineTo(x, finalY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function updateUIDom() {
    if (timerRef.current) timerRef.current.innerText = gs.current.timeRemaining.toFixed(1) + "s";
    if (bpmRef.current) bpmRef.current.innerText = Math.round(gs.current.bpm) + " BPM";
    if (fillRef.current) fillRef.current.style.height = gs.current.stability + "%";
    if (comboRef.current) comboRef.current.innerText = String(gs.current.combo);

    const statusEl = statusRef.current;
    if (statusEl) {
      if (gs.current.stability >= 75) {
        statusEl.innerText = "STABLE";
        statusEl.style.color = "var(--monitor-green)";
      } else if (gs.current.stability >= 35) {
        statusEl.innerText = "ARRHYTHMIA";
        statusEl.style.color = "var(--monitor-amber)";
      } else {
        statusEl.innerText = "CRITICAL";
        statusEl.style.color = "var(--monitor-red)";
      }
    }
  }

  function triggerInput() {
    if (!gs.current.active || gs.current.phase !== "playing") return;

    gs.current.totalInputs++;
    const windows = getActiveWindows();
    let targetBeat: Beat | null = null;
    let smallestDiff = Infinity;

    for (let i = 0; i < gs.current.beats.length; i++) {
      const beat = gs.current.beats[i];
      if (beat.status === "pending") {
        const diff = Math.abs(gs.current.gameTime - beat.targetTime);
        if (diff < smallestDiff) {
          smallestDiff = diff;
          targetBeat = beat;
        }
      }
    }

    if (targetBeat && smallestDiff <= windows.good) {
      gs.current.successfulHits++;
      if (smallestDiff <= windows.perfect) {
        targetBeat.status = "perfect";
        gs.current.combo++;
        if (gs.current.combo > gs.current.maxCombo) gs.current.maxCombo = gs.current.combo;
        if (gs.current.combo > gs.current.sessionBestStreak) gs.current.sessionBestStreak = gs.current.combo;
        applyStabilityShift(CONFIG.stabilityGainPerfect);
        triggerFlash("perfect");
        playSound("perfect");
      } else {
        targetBeat.status = "good";
        applyStabilityShift(CONFIG.stabilityGainGood);
        triggerFlash("good");
        playSound("good");
      }
    } else {
      applyStabilityShift(-CONFIG.stabilityLossMiss);
      gs.current.combo = 0;
      triggerFlash("miss");
      playSound("miss");
    }
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }
  }

  function triggerGameOver() {
    gs.current.active = false;
    gs.current.phase = "gameover";
    playSound("flatline");
    const monitor = containerRef.current?.querySelector(".monitor-frame");
    if (monitor) monitor.classList.add("game-over-desat");

    const accuracy =
      gs.current.totalInputs > 0
        ? Math.round((gs.current.successfulHits / gs.current.totalInputs) * 100)
        : 0;

    setGoStats({
      time: Math.round(gs.current.gameTime) + "s",
      acc: accuracy + "%",
      streak: String(gs.current.maxCombo),
      best: String(gs.current.sessionBestStreak),
    });
    setShowWin(false);
    setShowStart(false);
    setTimeout(() => setShowGameOver(true), 1200);
  }

  function triggerWin() {
    gs.current.active = false;
    gs.current.phase = "win";
    const accuracy =
      gs.current.totalInputs > 0
        ? Math.round((gs.current.successfulHits / gs.current.totalInputs) * 100)
        : 100;

    setWinStats({
      acc: accuracy + "%",
      streak: String(gs.current.maxCombo),
      bpm: Math.round(gs.current.bpm) + " BPM",
      best: String(gs.current.sessionBestStreak),
    });
    setShowStart(false);
    setShowGameOver(false);
    setShowWin(true);
  }

  function startGame() {
    initAudio();

    gs.current.active = true;
    gs.current.phase = "playing";
    gs.current.timeRemaining = CONFIG.totalDuration;
    gs.current.bpm = CONFIG.baseBPM;
    gs.current.stability = 50;
    gs.current.combo = 0;
    gs.current.maxCombo = 0;
    gs.current.totalBeatsScheduled = 0;
    gs.current.successfulHits = 0;
    gs.current.totalInputs = 0;
    gs.current.beats = [];
    gs.current.gameTime = 0;
    gs.current.systemClockPrev = performance.now();
    gs.current.flashTimer = 0;
    gs.current.flashColor = "";

    const monitor = containerRef.current?.querySelector(".monitor-frame");
    if (monitor) monitor.classList.remove("game-over-desat");

    setShowStart(false);
    setShowGameOver(false);
    setShowWin(false);

    gs.current.lastScheduledTime = 0.5;
    scheduleBeats();
    updateUIDom();
    animFrameRef.current = requestAnimationFrame(runEngineLoop);
  }

  function runEngineLoop(timestamp: number) {
    if (!gs.current.active || gs.current.phase !== "playing") return;

    let dt = (timestamp - gs.current.systemClockPrev) / 1000;
    if (dt > 0.1) dt = 0.1;
    gs.current.systemClockPrev = timestamp;

    gs.current.gameTime += dt;
    gs.current.timeRemaining -= dt;

    if (gs.current.timeRemaining <= 0) {
      gs.current.timeRemaining = 0;
      triggerWin();
      return;
    }

    const linearProgression = gs.current.gameTime / CONFIG.totalDuration;
    gs.current.bpm = CONFIG.baseBPM + (CONFIG.maxBPM - CONFIG.baseBPM) * linearProgression;

    scheduleBeats();
    processMissedBeats();
    updateDynamicTheme();
    renderCanvas();
    updateUIDom();

    animFrameRef.current = requestAnimationFrame(runEngineLoop);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctxRef.current = ctx;
    }
    resizeCanvas();

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        triggerInput();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleInput = (e: Event) => {
      e.preventDefault();
      triggerInput();
    };
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener("mousedown", handleInput);
      canvasEl.addEventListener("touchstart", handleInput, { passive: false });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (canvasEl) {
        canvasEl.removeEventListener("mousedown", handleInput);
        canvasEl.removeEventListener("touchstart", handleInput);
      }
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="ecg-game" ref={containerRef}>
      <style>{`
        .ecg-game {
          --monitor-green: #00ff66;
          --monitor-amber: #ffaa00;
          --monitor-red: #ff3333;
          --theme-color: var(--monitor-green);
          --theme-glow: rgba(0, 255, 102, 0.25);
          box-sizing: border-box;
          user-select: none;
          -webkit-user-select: none;
          font-family: 'Courier New', Courier, monospace;
          color: #f8fafc;
          display: flex;
          justify-content: center;
        }
        .ecg-game * {
          box-sizing: border-box;
          user-select: none;
          -webkit-user-select: none;
          margin: 0;
          padding: 0;
        }
        .ecg-game .monitor-frame {
          position: relative;
          width: 100%;
          max-width: 1024px;
          height: 520px;
          background: #040d1a;
          border: 4px solid #1e293b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
        }
        .ecg-game .monitor-frame::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 10;
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
        }
        .ecg-game .screen {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(4, 13, 26, 0.95);
          z-index: 5;
          padding: 2rem;
          text-align: center;
          transition: opacity 0.2s ease;
        }
        .ecg-game .screen.hidden {
          opacity: 0;
          pointer-events: none;
        }
        .ecg-game h1 {
          font-size: 3rem;
          color: var(--theme-color);
          text-shadow: 0 0 10px var(--theme-glow);
          margin-bottom: 1rem;
          letter-spacing: 4px;
        }
        .ecg-game p {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 500px;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .ecg-game .btn {
          background: transparent;
          border: 2px solid var(--theme-color);
          color: var(--theme-color);
          padding: 0.75rem 2rem;
          font-size: 1.2rem;
          font-family: inherit;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
          text-transform: uppercase;
          box-shadow: 0 0 10px var(--theme-glow);
          transition: all 0.2s ease;
        }
        .ecg-game .btn:hover, .ecg-game .btn:focus {
          background: var(--theme-color);
          color: #040d1a;
          box-shadow: 0 0 20px var(--theme-color);
        }
        .ecg-game #game-interface {
          flex: 1;
          display: flex;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .ecg-game #hud-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50px;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(2, 6, 23, 0.4);
          z-index: 2;
        }
        .ecg-game .hud-element {
          display: flex;
          flex-direction: column;
        }
        .ecg-game .hud-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .ecg-game .hud-value {
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--theme-color);
          text-shadow: 0 0 8px var(--theme-glow);
        }
        .ecg-game #canvas-container {
          flex: 1;
          position: relative;
          background: #020612;
        }
        .ecg-game canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
        .ecg-game #stability-container {
          width: 60px;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(2, 6, 23, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 0 16px 0;
          position: relative;
          z-index: 2;
        }
        .ecg-game #stability-track {
          flex: 1;
          width: 14px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .ecg-game #stability-fill {
          width: 100%;
          height: 50%;
          background: linear-gradient(to top, var(--monitor-red), var(--monitor-amber), var(--monitor-green));
          background-size: 100% 400px;
          background-position: bottom;
          transition: height 0.1s linear, background 0.2s ease;
          box-shadow: 0 0 10px var(--theme-color);
        }
        .ecg-game .stability-label {
          font-size: 0.6rem;
          color: #64748b;
          writing-mode: vertical-rl;
          text-transform: uppercase;
          margin-top: 8px;
          letter-spacing: 2px;
        }
        .ecg-game #feedback-overlay {
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          font-weight: bold;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          letter-spacing: 2px;
        }
        .ecg-game #combo-badge {
          position: absolute;
          left: 30px;
          bottom: 24px;
          font-size: 1rem;
          color: #64748b;
          z-index: 3;
          font-weight: bold;
        }
        .ecg-game #combo-count {
          color: var(--theme-color);
          font-size: 1.5rem;
          text-shadow: 0 0 8px var(--theme-glow);
        }
        .ecg-game .game-over-desat {
          filter: grayscale(0.9) contrast(1.1) brightness(0.8);
          transition: filter 2.5s ease-in;
        }
        .ecg-game .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin: 1.5rem 0;
          min-width: 280px;
          text-align: left;
        }
        .ecg-game .stat-box {
          background: rgba(30, 41, 59, 0.3);
          padding: 0.75rem 1rem;
          border-left: 3px solid var(--theme-color);
        }
        .ecg-game .stat-val {
          font-size: 1.5rem;
          font-weight: bold;
          color: #f8fafc;
        }

        @media (max-width: 640px) {
          .ecg-game .monitor-frame {
            height: 380px;
          }
          .ecg-game h1 {
            font-size: 2rem;
          }
          .ecg-game p {
            font-size: 0.9rem;
          }
          .ecg-game .hud-value {
            font-size: 1rem;
          }
          .ecg-game #hud-top {
            height: 40px;
            padding: 0 10px;
          }
          .ecg-game #stability-container {
            width: 40px;
            padding: 46px 0 10px 0;
          }
          .ecg-game #stability-track {
            width: 10px;
          }
          .ecg-game #combo-badge {
            left: 16px;
            bottom: 16px;
            font-size: 0.8rem;
          }
          .ecg-game #combo-count {
            font-size: 1.1rem;
          }
          .ecg-game .stats-grid {
            min-width: 200px;
            gap: 1rem;
          }
          .ecg-game .stat-val {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="monitor-frame">
        <div id="hud-top">
          <div className="hud-element">
            <span className="hud-label">Condition</span>
            <span className="hud-value" ref={statusRef}>STABLE</span>
          </div>
          <div className="hud-element" style={{ alignItems: "center" }}>
            <span className="hud-label">Heart Rate</span>
            <span className="hud-value" ref={bpmRef}>50 BPM</span>
          </div>
          <div className="hud-element" style={{ alignItems: "flex-end" }}>
            <span className="hud-label">Time Remaining</span>
            <span className="hud-value" ref={timerRef}>60.0s</span>
          </div>
        </div>

        <div id="game-interface">
          <div id="feedback-overlay" ref={feedbackRef}>PERFECT</div>
          <div id="combo-badge">STREAK: <span id="combo-count" ref={comboRef}>0</span></div>

          <div id="canvas-container">
            <canvas id="game-canvas" ref={canvasRef}></canvas>
          </div>

          <div id="stability-container">
            <div id="stability-track">
              <div id="stability-fill" ref={fillRef}></div>
            </div>
            <span className="stability-label">Stability</span>
          </div>
        </div>

        {/* Start Screen */}
        <div className={`screen${showStart ? "" : " hidden"}`}>
          <h1>ECG PEAK</h1>
          <p>
            Maintain standard rhythm alignment. Press <strong>SPACEBAR</strong> or <strong>TAP SCREEN</strong>{" "}
            exactly when the sharp voltage R-peak passes through the glowing target zone grid array.
          </p>
          <button className="btn" onClick={startGame}>
            Initialize Monitor
          </button>
        </div>

        {/* Game Over Screen */}
        <div className={`screen${showGameOver ? "" : " hidden"}`}>
          <h1 style={{ color: "var(--monitor-red)", textShadow: "0 0 10px rgba(255,51,51,0.3)" }}>
            CRITICAL FAILURE
          </h1>
          <p>Patient heart rate destabilized into persistent cardiac arrest. Review telemetry data loop below.</p>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="hud-label">Survival Time</div>
              <div className="stat-val">{goStats.time}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Accuracy</div>
              <div className="stat-val">{goStats.acc}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Max Streak</div>
              <div className="stat-val">{goStats.streak}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Best Streak</div>
              <div className="stat-val">{goStats.best}</div>
            </div>
          </div>
          <button className="btn" onClick={startGame}>
            Restart Monitor
          </button>
        </div>

        {/* Win Screen */}
        <div className={`screen${showWin ? "" : " hidden"}`}>
          <h1 style={{ color: "var(--monitor-green)" }}>PATIENT STABILIZED</h1>
          <p>Vitals normal. Continuous rhythm synchronization run successful. High fidelity analysis saved.</p>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="hud-label">Accuracy Score</div>
              <div className="stat-val">{winStats.acc}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Max Streak</div>
              <div className="stat-val">{winStats.streak}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Peak Pulse Rate</div>
              <div className="stat-val">{winStats.bpm}</div>
            </div>
            <div className="stat-box">
              <div className="hud-label">Session Best</div>
              <div className="stat-val">{winStats.best}</div>
            </div>
          </div>
          <button className="btn" onClick={startGame}>
            Cycle System
          </button>
        </div>
      </div>
    </div>
  );
}
