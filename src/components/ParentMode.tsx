import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Users, TrendingUp, Calendar, Award, Clock, Heart, X, CheckCircle, BookOpen, Zap } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_PURPLE = '#9B59B6';
const NS_GOLD = '#FFD700';

interface ParentModeProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCount: number;
  currentStage: number;
  playerXP: number;
}

export default function ParentMode({ isOpen, onClose, unlockedCount, currentStage, playerXP }: ParentModeProps) {
  const totalStages = 9;
  const progressPercent = Math.round((unlockedCount / totalStages) * 100);

  const weeklyStats = [
    { label: 'Time Spent', value: '12h 30m', icon: Clock, color: NS_CYAN },
    { label: 'Tasks Completed', value: '15', icon: CheckCircle, color: NS_LIME },
    { label: 'XP Earned', value: `${playerXP}`, icon: Zap, color: NS_GOLD },
    { label: 'Stages Unlocked', value: `${unlockedCount}/${totalStages}`, icon: Award, color: NS_PURPLE }
  ];

  const learningMilestones = [
    { title: 'HTML Basics', completed: true, date: 'Jan 15', description: 'Learned fundamental HTML structure' },
    { title: 'CSS Styling', completed: true, date: 'Jan 28', description: 'Mastered colors, fonts, and layouts' },
    { title: 'JavaScript Fundamentals', completed: true, date: 'Feb 10', description: 'Variables, functions, and logic' },
    { title: 'React Components', completed: false, date: 'In Progress', description: 'Building reusable UI components' },
    { title: 'Project Portfolio', completed: false, date: 'Upcoming', description: 'Creating personal portfolio website' }
  ];

  const skillsDeveloped = [
    { name: 'Problem Solving', level: 85, color: NS_CYAN },
    { name: 'Creativity', level: 70, color: NS_LIME },
    { name: 'Persistence', level: 90, color: NS_PURPLE },
    { name: 'Collaboration', level: 65, color: NS_GOLD }
  ];

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
            className="relative w-full max-w-5xl h-[90vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-white/10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 border-b border-white/10 bg-black/20 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${NS_CYAN}20`, border: `2px solid ${NS_CYAN}` }}>
                    <Users size={20} style={{ color: NS_CYAN }} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Parent Dashboard</h2>
                    <p className="text-xs md:text-sm text-white/60">Track your child's learning journey</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 top-16 md:top-20 bottom-6 left-0 right-0 px-4 md:px-6 overflow-y-auto">
              {/* Overall Progress */}
              <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: `${NS_CYAN}10`, border: `1px solid ${NS_CYAN}30` }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp size={20} style={{ color: NS_CYAN }} />
                    Overall Progress
                  </h3>
                  <div className="text-3xl font-bold" style={{ color: NS_CYAN }}>{progressPercent}%</div>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${NS_CYAN}, ${NS_LIME})`,
                      boxShadow: `0 0 20px ${NS_CYAN}40`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <p className="text-sm text-white/70">
                  Your child has completed <span className="font-bold" style={{ color: NS_LIME }}>{unlockedCount}</span> out of <span className="font-bold">{totalStages}</span> learning stages
                </p>
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {weeklyStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${stat.color}10`, border: `1px solid ${stat.color}30` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Learning Milestones */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen size={20} style={{ color: NS_LIME }} />
                  Learning Milestones
                </h3>
                <div className="space-y-3">
                  {learningMilestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.title}
                      className="p-4 rounded-xl flex items-center gap-4"
                      style={{
                        backgroundColor: milestone.completed 
                          ? `${NS_LIME}10` 
                          : 'rgba(255,255,255,0.05)',
                        border: milestone.completed 
                          ? `1px solid ${NS_LIME}30` 
                          : '1px solid rgba(255,255,255,0.1)'
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.completed ? 'bg-green-500/20' : 'bg-gray-500/20'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle size={24} className="text-green-500" />
                        ) : (
                          <Clock size={24} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white">{milestone.title}</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{
                            backgroundColor: milestone.completed ? `${NS_LIME}20` : 'rgba(255,255,255,0.1)',
                            color: milestone.completed ? NS_LIME : 'rgba(255,255,255,0.5)'
                          }}>
                            {milestone.date}
                          </span>
                        </div>
                        <p className="text-sm text-white/60">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills Developed */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Heart size={20} style={{ color: NS_PURPLE }} />
                  Skills Being Developed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsDeveloped.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: `${skill.color}10`, border: `1px solid ${skill.color}30` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{skill.name}</span>
                        <span className="text-sm font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tips for Parents */}
              <div className="p-6 rounded-2xl" style={{ backgroundColor: `${NS_GOLD}10`, border: `1px solid ${NS_GOLD}30` }}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award size={20} style={{ color: NS_GOLD }} />
                  Tips for Supporting Your Child
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: NS_GOLD }} />
                    <span>Celebrate small wins - every completed task is progress!</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: NS_GOLD }} />
                    <span>Ask about what they're building - curiosity encourages learning</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: NS_GOLD }} />
                    <span>Encourage regular practice - consistency beats intensity</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: NS_GOLD }} />
                    <span>Let them struggle a bit - problem-solving builds resilience</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
