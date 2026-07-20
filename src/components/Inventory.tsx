import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Package, Award, FileText, X, FolderOpen, Clock, TrendingUp } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';
const NS_PURPLE = '#9B59B6';
const NS_GOLD = '#FFD700';

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'project' | 'badge' | 'certificate';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  dateEarned: string;
  category?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'todo_app',
    name: 'Todo App',
    description: 'A fully functional task management application',
    icon: '📋',
    type: 'project',
    rarity: 'common',
    dateEarned: '2024-01-15',
    category: 'Frontend',
    stats: [
      { label: 'Lines of Code', value: '450' },
      { label: 'Components', value: '8' }
    ]
  },
  {
    id: 'weather_app',
    name: 'Weather App',
    description: 'Real-time weather forecasting application',
    icon: '🌤️',
    type: 'project',
    rarity: 'common',
    dateEarned: '2024-01-20',
    category: 'Frontend',
    stats: [
      { label: 'API Calls', value: '3' },
      { label: 'Features', value: '5' }
    ]
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    description: 'Professional portfolio website',
    icon: '🎨',
    type: 'project',
    rarity: 'rare',
    dateEarned: '2024-02-01',
    category: 'Frontend',
    stats: [
      { label: 'Pages', value: '4' },
      { label: 'Animations', value: '12' }
    ]
  },
  {
    id: 'html_master',
    name: 'HTML Master Badge',
    description: 'Awarded for completing HTML fundamentals',
    icon: '🏅',
    type: 'badge',
    rarity: 'common',
    dateEarned: '2024-01-15',
    stats: [
      { label: 'Tasks Completed', value: '15' },
      { label: 'XP Earned', value: '50' }
    ]
  },
  {
    id: 'css_artist',
    name: 'CSS Artist Badge',
    description: 'Awarded for styling excellence',
    icon: '🎨',
    type: 'badge',
    rarity: 'rare',
    dateEarned: '2024-01-28',
    stats: [
      { label: 'Projects Styled', value: '10' },
      { label: 'XP Earned', value: '75' }
    ]
  },
  {
    id: 'js_ninja',
    name: 'JavaScript Ninja Badge',
    description: 'Awarded for JavaScript mastery',
    icon: '⚡',
    type: 'badge',
    rarity: 'epic',
    dateEarned: '2024-02-10',
    stats: [
      { label: 'Challenges', value: '25' },
      { label: 'XP Earned', value: '100' }
    ]
  },
  {
    id: 'frontend_cert',
    name: 'Frontend Development Certificate',
    description: 'Certified Frontend Developer',
    icon: '📜',
    type: 'certificate',
    rarity: 'rare',
    dateEarned: '2024-02-15',
    stats: [
      { label: 'Course Hours', value: '40' },
      { label: 'Projects', value: '5' }
    ]
  },
  {
    id: 'react_cert',
    name: 'React Developer Certificate',
    description: 'Certified React Developer',
    icon: '⚛️',
    type: 'certificate',
    rarity: 'epic',
    dateEarned: '2024-03-01',
    stats: [
      { label: 'Course Hours', value: '50' },
      { label: 'Components Built', value: '20' }
    ]
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

const TYPE_FILTERS = ['all', 'project', 'badge', 'certificate'] as const;

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Inventory({ isOpen, onClose }: InventoryProps) {
  const [selectedType, setSelectedType] = useState<typeof TYPE_FILTERS[number]>('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const filteredItems = selectedType === 'all' 
    ? INVENTORY_ITEMS 
    : INVENTORY_ITEMS.filter(item => item.type === selectedType);

  const projectCount = INVENTORY_ITEMS.filter(i => i.type === 'project').length;
  const badgeCount = INVENTORY_ITEMS.filter(i => i.type === 'badge').length;
  const certificateCount = INVENTORY_ITEMS.filter(i => i.type === 'certificate').length;

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
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Inventory</h2>
                  <p className="text-xs md:text-sm text-white/60">Your collection of projects, badges, and certificates</p>
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
                  <Package size={16} style={{ color: NS_CYAN }} />
                  <div>
                    <div className="text-sm md:text-lg font-bold text-white">{projectCount}</div>
                    <div className="text-[10px] md:text-xs text-white/50">Projects</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} style={{ color: NS_LIME }} />
                  <div>
                    <div className="text-sm md:text-lg font-bold text-white">{badgeCount}</div>
                    <div className="text-[10px] md:text-xs text-white/50">Badges</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} style={{ color: NS_PURPLE }} />
                  <div>
                    <div className="text-sm md:text-lg font-bold text-white">{certificateCount}</div>
                    <div className="text-[10px] md:text-xs text-white/50">Certificates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Type Filter */}
            <div className="absolute top-24 md:top-28 left-4 right-4 md:left-6 md:right-6 flex gap-2 flex-wrap z-10">
              {TYPE_FILTERS.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 ${
                    selectedType === type ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}
                  style={{
                    backgroundColor: selectedType === type ? `${NS_CYAN}30` : 'rgba(255,255,255,0.05)',
                    border: selectedType === type ? `1px solid ${NS_CYAN}` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {type === 'project' && <Package size={14} />}
                  {type === 'badge' && <Award size={14} />}
                  {type === 'certificate' && <FileText size={14} />}
                  {type === 'all' && <FolderOpen size={14} />}
                  {type}
                </button>
              ))}
            </div>

            {/* Inventory Grid */}
            <div className="absolute inset-0 top-36 md:top-40 bottom-6 left-0 right-0 px-4 md:px-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="relative aspect-square rounded-xl p-3 transition-all hover:scale-105 flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: `${RARITY_COLORS[item.rarity]}10`,
                      border: `2px solid ${RARITY_COLORS[item.rarity]}40`,
                      boxShadow: `0 0 20px ${RARITY_GLOW[item.rarity]}`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon */}
                    <div className="text-3xl mb-2">{item.icon}</div>

                    {/* Title */}
                    <div className="text-xs font-bold text-white/90 mb-1 text-center line-clamp-2 leading-tight">{item.name}</div>

                    {/* Type */}
                    <div className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium uppercase"
                      style={{
                        backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                        color: RARITY_COLORS[item.rarity]
                      }}
                    >
                      {item.type}
                    </div>

                    {/* Rarity badge */}
                    <div className="absolute top-2 right-2 text-[9px] font-bold uppercase" style={{ color: RARITY_COLORS[item.rarity] }}>
                      {item.rarity}
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: `0 0 30px ${RARITY_GLOW[item.rarity]}`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${RARITY_GLOW[item.rarity]}`,
                          `0 0 40px ${RARITY_GLOW[item.rarity]}`,
                          `0 0 20px ${RARITY_GLOW[item.rarity]}`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Item Detail Modal */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedItem(null)}
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
                      border: `2px solid ${RARITY_COLORS[selectedItem.rarity]}`,
                      boxShadow: `0 0 40px ${RARITY_GLOW[selectedItem.rarity]}`
                    }}>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <X size={16} className="text-white" />
                      </button>

                      <div className="text-center mb-6">
                        {/* Large Icon */}
                        <motion.div
                          className="text-6xl mb-4 inline-block"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {selectedItem.icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.name}</h3>

                        {/* Type & Rarity */}
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase"
                            style={{
                              backgroundColor: `${RARITY_COLORS[selectedItem.rarity]}20`,
                              color: RARITY_COLORS[selectedItem.rarity],
                              border: `1px solid ${RARITY_COLORS[selectedItem.rarity]}40`
                            }}
                          >
                            {selectedItem.type}
                          </div>
                          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase"
                            style={{
                              backgroundColor: `${RARITY_COLORS[selectedItem.rarity]}20`,
                              color: RARITY_COLORS[selectedItem.rarity],
                              border: `1px solid ${RARITY_COLORS[selectedItem.rarity]}40`
                            }}
                          >
                            {selectedItem.rarity}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm">{selectedItem.description}</p>
                      </div>

                      {/* Stats */}
                      {selectedItem.stats && (
                        <div className="space-y-3 mb-4">
                          {selectedItem.stats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                              <span className="text-sm text-white/70">{stat.label}</span>
                              <span className="text-sm font-bold text-white">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Date Earned */}
                      <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center gap-2">
                          <Clock size={16} style={{ color: NS_CYAN }} />
                          <span className="text-sm text-white/70">Earned</span>
                        </div>
                        <span className="text-sm font-bold text-white">{selectedItem.dateEarned}</span>
                      </div>

                      {/* Category */}
                      {selectedItem.category && (
                        <div className="flex items-center justify-between p-3 rounded-lg mt-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div className="flex items-center gap-2">
                            <TrendingUp size={16} style={{ color: NS_LIME }} />
                            <span className="text-sm text-white/70">Category</span>
                          </div>
                          <span className="text-sm font-bold text-white">{selectedItem.category}</span>
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
