import { motion } from 'framer-motion';
import { useState } from 'react';
import { STAGES } from '../data/stages';
import { CheckCircle, Lock, Star, X } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';

interface SkillTreeProps {
  unlockedCount: number;
  currentStage: number;
  onNodeClick: (index: number) => void;
  onClose: () => void;
}

interface SkillNode {
  id: string;
  title: string;
  stageIndex: number;
  x: number;
  y: number;
  parent?: string;
}

const SKILL_NODES: SkillNode[] = [
  { id: 'foundation', title: 'Foundation', stageIndex: 0, x: 50, y: 90 },
  { id: 'programming', title: 'Programming', stageIndex: 1, x: 30, y: 75, parent: 'foundation' },
  { id: 'frontend', title: 'Frontend', stageIndex: 2, x: 70, y: 75, parent: 'foundation' },
  { id: 'miniProjects', title: 'Mini Projects', stageIndex: 3, x: 50, y: 60, parent: 'programming' },
  { id: 'majorProjects', title: 'Major Projects', stageIndex: 4, x: 30, y: 45, parent: 'miniProjects' },
  { id: 'hackathons', title: 'Hackathons', stageIndex: 5, x: 70, y: 45, parent: 'frontend' },
  { id: 'openSource', title: 'Open Source', stageIndex: 6, x: 50, y: 30, parent: 'majorProjects' },
  { id: 'mockInterviews', title: 'Mock Interviews', stageIndex: 7, x: 30, y: 15, parent: 'openSource' },
  { id: 'placement', title: 'Placement', stageIndex: 8, x: 70, y: 15, parent: 'openSource' },
];

export default function SkillTree({ unlockedCount, currentStage, onNodeClick, onClose }: SkillTreeProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const isUnlocked = (stageIndex: number) => stageIndex < unlockedCount;
  const isCurrent = (stageIndex: number) => stageIndex === currentStage;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-white/10 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10 bg-black/20 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Skill Tree</h2>
              <p className="text-sm text-white/60">Your journey to becoming a developer</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors pointer-events-auto"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Skill Tree Visualization */}
        <div className="absolute inset-0 pt-20 pb-6 px-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connection Lines */}
            {SKILL_NODES.filter(node => node.parent).map(node => {
              const parent = SKILL_NODES.find(n => n.id === node.parent);
              if (!parent) return null;
              
              const isPathUnlocked = isUnlocked(parent.stageIndex);
              const isCurrentPath = isCurrent(node.stageIndex) || isCurrent(parent.stageIndex);
              
              return (
                <motion.line
                  key={`line-${node.id}`}
                  x1={`${parent.x}%`}
                  y1={`${parent.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={isPathUnlocked ? NS_LIME : isCurrentPath ? NS_CYAN : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isPathUnlocked ? 3 : isCurrentPath ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: node.stageIndex * 0.1 }}
                  style={{
                    strokeDasharray: isPathUnlocked ? 'none' : '5,5',
                  }}
                />
              );
            })}
          </svg>

          {/* Skill Nodes */}
          {SKILL_NODES.map((node, index) => {
            const unlocked = isUnlocked(node.stageIndex);
            const current = isCurrent(node.stageIndex);
            const stage = STAGES[node.stageIndex];

            return (
              <motion.button
                key={node.id}
                onClick={() => {
                  if (unlocked) {
                    onNodeClick(node.stageIndex);
                    setSelectedNode(node.id);
                  }
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: unlocked ? 1.1 : 1 }}
                whileTap={{ scale: unlocked ? 0.95 : 1 }}
              >
                {/* Node Circle */}
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: unlocked 
                      ? `${stage.color}20` 
                      : current 
                      ? `${stage.color}15` 
                      : 'rgba(255,255,255,0.05)',
                    border: `3px solid ${unlocked ? stage.color : current ? stage.color : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: unlocked 
                      ? `0 0 20px ${stage.color}40` 
                      : current 
                      ? `0 0 15px ${stage.color}30` 
                      : 'none',
                  }}
                >
                  {unlocked ? (
                    <CheckCircle size={24} style={{ color: stage.color }} />
                  ) : current ? (
                    <Star size={24} style={{ color: stage.color }} />
                  ) : (
                    <Lock size={20} className="text-white/30" />
                  )}
                </div>

                {/* Node Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs font-bold text-white/90 text-center">{node.title}</div>
                  {unlocked && (
                    <div className="text-[10px] text-white/50 text-center">+{stage.xp} XP</div>
                  )}
                </div>

                {/* XP Badge */}
                {unlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: NS_LIME }}
                  >
                    {stage.xp}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: NS_LIME }} />
            <span className="text-xs text-white/60">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: NS_CYAN }} />
            <span className="text-xs text-white/60">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs text-white/60">Locked</span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="absolute bottom-6 right-6 text-right">
          <div className="text-2xl font-bold" style={{ color: NS_LIME }}>{unlockedCount - 1}/{STAGES.length}</div>
          <div className="text-xs text-white/60">Stages Completed</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
