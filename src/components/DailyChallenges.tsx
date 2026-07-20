import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Target, Flame, Trophy, X, CheckCircle, Clock, Star, Zap } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_PURPLE = '#9B59B6';
const NS_GOLD = '#FFD700';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  category: 'learning' | 'practice' | 'exploration';
}

interface WeeklyJourney {
  day: number;
  title: string;
  description: string;
  completed: boolean;
  xpReward: number;
}

const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'challenge1',
    title: 'Complete 3 Learning Tasks',
    description: 'Finish any 3 learning tasks from your current stage',
    xpReward: 30,
    difficulty: 'easy',
    completed: true,
    category: 'learning'
  },
  {
    id: 'challenge2',
    title: 'Review Flashcards',
    description: 'Go through all flashcards for your current stage',
    xpReward: 25,
    difficulty: 'easy',
    completed: false,
    category: 'learning'
  },
  {
    id: 'challenge3',
    title: 'Pass the Quiz',
    description: 'Complete the knowledge quiz with 80%+ accuracy',
    xpReward: 50,
    difficulty: 'medium',
    completed: false,
    category: 'learning'
  },
  {
    id: 'challenge4',
    title: 'Explore the City',
    description: 'Visit all 5 buildings in the interactive city',
    xpReward: 40,
    difficulty: 'easy',
    completed: false,
    category: 'exploration'
  },
  {
    id: 'challenge5',
    title: 'Talk to a Mentor',
    description: 'Complete a full mentor dialogue session',
    xpReward: 35,
    difficulty: 'medium',
    completed: false,
    category: 'practice'
  },
  {
    id: 'challenge6',
    title: 'Skill Tree Exploration',
    description: 'View the skill tree and click on 3 different nodes',
    xpReward: 20,
    difficulty: 'easy',
    completed: false,
    category: 'exploration'
  }
];

const WEEKLY_JOURNEY: WeeklyJourney[] = [
  {
    day: 1,
    title: 'Foundation Day',
    description: 'Learn HTML basics and structure',
    completed: true,
    xpReward: 50
  },
  {
    day: 2,
    title: 'Style Master',
    description: 'Master CSS colors and fonts',
    completed: true,
    xpReward: 60
  },
  {
    day: 3,
    title: 'Layout Lab',
    description: 'Practice CSS layouts with Flexbox',
    completed: true,
    xpReward: 70
  },
  {
    day: 4,
    title: 'JavaScript Intro',
    description: 'Learn variables and basic operations',
    completed: false,
    xpReward: 80
  },
  {
    day: 5,
    title: 'Functions & Logic',
    description: 'Master JavaScript functions and conditionals',
    completed: false,
    xpReward: 90
  },
  {
    day: 6,
    title: 'Project Day',
    description: 'Build a mini-project combining learned skills',
    completed: false,
    xpReward: 100
  },
  {
    day: 7,
    title: 'Review & Reflect',
    description: 'Review the week and complete challenges',
    completed: false,
    xpReward: 50
  }
];

const DIFFICULTY_COLORS = {
  easy: NS_LIME,
  medium: NS_CYAN,
  hard: NS_PURPLE
};

interface DailyChallengesProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyChallenges({ isOpen, onClose }: DailyChallengesProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const completedDaily = DAILY_CHALLENGES.filter(c => c.completed).length;
  const totalDailyXP = DAILY_CHALLENGES.filter(c => c.completed).reduce((sum, c) => sum + c.xpReward, 0);
  const completedWeekly = WEEKLY_JOURNEY.filter(j => j.completed).length;
  const totalWeeklyXP = WEEKLY_JOURNEY.filter(j => j.completed).reduce((sum, j) => sum + j.xpReward, 0);

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
            className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-white/10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 border-b border-white/10 bg-black/20 z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Challenges & Journey</h2>
                  <p className="text-xs md:text-sm text-white/60">Daily challenges and weekly learning path</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('daily')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === 'daily' ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'daily' ? `${NS_CYAN}30` : 'rgba(255,255,255,0.05)',
                    border: activeTab === 'daily' ? `1px solid ${NS_CYAN}` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Target size={16} />
                  Daily Challenges
                </button>
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === 'weekly' ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'weekly' ? `${NS_LIME}30` : 'rgba(255,255,255,0.05)',
                    border: activeTab === 'weekly' ? `1px solid ${NS_LIME}` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Calendar size={16} />
                  Weekly Journey
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 top-28 md:top-32 bottom-6 left-0 right-0 px-4 md:px-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'daily' ? (
                  <motion.div
                    key="daily"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: `${NS_CYAN}10`, border: `1px solid ${NS_CYAN}30` }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${NS_CYAN}20` }}>
                          <Flame size={20} style={{ color: NS_CYAN }} />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{completedDaily}/{DAILY_CHALLENGES.length}</div>
                          <div className="text-xs text-white/50">Completed</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: `${NS_GOLD}10`, border: `1px solid ${NS_GOLD}30` }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${NS_GOLD}20` }}>
                          <Zap size={20} style={{ color: NS_GOLD }} />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{totalDailyXP} XP</div>
                          <div className="text-xs text-white/50">Earned Today</div>
                        </div>
                      </div>
                    </div>

                    {/* Challenges */}
                    <div className="space-y-3">
                      {DAILY_CHALLENGES.map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          className="p-4 rounded-xl"
                          style={{
                            backgroundColor: challenge.completed 
                              ? `${NS_LIME}10` 
                              : 'rgba(255,255,255,0.05)',
                            border: challenge.completed 
                              ? `1px solid ${NS_LIME}30` 
                              : '1px solid rgba(255,255,255,0.1)',
                            opacity: challenge.completed ? 0.7 : 1
                          }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              challenge.completed ? 'bg-green-500/20' : `${DIFFICULTY_COLORS[challenge.difficulty]}20`
                            }`}>
                              {challenge.completed ? (
                                <CheckCircle size={24} className="text-green-500" />
                              ) : (
                                <Star size={24} style={{ color: DIFFICULTY_COLORS[challenge.difficulty] }} />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-bold ${challenge.completed ? 'text-white/50 line-through' : 'text-white'}`}>
                                  {challenge.title}
                                </h4>
                                <span className="text-xs px-2 py-0.5 rounded-full uppercase font-medium"
                                  style={{
                                    backgroundColor: `${DIFFICULTY_COLORS[challenge.difficulty]}20`,
                                    color: DIFFICULTY_COLORS[challenge.difficulty]
                                  }}
                                >
                                  {challenge.difficulty}
                                </span>
                              </div>
                              <p className="text-sm text-white/60 mb-2">{challenge.description}</p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-xs" style={{ color: NS_GOLD }}>
                                  <Zap size={12} />
                                  <span className="font-bold">+{challenge.xpReward} XP</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-white/50">
                                  <Clock size={12} />
                                  <span>{challenge.category}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="weekly"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: `${NS_LIME}10`, border: `1px solid ${NS_LIME}30` }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${NS_LIME}20` }}>
                          <Calendar size={20} style={{ color: NS_LIME }} />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{completedWeekly}/7</div>
                          <div className="text-xs text-white/50">Days Completed</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: `${NS_PURPLE}10`, border: `1px solid ${NS_PURPLE}30` }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${NS_PURPLE}20` }}>
                          <Trophy size={20} style={{ color: NS_PURPLE }} />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{totalWeeklyXP} XP</div>
                          <div className="text-xs text-white/50">Weekly Total</div>
                        </div>
                      </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

                      <div className="space-y-4">
                        {WEEKLY_JOURNEY.map((journey, index) => (
                          <motion.div
                            key={journey.day}
                            className="relative pl-16"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {/* Timeline dot */}
                            <div className={`absolute left-4 w-5 h-5 rounded-full border-2 ${
                              journey.completed 
                                ? 'bg-green-500 border-green-500' 
                                : index === completedWeekly 
                                ? 'bg-white border-white animate-pulse' 
                                : 'bg-slate-700 border-slate-600'
                            }`} />

                            <div className="p-4 rounded-xl"
                              style={{
                                backgroundColor: journey.completed 
                                  ? `${NS_LIME}10` 
                                  : index === completedWeekly 
                                  ? `${NS_CYAN}15` 
                                  : 'rgba(255,255,255,0.05)',
                                border: journey.completed 
                                  ? `1px solid ${NS_LIME}30` 
                                  : index === completedWeekly 
                                  ? `1px solid ${NS_CYAN}40` 
                                  : '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{
                                      backgroundColor: `${NS_CYAN}20`,
                                      color: NS_CYAN
                                    }}>
                                      Day {journey.day}
                                    </span>
                                    <h4 className={`font-bold ${journey.completed ? 'text-white/50 line-through' : 'text-white'}`}>
                                      {journey.title}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-white/60">{journey.description}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs" style={{ color: NS_GOLD }}>
                                  <Zap size={12} />
                                  <span className="font-bold">+{journey.xpReward}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
