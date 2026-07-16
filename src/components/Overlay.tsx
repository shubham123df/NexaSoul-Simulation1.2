import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { STAGES, PARENT_FLOW, WEEKLY_JOURNEY } from '../data/stages';

// NexaSoul brand: #00C8FF (cyan) + #7EC820 (lime)
const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';

interface OverlayProps {
  phase: 'intro' | 'journey' | 'finale';
  currentStage: number;
  unlockedCount: number;
  progress: number;
  onJoin: () => void;
  restartCountdown: number | null;
  visitorCount: number;
}

export default function Overlay({ phase, currentStage, unlockedCount, progress, onJoin, restartCountdown, visitorCount }: OverlayProps) {
  const [introText, setIntroText] = useState(0);
  const introTexts = ['Welcome to NexaSoul', 'Your Journey Starts Here'];

  useEffect(() => {
    if (phase !== 'intro') {
      setIntroText(0);
      return;
    }
    const t = setTimeout(() => setIntroText(1), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  const stage = STAGES[currentStage];
  const totalXP = STAGES[currentStage]?.xp ?? 0;
  const maxXP = STAGES[STAGES.length - 1].xp;
  const xpProgress = (totalXP / maxXP) * 100;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">

      {/* ── INTRO ──────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo wordmark */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-center"
            >
              <h1
                className="text-6xl md:text-8xl font-black tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${NS_CYAN} 0%, #44DDFF 40%, ${NS_LIME} 70%, #B0E840 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 24px ${NS_CYAN}80)`,
                }}
              >
                NEX<span style={{ WebkitTextFillColor: NS_LIME, filter: `drop-shadow(0 0 16px ${NS_LIME})` }}>A</span>SOUL
              </h1>
              <div className="mt-2 text-xs md:text-sm tracking-[0.5em] uppercase font-medium" style={{ color: `${NS_CYAN}90` }}>
                Code • Connect • Conquer
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p
                key={introText}
                className="mt-8 text-lg md:text-2xl font-light tracking-wide"
                style={{ color: `${NS_LIME}CC` }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.8 }}
              >
                {introTexts[introText]}
              </motion.p>
            </AnimatePresence>

            {/* Pulsing ring */}
            <motion.div
              className="mt-10 w-2 h-2 rounded-full"
              style={{ backgroundColor: NS_CYAN }}
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level-up flash overlay removed */}

      {/* Live visitor counter */}
           <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-10 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: phase === 'journey' ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            background: 'rgba(6,13,26,0.7)',
            border: `1px solid ${NS_LIME}30`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: NS_LIME, boxShadow: `0 0 8px ${NS_LIME}` }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-mono font-bold" style={{ color: NS_LIME }}>
            {visitorCount}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            exploring
          </span>
        </div>
      </motion.div>

      {/* ── JOURNEY ────────────────────────────────────────── */}
      {phase === 'journey' && (
        <>
          {/* Top bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-10 py-4"
            style={{ background: 'linear-gradient(to bottom, rgba(6,13,26,0.85) 0%, transparent 100%)' }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: NS_LIME, boxShadow: `0 0 8px ${NS_LIME}` }} />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: NS_CYAN }}>NexaSoul</span>
              <span className="hidden md:inline text-xs text-white/30 tracking-wider">Learning Simulation</span>
            </div>

            {/* Progress + XP */}
            <div className="flex items-center gap-4">
              {/* XP */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: NS_LIME }}>XP</span>
                <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${xpProgress}%`,
                      background: `linear-gradient(90deg, ${NS_LIME}, #CCFF44)`,
                      boxShadow: `0 0 6px ${NS_LIME}`,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-[10px] font-mono" style={{ color: NS_LIME }}>{totalXP}</span>
              </div>

              {/* Stage progress */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Stage</span>
                <div className="flex gap-1">
                  {STAGES.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: i < unlockedCount ? (i % 2 === 0 ? NS_CYAN : NS_LIME) : 'rgba(255,255,255,0.1)',
                        boxShadow: i === currentStage ? `0 0 6px ${NS_CYAN}` : 'none',
                        transform: i === currentStage ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* % */}
              <div className="w-20 md:w-36 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${NS_CYAN}, ${NS_LIME})`,
                    boxShadow: `0 0 6px ${NS_CYAN}`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs font-mono font-bold w-10" style={{ color: NS_CYAN }}>{Math.round(progress)}%</span>
            </div>
          </motion.div>

          {/* Stage info card — bottom left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              className="absolute bottom-6 left-5 md:bottom-10 md:left-10 max-w-xs"
              initial={{ opacity: 0, x: -24, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -24, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              {/* Glassmorphism card */}
              <div
                className="rounded-2xl p-4 md:p-5"
                style={{
                  background: 'rgba(6,13,26,0.75)',
                  border: `1px solid ${stage.accent}30`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 0 24px ${stage.accent}18`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: stage.accent, boxShadow: `0 0 8px ${stage.accent}` }}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/40">
                    Level {currentStage + 1} · {stage.xp} XP
                  </span>
                </div>
                <h2
                  className="text-xl md:text-3xl font-black mb-1"
                  style={{ color: stage.accent, textShadow: `0 0 16px ${stage.accent}60` }}
                >
                  {stage.title}
                </h2>
                <p className="text-xs md:text-sm text-white/55 mb-3">{stage.subtitle}</p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {stage.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2 py-0.5 text-[10px] md:text-xs rounded-full border font-semibold"
                      style={{
                        borderColor: `${skill.color}50`,
                        color: skill.color,
                        backgroundColor: `${skill.color}18`,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {/* Stage XP mini-bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[9px] text-white/30 mb-1">
                    <span>Progress</span>
                    <span style={{ color: NS_LIME }}>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${((currentStage + 1) / STAGES.length) * 100}%`,
                        background: `linear-gradient(90deg, ${NS_CYAN}, ${NS_LIME})`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Parent flow — right side */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-10 hidden lg:block"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="rounded-xl p-3 md:p-4"
              style={{
                background: 'rgba(6,13,26,0.7)',
                border: `1px solid ${NS_CYAN}20`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-[9px] uppercase tracking-widest mb-3 text-right" style={{ color: `${NS_CYAN}60` }}>
                Student Journey
              </div>
              <div className="flex flex-col gap-2 items-end">
                {PARENT_FLOW.map((item, i) => {
                  const reached = i <= Math.min(Math.floor((unlockedCount / STAGES.length) * PARENT_FLOW.length), PARENT_FLOW.length - 1);
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={`text-xs transition-all duration-500 ${reached ? 'font-semibold text-white' : 'text-white/25'}`}>
                        {item.label}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-500 flex-shrink-0"
                        style={{
                          backgroundColor: reached ? item.color : `${item.color}20`,
                          boxShadow: reached ? `0 0 8px ${item.color}` : 'none',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Weekly bar — bottom right */}
          <motion.div
            className="absolute bottom-6 right-5 md:bottom-10 md:right-10 hidden md:block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="rounded-xl p-3"
              style={{
                background: 'rgba(6,13,26,0.7)',
                border: `1px solid ${NS_LIME}20`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-[9px] uppercase tracking-widest mb-2 text-right" style={{ color: `${NS_LIME}60` }}>
                Week Plan
              </div>
              <div className="flex gap-1.5">
                {WEEKLY_JOURNEY.map((day, i) => {
                  const dayActive = i <= Math.floor((unlockedCount / STAGES.length) * WEEKLY_JOURNEY.length);
                  return (
                    <div key={day.day} className="flex flex-col items-center gap-1">
                      <div
                        className="w-1.5 h-7 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: dayActive ? day.color : `${day.color}18`,
                          boxShadow: dayActive ? `0 0 6px ${day.color}` : 'none',
                        }}
                      />
                      <span className={`text-[8px] ${dayActive ? 'text-white/60' : 'text-white/15'}`}>
                        {day.day.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* ── FINALE ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'finale' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="text-center px-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {/* Gradient lines */}
              <p className="text-base md:text-xl font-light mb-1" style={{ color: `${NS_CYAN}90` }}>
                From Curious Student
              </p>
              <p className="text-base md:text-xl font-light mb-1" style={{ color: `${NS_LIME}90` }}>
                To Industry-Ready Developer
              </p>

              <h1
                className="text-5xl md:text-7xl font-black mt-5 mb-2 tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${NS_CYAN}, #44DDFF 40%, ${NS_LIME} 70%, #CCFF44)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 20px ${NS_CYAN}60)`,
                }}
              >
                NEX<span style={{ WebkitTextFillColor: NS_LIME }}>A</span>SOUL
              </h1>

              <p className="text-sm md:text-base tracking-[0.4em] uppercase mt-3 font-medium" style={{ color: `${NS_CYAN}70` }}>
                Code • Connect • Conquer
              </p>

              <motion.button
                className="pointer-events-auto mt-10 px-10 py-4 rounded-full font-black text-lg text-[#060D1A] transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${NS_CYAN}, ${NS_LIME})`,
                  boxShadow: `0 0 32px ${NS_CYAN}60, 0 0 64px ${NS_LIME}30`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${NS_CYAN}40, 0 0 40px ${NS_LIME}20`,
                    `0 0 40px ${NS_CYAN}70, 0 0 70px ${NS_LIME}40`,
                    `0 0 20px ${NS_CYAN}40, 0 0 40px ${NS_LIME}20`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={onJoin}
              >
                Join NexaSoul
              </motion.button>

              {/* Restart countdown */}
              {restartCountdown !== null && (
                <motion.p
                  className="mt-6 text-xs tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Replaying in {restartCountdown}s
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(6,13,26,0.45) 100%)' }}
      />
    </div>
  );
}
