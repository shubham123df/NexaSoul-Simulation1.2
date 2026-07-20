import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Building2, Users, Code, Trophy, Zap, ChevronRight, X } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_PURPLE = '#9B59B6';
const NS_GOLD = '#FFD700';

interface Building {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
  stats: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  description: string;
}

const BUILDINGS: Building[] = [
  {
    id: 'frontend',
    name: 'Frontend Tower',
    icon: <Code size={24} />,
    color: NS_CYAN,
    x: 20,
    y: 30,
    stats: [
      { label: 'Projects', value: '45+', trend: 'up' },
      { label: 'Members', value: '120+', trend: 'up' },
      { label: 'Technologies', value: '12', trend: 'stable' }
    ],
    description: 'Where beautiful interfaces come to life. React, Vue, and modern CSS mastery.'
  },
  {
    id: 'backend',
    name: 'Backend Hub',
    icon: <Building2 size={24} />,
    color: NS_LIME,
    x: 50,
    y: 20,
    stats: [
      { label: 'APIs Built', value: '30+', trend: 'up' },
      { label: 'Databases', value: '8', trend: 'stable' },
      { label: 'Servers', value: '15', trend: 'up' }
    ],
    description: 'Powerful servers and databases. Node.js, Python, and cloud infrastructure.'
  },
  {
    id: 'ai',
    name: 'AI Research Lab',
    icon: <Zap size={24} />,
    color: NS_PURPLE,
    x: 80,
    y: 35,
    stats: [
      { label: 'Models', value: '18', trend: 'up' },
      { label: 'Experiments', value: '45+', trend: 'up' },
      { label: 'Papers', value: '5', trend: 'stable' }
    ],
    description: 'Cutting-edge artificial intelligence and machine learning research center.'
  },
  {
    id: 'hackathons',
    name: 'Hackathon Arena',
    icon: <Trophy size={24} />,
    color: NS_GOLD,
    x: 35,
    y: 70,
    stats: [
      { label: 'Events', value: '12', trend: 'up' },
      { label: 'Winners', value: '35', trend: 'up' },
      { label: 'Prizes', value: '₹2L+', trend: 'up' }
    ],
    description: 'Where innovation meets competition. 24-hour coding challenges and team building.'
  },
  {
    id: 'community',
    name: 'Community HQ',
    icon: <Users size={24} />,
    color: '#FF5E3A',
    x: 65,
    y: 75,
    stats: [
      { label: 'Members', value: '500+', trend: 'up' },
      { label: 'Events', value: '40+', trend: 'up' },
      { label: 'Mentors', value: '25', trend: 'stable' }
    ],
    description: 'The heart of NexaSoul. Networking, mentorship, and collaboration.'
  }
];

interface InteractiveCityProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveCity({ isOpen, onClose }: InteractiveCityProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

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
            className="relative w-full max-w-6xl h-[85vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-white/10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10 bg-black/20 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">NexaSoul City</h2>
                  <p className="text-sm text-white/60">Explore our interactive campus</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* City Map */}
            <div className="absolute inset-0 pt-20 pb-6 px-6">
              <div className="relative w-full h-full bg-gradient-to-b from-slate-800/30 to-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />

                {/* Buildings */}
                {BUILDINGS.map((building, index) => (
                  <motion.button
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${building.x}%`, top: `${building.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Building */}
                    <div
                      className="relative w-20 h-20 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: `${building.color}15`,
                        border: `3px solid ${building.color}`,
                        boxShadow: `0 0 30px ${building.color}30`
                      }}
                    >
                      <div style={{ color: building.color }}>
                        {building.icon}
                      </div>
                      
                      {/* Animated glow */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: `0 0 20px ${building.color}40`
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${building.color}40`,
                            `0 0 40px ${building.color}60`,
                            `0 0 20px ${building.color}40`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Building label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-xs font-bold text-white/90 text-center">{building.name}</div>
                    </div>

                    {/* Live indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: building.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.button>
                ))}

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {BUILDINGS.slice(0, -1).map((building, i) => {
                    const nextBuilding = BUILDINGS[i + 1];
                    return (
                      <motion.line
                        key={`line-${building.id}-${nextBuilding.id}`}
                        x1={`${building.x}%`}
                        y1={`${building.y}%`}
                        x2={`${nextBuilding.x}%`}
                        y2={`${nextBuilding.y}%`}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Building Detail Panel */}
            <AnimatePresence>
              {selectedBuilding && (
                <motion.div
                  className="absolute right-0 top-20 bottom-6 w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto"
                  initial={{ x: 320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 320, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25 }}
                >
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-white" />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${selectedBuilding.color}20`, border: `2px solid ${selectedBuilding.color}` }}>
                      <div style={{ color: selectedBuilding.color }}>
                        {selectedBuilding.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedBuilding.name}</h3>
                      <div className="text-xs" style={{ color: selectedBuilding.color }}>Live Stats</div>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-6">{selectedBuilding.description}</p>

                  <div className="space-y-3">
                    {selectedBuilding.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white/60">{stat.label}</span>
                          <div className="flex items-center gap-1">
                            {stat.trend === 'up' && <motion.div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: NS_LIME }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />}
                            <span className="text-sm font-bold text-white">{stat.value}</span>
                          </div>
                        </div>
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: selectedBuilding.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.random() * 30 + 70}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className="w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                    style={{ backgroundColor: `${selectedBuilding.color}20`, border: `1px solid ${selectedBuilding.color}40`, color: selectedBuilding.color }}
                    whileHover={{ backgroundColor: `${selectedBuilding.color}30` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Building
                    <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* City Stats Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/20">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: NS_CYAN }}>500+</div>
                  <div className="text-xs text-white/50">Total Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: NS_LIME }}>120+</div>
                  <div className="text-xs text-white/50">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: NS_PURPLE }}>40+</div>
                  <div className="text-xs text-white/50">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: NS_GOLD }}>12</div>
                  <div className="text-xs text-white/50">Hackathons</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
