import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Award, Star, X, Filter, Lock } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_PURPLE = '#9B59B6';
const NS_GOLD = '#FFD700';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'exploration' | 'skill' | 'social' | 'milestone';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first learning task',
    icon: '👣',
    rarity: 'common',
    xpReward: 10,
    unlocked: true,
    unlockedAt: '2024-01-15',
    category: 'exploration'
  },
  {
    id: 'path_chosen',
    title: 'Path Chosen',
    description: 'Select your developer path',
    icon: '🧭',
    rarity: 'common',
    xpReward: 15,
    unlocked: true,
    unlockedAt: '2024-01-15',
    category: 'exploration'
  },
  {
    id: 'html_master',
    title: 'HTML Master',
    description: 'Complete all HTML learning tasks',
    icon: '📝',
    rarity: 'rare',
    xpReward: 50,
    unlocked: true,
    unlockedAt: '2024-01-20',
    category: 'skill'
  },
  {
    id: 'css_artist',
    title: 'CSS Artist',
    description: 'Style 10 different projects',
    icon: '🎨',
    rarity: 'rare',
    xpReward: 50,
    unlocked: false,
    category: 'skill'
  },
  {
    id: 'js_ninja',
    title: 'JavaScript Ninja',
    description: 'Complete JavaScript fundamentals',
    icon: '⚡',
    rarity: 'epic',
    xpReward: 100,
    unlocked: false,
    category: 'skill'
  },
  {
    id: 'react_wizard',
    title: 'React Wizard',
    description: 'Build 5 React components',
    icon: '⚛️',
    rarity: 'epic',
    xpReward: 100,
    unlocked: false,
    category: 'skill'
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Connect with 10 community members',
    icon: '🦋',
    rarity: 'common',
    xpReward: 25,
    unlocked: true,
    unlockedAt: '2024-01-18',
    category: 'social'
  },
  {
    id: 'mentor_protege',
    title: 'Mentor Protégé',
    description: 'Complete 5 mentor sessions',
    icon: '🎓',
    rarity: 'rare',
    xpReward: 75,
    unlocked: false,
    category: 'social'
  },
  {
    id: 'hackathon_winner',
    title: 'Hackathon Winner',
    description: 'Win a NexaSoul hackathon',
    icon: '🏆',
    rarity: 'legendary',
    xpReward: 500,
    unlocked: false,
    category: 'milestone'
  },
  {
    id: 'full_stack',
    title: 'Full Stack Developer',
    description: 'Complete both frontend and backend paths',
    icon: '🚀',
    rarity: 'legendary',
    xpReward: 300,
    unlocked: false,
    category: 'milestone'
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all skill tree nodes',
    icon: '🗺️',
    rarity: 'epic',
    xpReward: 150,
    unlocked: false,
    category: 'exploration'
  },
  {
    id: 'city_dweller',
    title: 'City Dweller',
    description: 'Explore all city buildings',
    icon: '🏙️',
    rarity: 'rare',
    xpReward: 60,
    unlocked: false,
    category: 'exploration'
  }
];

const RARITY_COLORS = {
  common: NS_CYAN,
  rare: NS_LIME,
  epic: NS_PURPLE,
  legendary: NS_GOLD
};

const RARITY_GLOW = {
  common: 'rgba(0,200,255,0.3)',
  rare: 'rgba(126,200,32,0.3)',
  epic: 'rgba(155,89,182,0.3)',
  legendary: 'rgba(255,215,0,0.3)'
};

const CATEGORY_FILTERS = ['all', 'exploration', 'skill', 'social', 'milestone'] as const;

interface AchievementGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementGallery({ isOpen, onClose }: AchievementGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORY_FILTERS[number]>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = selectedCategory === 'all' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalXP = ACHIEVEMENTS.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-white/10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 border-b border-white/10 bg-black/20 z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Achievement Gallery</h2>
                  <p className="text-xs md:text-sm text-white/60">Your collection of accomplishments</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Trophy size={16} style={{ color: NS_GOLD }} />
                  <div>
                    <div className="text-sm md:text-lg font-bold text-white">{unlockedCount}/{ACHIEVEMENTS.length}</div>
                    <div className="text-[10px] md:text-xs text-white/50">Unlocked</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} style={{ color: NS_LIME }} />
                  <div>
                    <div className="text-sm md:text-lg font-bold text-white">{totalXP}</div>
                    <div className="text-[10px] md:text-xs text-white/50">Total XP Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="absolute top-24 md:top-28 left-4 right-4 md:left-6 md:right-6 flex gap-2 flex-wrap z-10">
              {CATEGORY_FILTERS.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    selectedCategory === category ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? `${NS_CYAN}30` : 'rgba(255,255,255,0.05)',
                    border: selectedCategory === category ? `1px solid ${NS_CYAN}` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Achievement Grid */}
            <div className="absolute inset-0 top-36 md:top-40 bottom-6 left-0 right-0 px-4 md:px-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAchievements.map((achievement, index) => (
                  <motion.button
                    key={achievement.id}
                    onClick={() => setSelectedAchievement(achievement)}
                    disabled={!achievement.unlocked}
                    className="relative aspect-square rounded-xl p-4 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    style={{
                      backgroundColor: achievement.unlocked 
                        ? `${RARITY_COLORS[achievement.rarity]}10` 
                        : 'rgba(255,255,255,0.02)',
                      border: achievement.unlocked 
                        ? `2px solid ${RARITY_COLORS[achievement.rarity]}40` 
                        : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: achievement.unlocked 
                        ? `0 0 20px ${RARITY_GLOW[achievement.rarity]}` 
                        : 'none'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
                    whileTap={achievement.unlocked ? { scale: 0.95 } : {}}
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-2">{achievement.unlocked ? achievement.icon : '🔒'}</div>

                    {/* Title */}
                    <div className="text-xs font-bold text-white/90 mb-1 line-clamp-1">{achievement.title}</div>

                    {/* Rarity badge */}
                    <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase"
                      style={{
                        backgroundColor: achievement.unlocked 
                          ? `${RARITY_COLORS[achievement.rarity]}20` 
                          : 'rgba(255,255,255,0.05)',
                        color: achievement.unlocked 
                          ? RARITY_COLORS[achievement.rarity] 
                          : 'rgba(255,255,255,0.3)'
                      }}
                    >
                      {achievement.rarity}
                    </div>

                    {/* XP Reward */}
                    {achievement.unlocked && (
                      <div className="absolute top-2 right-2 text-[10px] font-bold" style={{ color: NS_LIME }}>
                        +{achievement.xpReward}
                      </div>
                    )}

                    {/* Glow effect for unlocked */}
                    {achievement.unlocked && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: `0 0 30px ${RARITY_GLOW[achievement.rarity]}`
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${RARITY_GLOW[achievement.rarity]}`,
                            `0 0 40px ${RARITY_GLOW[achievement.rarity]}`,
                            `0 0 20px ${RARITY_GLOW[achievement.rarity]}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Achievement Detail Modal */}
            <AnimatePresence>
              {selectedAchievement && (
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedAchievement(null)}
                >
                  <motion.div
                    className="relative w-full max-w-md mx-4"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="rounded-2xl p-6" style={{
                      background: 'linear-gradient(135deg, rgba(6,13,26,0.95) 0%, rgba(10,20,40,0.95) 100%)',
                      border: `2px solid ${selectedAchievement.unlocked ? RARITY_COLORS[selectedAchievement.rarity] : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: selectedAchievement.unlocked 
                        ? `0 0 40px ${RARITY_GLOW[selectedAchievement.rarity]}` 
                        : 'none'
                    }}>
                      <button
                        onClick={() => setSelectedAchievement(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <X size={16} className="text-white" />
                      </button>

                      <div className="text-center mb-6">
                        {/* Large Icon */}
                        <motion.div
                          className="text-6xl mb-4 inline-block"
                          animate={selectedAchievement.unlocked ? {
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {selectedAchievement.unlocked ? selectedAchievement.icon : '🔒'}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2">{selectedAchievement.title}</h3>

                        {/* Rarity */}
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                          style={{
                            backgroundColor: selectedAchievement.unlocked 
                              ? `${RARITY_COLORS[selectedAchievement.rarity]}20` 
                              : 'rgba(255,255,255,0.05)',
                            color: selectedAchievement.unlocked 
                              ? RARITY_COLORS[selectedAchievement.rarity] 
                              : 'rgba(255,255,255,0.3)',
                            border: selectedAchievement.unlocked 
                              ? `1px solid ${RARITY_COLORS[selectedAchievement.rarity]}40` 
                              : '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          {selectedAchievement.rarity}
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm">{selectedAchievement.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div className="flex items-center gap-2">
                            <Star size={16} style={{ color: NS_LIME }} />
                            <span className="text-sm text-white/70">XP Reward</span>
                          </div>
                          <span className="text-sm font-bold" style={{ color: NS_LIME }}>
                            {selectedAchievement.unlocked ? `+${selectedAchievement.xpReward} XP` : 'Locked'}
                          </span>
                        </div>

                        {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                          <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="flex items-center gap-2">
                              <Award size={16} style={{ color: NS_CYAN }} />
                              <span className="text-sm text-white/70">Unlocked</span>
                            </div>
                            <span className="text-sm font-bold text-white">{selectedAchievement.unlockedAt}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div className="flex items-center gap-2">
                            <Filter size={16} style={{ color: NS_PURPLE }} />
                            <span className="text-sm text-white/70">Category</span>
                          </div>
                          <span className="text-sm font-bold text-white capitalize">{selectedAchievement.category}</span>
                        </div>
                      </div>

                      {!selectedAchievement.unlocked && (
                        <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: 'rgba(255,94,58,0.1)', border: '1px solid rgba(255,94,58,0.3)' }}>
                          <div className="flex items-center justify-center gap-2">
                            <Lock size={16} style={{ color: '#FF5E3A' }} />
                            <span className="text-sm" style={{ color: '#FF5E3A' }}>Complete the requirements to unlock</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
