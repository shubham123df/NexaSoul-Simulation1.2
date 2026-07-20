import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';

const NS_CYAN = '#00C8FF';
const NS_LIME = '#7EC820';

interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  dialogues: {
    greeting: string;
    mission: string;
    tip: string;
    encouragement: string;
  };
}

const MENTORS: Record<string, Mentor> = {
  html: {
    id: 'html',
    name: 'Code Mentor',
    role: 'HTML Expert',
    avatar: '👨‍💻',
    color: NS_CYAN,
    dialogues: {
      greeting: "Hello Builder! I'm here to help you master HTML. Let's build the foundation of the web together!",
      mission: "Your mission: Create your first webpage. Start with the structure, then add content.",
      tip: "Remember: HTML is about structure. Use semantic tags like <header>, <main>, and <footer> for better accessibility.",
      encouragement: "You're doing great! Every line of code you write is a step toward becoming a developer."
    }
  },
  css: {
    id: 'css',
    name: 'Design Mentor',
    role: 'CSS Expert',
    avatar: '🎨',
    color: NS_LIME,
    dialogues: {
      greeting: "Welcome! I'll help you make your webpages beautiful. CSS is where creativity meets code!",
      mission: "Your mission: Style your webpage with colors, fonts, and layouts. Make it visually stunning!",
      tip: "Use CSS Grid and Flexbox for modern layouts. They're powerful and responsive!",
      encouragement: "Great work on the styling! Your designs are getting better with each project."
    }
  },
  javascript: {
    id: 'javascript',
    name: 'Logic Mentor',
    role: 'JavaScript Expert',
    avatar: '⚡',
    color: '#FFD700',
    dialogues: {
      greeting: "Hey there! I'm your JavaScript mentor. Let's add interactivity to your websites!",
      mission: "Your mission: Make your webpage interactive. Handle events, manipulate the DOM, and create dynamic content.",
      tip: "Start with the basics: variables, functions, and event listeners. Then move to more complex concepts.",
      encouragement: "You're thinking like a programmer now! Keep pushing your limits."
    }
  },
  react: {
    id: 'react',
    name: 'Framework Mentor',
    role: 'React Expert',
    avatar: '⚛️',
    color: '#61DAFB',
    dialogues: {
      greeting: "Hello! I'll guide you through React. It's a powerful library for building user interfaces!",
      mission: "Your mission: Build a React component. Learn about props, state, and component lifecycle.",
      tip: "Think in components. Break your UI into reusable pieces. It makes your code cleaner and more maintainable.",
      encouragement: "You're becoming a React developer! Your component architecture is impressive."
    }
  }
};

interface MentorDialogProps {
  mentorId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MentorDialog({ mentorId, isOpen, onClose }: MentorDialogProps) {
  const [currentDialogue, setCurrentDialogue] = useState<keyof Mentor['dialogues']>('greeting');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const mentor = mentorId ? MENTORS[mentorId] : null;

  const dialogues = [
    { key: 'greeting' as const, label: 'Greeting' },
    { key: 'mission' as const, label: 'Mission' },
    { key: 'tip' as const, label: 'Tip' },
    { key: 'encouragement' as const, label: 'Encouragement' }
  ];

  const nextDialogue = () => {
    const currentIndex = dialogues.findIndex(d => d.key === currentDialogue);
    const nextIndex = (currentIndex + 1) % dialogues.length;
    setCurrentDialogue(dialogues[nextIndex].key);
  };

  if (!mentor || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Box */}
            <div className="rounded-2xl overflow-hidden" style={{ 
              background: 'linear-gradient(135deg, rgba(6,13,26,0.95) 0%, rgba(10,20,40,0.95) 100%)',
              border: `2px solid ${mentor.color}40`,
              boxShadow: `0 0 40px ${mentor.color}20`
            }}>
              {/* Header */}
              <div className="p-4 border-b border-white/10" style={{ backgroundColor: `${mentor.color}10` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${mentor.color}20`, border: `2px solid ${mentor.color}` }}
                    >
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                      <p className="text-xs" style={{ color: mentor.color }}>{mentor.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MessageCircle size={20} style={{ color: mentor.color }} className="flex-shrink-0 mt-1" />
                  <motion.p
                    key={currentDialogue}
                    className="text-white/90 leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mentor.dialogues[currentDialogue]}
                  </motion.p>
                </div>

                {/* Dialogue Navigation */}
                <div className="flex gap-2 mt-6">
                  {dialogues.map((dialogue, idx) => (
                    <button
                      key={dialogue.key}
                      onClick={() => setCurrentDialogue(dialogue.key)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        currentDialogue === dialogue.key
                          ? 'text-white'
                          : 'text-white/50 hover:text-white/70'
                      }`}
                      style={{
                        backgroundColor: currentDialogue === dialogue.key ? `${mentor.color}30` : 'rgba(255,255,255,0.05)',
                        border: currentDialogue === dialogue.key ? `1px solid ${mentor.color}` : '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      {dialogue.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} style={{ color: mentor.color }} />
                  <span className="text-xs text-white/50">NexaSoul Mentor</span>
                </div>
                <button
                  onClick={nextDialogue}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: `${mentor.color}20`, border: `1px solid ${mentor.color}40`, color: mentor.color }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
