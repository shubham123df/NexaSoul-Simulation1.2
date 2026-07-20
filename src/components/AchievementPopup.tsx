import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_GOLD = '#FFD700';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const RARITY_COLORS = {
  common: NS_CYAN,
  rare: NS_LIME,
  epic: '#9B59B6',
  legendary: NS_GOLD
};

const RARITY_GLOW = {
  common: 'rgba(0,200,255,0.3)',
  rare: 'rgba(126,200,32,0.3)',
  epic: 'rgba(155,89,182,0.3)',
  legendary: 'rgba(255,215,0,0.3)'
};

export default function AchievementPopup({ achievement, isOpen, onClose }: AchievementPopupProps) {
  if (!achievement || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Achievement Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative pointer-events-auto"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-3xl"
                style={{ backgroundColor: RARITY_GLOW[achievement.rarity] }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Main card */}
              <div className="relative rounded-2xl p-8 min-w-[400px]" style={{
                background: 'linear-gradient(135deg, rgba(6,13,26,0.95) 0%, rgba(10,20,40,0.95) 100%)',
                border: `3px solid ${RARITY_COLORS[achievement.rarity]}`,
                boxShadow: `0 0 40px ${RARITY_GLOW[achievement.rarity]}`
              }}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>

                {/* Achievement content */}
                <div className="text-center">
                  {/* Icon */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-5xl"
                    style={{
                      backgroundColor: `${RARITY_COLORS[achievement.rarity]}20`,
                      border: `2px solid ${RARITY_COLORS[achievement.rarity]}`
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {achievement.icon}
                  </motion.div>

                  {/* Rarity badge */}
                  <motion.div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                    style={{
                      backgroundColor: `${RARITY_COLORS[achievement.rarity]}20`,
                      color: RARITY_COLORS[achievement.rarity],
                      border: `1px solid ${RARITY_COLORS[achievement.rarity]}40`
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    {achievement.rarity}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {achievement.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    className="text-white/70 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {achievement.description}
                  </motion.p>

                  {/* XP Reward */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: `${NS_LIME}15`,
                      border: `1px solid ${NS_LIME}30`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    <Sparkles size={16} style={{ color: NS_LIME }} />
                    <span className="text-sm font-bold" style={{ color: NS_LIME }}>
                      +{achievement.xpReward} XP
                    </span>
                  </motion.div>

                  {/* Trophy decoration */}
                  <motion.div
                    className="absolute -top-6 -right-6"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                      backgroundColor: `${RARITY_COLORS[achievement.rarity]}30`,
                      border: `2px solid ${RARITY_COLORS[achievement.rarity]}`
                    }}>
                      <Trophy size={32} style={{ color: RARITY_COLORS[achievement.rarity] }} />
                    </div>
              </motion.div>
                </div>

                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: RARITY_COLORS[achievement.rarity],
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 150,
                      y: Math.sin((i / 8) * Math.PI * 2) * 150,
                      scale: [0, 1, 0],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      duration: 1.5
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
