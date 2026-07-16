import { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Scene from './three/Scene';
import Overlay from './components/Overlay';
import { STAGES } from './data/stages';
import type { TapData } from './three/TouchRipple';

// NexaSoul brand colors
const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';

type Phase = 'intro' | 'journey' | 'finale';

const STAGE_DURATION = 5500;
const INTRO_DURATION = 5000;
const FINALE_HOLD = 5000;    // ms before countdown starts
const RESTART_COUNTDOWN = 25; // seconds

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentStage, setCurrentStage] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [waveTrigger, setWaveTrigger] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [restartCountdown, setRestartCountdown] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tapRef = useRef<TapData | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  // Simulated live visitor counter
  useEffect(() => {
    const baseCount = 180 + Math.floor(Math.random() * 80);
    setVisitorCount(baseCount);
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  // Smoothly animate the displayed counter
  useEffect(() => {
    if (displayCount >= visitorCount) return;
    const t = setTimeout(() => setDisplayCount((c) => c + 1), 40);
    return () => clearTimeout(t);
  }, [displayCount, visitorCount]);

  // Handle taps/clicks on the canvas for touch-reactive ripple + orb glow
  const handleCanvasTap = useCallback((e: React.PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    tapRef.current = { x, y, time: performance.now() };
  }, []);

  const doRestart = useCallback(() => {
    setShowQR(false);
    setPhase('intro');
    setCurrentStage(0);
    setUnlockedCount(1);
    setWaveTrigger(-1);
    setProgress(0);
    setRestartCountdown(null);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }, []);

  const advanceStage = useCallback(() => {
    setCurrentStage((prev) => {
      const next = prev + 1;
      if (next >= STAGES.length) {
        setPhase('finale');
        setProgress(100);
        return prev;
      }
      setUnlockedCount(next + 1);
      setWaveTrigger(next);
      setProgress((next / (STAGES.length - 1)) * 100);
      return next;
    });
  }, []);

  // Auto-advance during journey
  useEffect(() => {
    if (phase !== 'journey') return;
    timerRef.current = setTimeout(advanceStage, STAGE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, currentStage, advanceStage]);

  // Transition intro → journey
  useEffect(() => {
    if (phase !== 'intro') return;
    const t = setTimeout(() => setPhase('journey'), INTRO_DURATION);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-restart after finale: FINALE_HOLD + RESTART_COUNTDOWN seconds
  useEffect(() => {
    if (phase !== 'finale') return;
    const holdTimer = setTimeout(() => {
      let count = RESTART_COUNTDOWN;
      setRestartCountdown(count);
      countdownRef.current = setInterval(() => {
        count -= 1;
        setRestartCountdown(count);
        if (count <= 0) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          doRestart();
        }
      }, 1000);
    }, FINALE_HOLD);
    return () => {
      clearTimeout(holdTimer);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [phase, doRestart]);

  const handleStageClick = useCallback((index: number) => {
    if (index >= unlockedCount) return;
    setCurrentStage(index);
    setProgress((index / (STAGES.length - 1)) * 100);
  }, [unlockedCount]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: '#060D1A' }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60, near: 0.1, far: 500 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerDown={handleCanvasTap}
      >
        <color attach="background" args={['#060D1A']} />
        <Scene
          currentStage={currentStage}
          unlockedCount={unlockedCount}
          onStageClick={handleStageClick}
          waveTrigger={waveTrigger}
          phase={phase}
          tapRef={tapRef}
        />
        <EffectComposer>
          <Bloom intensity={1.0} luminanceThreshold={0.18} luminanceSmoothing={0.85} mipmapBlur />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      </Canvas>

      <Overlay
        phase={phase}
        currentStage={currentStage}
        unlockedCount={unlockedCount}
        progress={progress}
        onJoin={() => setShowQR(true)}
        restartCountdown={restartCountdown}
        visitorCount={displayCount}
      />

      {/* QR Code modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
          style={{ backgroundColor: 'rgba(6,13,26,0.88)', backdropFilter: 'blur(16px)' }}
          onClick={() => setShowQR(false)}
        >
          <div
            className="rounded-3xl p-6 md:p-8 mx-4 w-full max-w-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(6,13,26,0.95), rgba(12,24,48,0.95))',
              border: `1px solid ${NS_CYAN}30`,
              boxShadow: `0 0 60px ${NS_CYAN}25, 0 0 120px ${NS_LIME}10`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h3
                className="text-2xl md:text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${NS_CYAN}, ${NS_LIME})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Join NexaSoul
              </h3>
              <p className="text-white/40 text-sm mt-1">Scan to connect — be part of the journey</p>
            </div>

            {/* QR cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Website QR */}
              <div
                className="rounded-2xl p-4 flex flex-col items-center gap-3"
                style={{
                  background: 'rgba(0,200,255,0.06)',
                  border: `1px solid ${NS_CYAN}25`,
                }}
              >
                <img
                  src="/qr-website.png"
                  alt="NexaSoul Website QR"
                  className="w-full max-w-[140px] rounded-xl"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="text-center">
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: NS_CYAN }}>
                    Website
                  </div>
                  <div className="text-[10px] text-white/35 mt-0.5">Scan to visit</div>
                </div>
              </div>

              {/* Instagram QR */}
              <div
                className="rounded-2xl p-4 flex flex-col items-center gap-3"
                style={{
                  background: 'rgba(126,200,32,0.06)',
                  border: `1px solid ${NS_LIME}25`,
                }}
              >
                <img
                  src="/qr-instagram.png"
                  alt="NexaSoul Instagram QR"
                  className="w-full max-w-[140px] rounded-xl"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="text-center">
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: NS_LIME }}>
                    Instagram
                  </div>
                  <div className="text-[10px] text-white/35 mt-0.5">Follow us</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-5">
              <p className="text-[10px] text-white/25 tracking-widest uppercase">
                Code • Connect • Conquer
              </p>
              <button
                className="mt-3 text-xs text-white/30 hover:text-white/60 transition-colors"
                onClick={() => setShowQR(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
