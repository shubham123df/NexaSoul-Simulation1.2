import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Stage } from '../data/stages';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, AlertTriangle, ExternalLink, CheckCircle, XCircle, RotateCcw, Users, Target, Award, Star, Trophy } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';

interface StageDetailModalProps {
  stage: Stage;
  isOpen: boolean;
  onClose: () => void;
}

export default function StageDetailModal({ stage, isOpen, onClose }: StageDetailModalProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [completedObjectives, setCompletedObjectives] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    setFlipped(false);
  };

  const toggleTask = (taskIndex: number) => {
    setExpandedTask(expandedTask === taskIndex ? null : taskIndex);
  };

  const toggleTaskCompletion = (taskIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskIndex)) {
        newSet.delete(taskIndex);
      } else {
        newSet.add(taskIndex);
      }
      return newSet;
    });
  };

  const toggleObjective = (objectiveKey: string) => {
    setCompletedObjectives(prev => {
      const newSet = new Set(prev);
      if (newSet.has(objectiveKey)) {
        newSet.delete(objectiveKey);
      } else {
        newSet.add(objectiveKey);
      }
      return newSet;
    });
  };

  const handleQuizAnswer = (index: number) => {
    setQuizAnswer(index);
    setShowQuizExplanation(true);
  };

  const nextFlashcard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentFlashcard((prev) => (prev + 1) % (stage.flashcards?.length || 1));
    }, 300);
  };

  const prevFlashcard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentFlashcard((prev) => (prev - 1 + (stage.flashcards?.length || 1)) % (stage.flashcards?.length || 1));
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(6,13,26,0.92)', backdropFilter: 'blur(16px)' }}>
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(6,13,26,0.98), rgba(12,24,48,0.98))',
          border: `1px solid ${stage.accent}40`,
          boxShadow: `0 0 60px ${stage.accent}30, 0 0 120px ${stage.color}15`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b" style={{ borderColor: `${stage.accent}20`, background: 'rgba(6,13,26,0.95)' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: stage.accent, boxShadow: `0 0 8px ${stage.accent}` }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: stage.accent }}>
                  Level {stage.index + 1} · {stage.xp} XP
                </span>
              </div>
              <h2 className="text-3xl font-black mb-1" style={{ color: stage.accent, textShadow: `0 0 20px ${stage.accent}60` }}>
                {stage.title}
              </h2>
              <p className="text-sm text-white/60">{stage.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: `${stage.accent}20`, color: stage.accent }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Description */}
          <div className="rounded-xl p-4" style={{ backgroundColor: `${stage.accent}10`, border: `1px solid ${stage.accent}20` }}>
            <p className="text-white/80 leading-relaxed">{stage.description}</p>
          </div>

          {/* Key Concepts */}
          <ExpandableSection
            title="Key Concepts"
            icon={<BookOpen size={18} />}
            isExpanded={expandedSection === 'concepts'}
            onToggle={() => toggleSection('concepts')}
            accent={stage.accent}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stage.keyConcepts.map((concept, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: `${stage.accent}08` }}>
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: stage.accent }} />
                  <span className="text-sm text-white/70">{concept}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Examples */}
          <ExpandableSection
            title="Practical Examples"
            icon={<Lightbulb size={18} />}
            isExpanded={expandedSection === 'examples'}
            onToggle={() => toggleSection('examples')}
            accent={stage.accent}
          >
            <div className="space-y-3">
              {stage.examples.map((example, idx) => (
                <div key={idx} className="p-3 rounded-lg border-l-4" style={{ backgroundColor: `${stage.accent}08`, borderColor: stage.accent }}>
                  <p className="text-sm text-white/70">{example}</p>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Tips */}
          <ExpandableSection
            title="Tips & Best Practices"
            icon={<CheckCircle size={18} />}
            isExpanded={expandedSection === 'tips'}
            onToggle={() => toggleSection('tips')}
            accent={NS_LIME}
          >
            <div className="space-y-2">
              {stage.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: `${NS_LIME}08` }}>
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: NS_LIME }} />
                  <span className="text-sm text-white/70">{tip}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Common Mistakes */}
          <ExpandableSection
            title="Common Mistakes to Avoid"
            icon={<AlertTriangle size={18} />}
            isExpanded={expandedSection === 'mistakes'}
            onToggle={() => toggleSection('mistakes')}
            accent="#FF5E3A"
          >
            <div className="space-y-2">
              {stage.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,94,58,0.08)' }}>
                  <XCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#FF5E3A' }} />
                  <span className="text-sm text-white/70">{mistake}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Resources */}
          <ExpandableSection
            title="Learning Resources"
            icon={<ExternalLink size={18} />}
            isExpanded={expandedSection === 'resources'}
            onToggle={() => toggleSection('resources')}
            accent={stage.accent}
          >
            <div className="space-y-2">
              {stage.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: `${stage.accent}08`, border: `1px solid ${stage.accent}20` }}
                >
                  <ExternalLink size={16} style={{ color: stage.accent }} />
                  <span className="text-sm text-white/70">{resource.title}</span>
                </a>
              ))}
            </div>
          </ExpandableSection>

          {/* Active Mission */}
          <ExpandableSection
            title="Active Mission"
            icon={<Trophy size={18} />}
            isExpanded={expandedSection === 'mission'}
            onToggle={() => toggleSection('mission')}
            accent={stage.accent}
          >
            <div className="p-4 rounded-xl" style={{ backgroundColor: `${stage.accent}10`, border: `1px solid ${stage.accent}30` }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stage.accent}20` }}>
                  <Star size={20} style={{ color: stage.accent }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{stage.missions[0]?.title || 'Build Your Portfolio'}</h3>
                  <p className="text-xs text-white/60">Complete all objectives to earn rewards</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { key: 'obj1', text: 'Complete learning tasks' },
                  { key: 'obj2', text: 'Pass the knowledge quiz' },
                  { key: 'obj3', text: 'Review all flashcards' },
                  { key: 'obj4', text: 'Explore resources' }
                ].map((obj) => (
                  <button
                    key={obj.key}
                    onClick={() => toggleObjective(obj.key)}
                    className="w-full p-2 rounded-lg flex items-center gap-2 transition-all hover:bg-white/5"
                    style={{ backgroundColor: completedObjectives.has(obj.key) ? `${NS_LIME}15` : 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ 
                      backgroundColor: completedObjectives.has(obj.key) ? NS_LIME : 'rgba(255,255,255,0.1)',
                      border: `1px solid ${completedObjectives.has(obj.key) ? NS_LIME : 'rgba(255,255,255,0.2)'}`
                    }}>
                      {completedObjectives.has(obj.key) && <CheckCircle size={12} style={{ color: 'white' }} />}
                    </div>
                    <span className={`text-sm ${completedObjectives.has(obj.key) ? 'text-white/50 line-through' : 'text-white/80'}`}>{obj.text}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <Award size={16} style={{ color: stage.accent }} />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: stage.accent }}>Reward</div>
                    <div className="text-xs text-white/70">+{stage.xp} XP • {stage.missions[0]?.badge || 'Badge'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/50">Progress</div>
                  <div className="text-sm font-bold" style={{ color: NS_LIME }}>{Math.round((completedObjectives.size / 4) * 100)}%</div>
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Learning Tasks */}
          <ExpandableSection
            title="Learning Tasks"
            icon={<Target size={18} />}
            isExpanded={expandedSection === 'tasks'}
            onToggle={() => toggleSection('tasks')}
            accent={NS_LIME}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span>Progress: {completedTasks.size} / {stage.tasks.length} completed</span>
                <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${(completedTasks.size / stage.tasks.length) * 100}%`,
                      backgroundColor: NS_LIME,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedTasks.size / stage.tasks.length) * 100}%` }}
                  />
                </div>
              </div>
              {stage.tasks.map((task, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${NS_LIME}30`, backgroundColor: completedTasks.has(idx) ? `${NS_LIME}15` : `${NS_LIME}05` }}>
                  <button
                    onClick={() => toggleTask(idx)}
                    className="w-full p-3 flex items-center justify-between transition-all hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleTaskCompletion(idx, e)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                          backgroundColor: completedTasks.has(idx) ? NS_LIME : `${NS_LIME}20`,
                          border: `1px solid ${NS_LIME}40`
                        }}
                      >
                        {completedTasks.has(idx) && <CheckCircle size={14} style={{ color: 'white' }} />}
                      </button>
                      <span className={`text-sm font-semibold ${completedTasks.has(idx) ? 'text-white/50 line-through' : 'text-white/90'}`}>{task.title}</span>
                    </div>
                    {expandedTask === idx ? <ChevronUp size={16} style={{ color: NS_LIME }} /> : <ChevronDown size={16} style={{ color: NS_LIME }} />}
                  </button>
                  <AnimatePresence>
                    {expandedTask === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 space-y-3">
                          <p className="text-xs text-white/60">{task.description}</p>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: NS_LIME }}>What You'll Learn</div>
                            <div className="space-y-1">
                              {task.learningOutcomes.map((outcome, oIdx) => (
                                <div key={oIdx} className="flex items-start gap-2">
                                  <CheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: NS_LIME }} />
                                  <span className="text-xs text-white/70">{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${stage.accent}10`, border: `1px solid ${stage.accent}30` }}>
                            <div className="flex items-start gap-2">
                              <Award size={14} style={{ color: stage.accent }} />
                              <div>
                                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: stage.accent }}>NexaSoul Benefit</div>
                                <p className="text-xs text-white/70">{task.nexaSoulBenefit}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* NexaSoul Value */}
          <ExpandableSection
            title="NexaSoul Value"
            icon={<Award size={18} />}
            isExpanded={expandedSection === 'nexasoul'}
            onToggle={() => toggleSection('nexasoul')}
            accent={stage.accent}
          >
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${stage.accent}10`, border: `1px solid ${stage.accent}30` }}>
              <p className="text-sm text-white/80 leading-relaxed">{stage.nexaSoulValue}</p>
            </div>
          </ExpandableSection>

          {/* Community Support */}
          <ExpandableSection
            title="Community Support"
            icon={<Users size={18} />}
            isExpanded={expandedSection === 'community'}
            onToggle={() => toggleSection('community')}
            accent={NS_CYAN}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {stage.communitySupport.map((support, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: `${NS_CYAN}08` }}>
                  <Users size={14} style={{ color: NS_CYAN }} />
                  <span className="text-xs text-white/70">{support}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {/* Quiz */}
          {stage.quiz && (() => {
            const quiz = stage.quiz;
            return (
              <ExpandableSection
                title="Test Your Knowledge"
                icon={<Lightbulb size={18} />}
                isExpanded={expandedSection === 'quiz'}
                onToggle={() => toggleSection('quiz')}
                accent={NS_CYAN}
              >
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${NS_CYAN}10`, border: `1px solid ${NS_CYAN}30` }}>
                  <p className="text-lg font-semibold mb-4 text-white/90">{quiz.question}</p>
                  <div className="space-y-2 mb-4">
                    {quiz.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizAnswer !== null}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          quizAnswer === null
                            ? 'hover:scale-[1.01]'
                            : quizAnswer === idx
                            ? idx === quiz.correctAnswer
                              ? 'ring-2'
                              : 'opacity-50'
                            : idx === quiz.correctAnswer
                            ? 'ring-2'
                            : 'opacity-50'
                        }`}
                        style={{
                          backgroundColor: quizAnswer === null ? `${NS_CYAN}15` : `${NS_CYAN}10`,
                          borderColor: quizAnswer === idx ? (idx === quiz.correctAnswer ? NS_LIME : '#FF5E3A') : `${NS_CYAN}30`,
                          borderWidth: '1px',
                          color: quizAnswer === idx ? (idx === quiz.correctAnswer ? NS_LIME : '#FF5E3A') : 'white',
                        }}
                      >
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                  {showQuizExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: quizAnswer === quiz.correctAnswer ? `${NS_LIME}15` : 'rgba(255,94,58,0.15)' }}
                    >
                      <p className="text-sm text-white/70">{quiz.explanation}</p>
                    </motion.div>
                  )}
                </div>
              </ExpandableSection>
            );
          })()}

          {/* Flashcards */}
          {stage.flashcards && stage.flashcards.length > 0 && (
            <ExpandableSection
              title="Flashcards"
              icon={<RotateCcw size={18} />}
              isExpanded={expandedSection === 'flashcards'}
              onToggle={() => toggleSection('flashcards')}
              accent={NS_LIME}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-full h-48 rounded-xl cursor-pointer relative perspective-1000"
                  style={{ backgroundColor: `${NS_LIME}10`, border: `1px solid ${NS_LIME}30` }}
                  onClick={() => setFlipped(!flipped)}
                >
                  <motion.div
                    className="w-full h-full p-6 flex items-center justify-center text-center"
                    initial={false}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div style={{ backfaceVisibility: 'hidden' }}>
                      <p className="text-lg font-semibold text-white/90">{stage.flashcards[currentFlashcard].front}</p>
                    </div>
                  </motion.div>
                  {flipped && (
                    <motion.div
                      className="absolute inset-0 p-6 flex items-center justify-center text-center rounded-xl"
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ backgroundColor: `${NS_LIME}20`, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                    >
                      <p className="text-lg text-white/90">{stage.flashcards[currentFlashcard].back}</p>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={prevFlashcard}
                    className="p-2 rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: `${NS_LIME}20`, color: NS_LIME }}
                  >
                    <ChevronUp size={20} />
                  </button>
                  <span className="text-xs text-white/50">
                    {currentFlashcard + 1} / {stage.flashcards.length}
                  </span>
                  <button
                    onClick={nextFlashcard}
                    className="p-2 rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: `${NS_LIME}20`, color: NS_LIME }}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </ExpandableSection>
          )}
        </div>
      </motion.div>
    </div>
  );
}

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  accent: string;
  children: React.ReactNode;
}

function ExpandableSection({ title, icon, isExpanded, onToggle, accent, children }: ExpandableSectionProps) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${accent}30`, backgroundColor: `${accent}05` }}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between transition-all hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div style={{ color: accent }}>{icon}</div>
          <span className="font-semibold text-white/90">{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={18} style={{ color: accent }} /> : <ChevronDown size={18} style={{ color: accent }} />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
