// NexaSoul brand: cyan #00C8FF, lime-green #7EC820, dark navy bg #060D1A

export type StageTheme =
  | 'foundation'
  | 'programming'
  | 'frontend'
  | 'miniProjects'
  | 'majorProjects'
  | 'hackathons'
  | 'openSource'
  | 'mockInterviews'
  | 'placement';

export interface Skill {
  name: string;
  color: string;
  shape: 'cube' | 'crystal' | 'lightning' | 'atom' | 'repo' | 'tree' | 'serpent' | 'brain' | 'cloud';
}

export interface Mission {
  title: string;
  reward: string;
  badge: string;
  next: string;
}

export interface Stage {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  theme: StageTheme;
  color: string;
  accent: string;
  skills: Skill[];
  parentLabel: string;
  xp: number;
  missions: Mission[];
}

export const STAGES: Stage[] = [
  {
    id: 'foundation',
    index: 0,
    title: 'Foundation',
    subtitle: 'The journey begins',
    theme: 'foundation',
    color: '#00C8FF',
    accent: '#33D4FF',
    parentLabel: 'Curiosity sparks',
    xp: 100,
    missions: [
      { title: 'Build Your First Website', reward: '+100 XP', badge: 'HTML Explorer', next: 'Deploy Website' },
      { title: 'Learn The Basics', reward: '+75 XP', badge: 'Logic Builder', next: 'Create Your First Page' },
      { title: 'Join Your First Club', reward: '+50 XP', badge: 'Community Spark', next: 'Find Your Crew' },
    ],
    skills: [
      { name: 'Logic', color: '#33D4FF', shape: 'cube' },
      { name: 'Problem Solving', color: '#00C8FF', shape: 'crystal' },
      { name: 'Mindset', color: '#7ADEFD', shape: 'atom' },
    ],
  },
  {
    id: 'programming',
    index: 1,
    title: 'Programming',
    subtitle: 'Code becomes language',
    theme: 'programming',
    color: '#7EC820',
    accent: '#9ED840',
    parentLabel: 'Learning begins',
    xp: 250,
    missions: [
      { title: 'Solve Your First DSA Problem', reward: '+120 XP', badge: 'Logic Forge', next: 'Write Clean Code' },
      { title: 'Ship A Small Script', reward: '+90 XP', badge: 'Python Pilot', next: 'Automate A Task' },
      { title: 'Read One Open Source Repo', reward: '+80 XP', badge: 'Repo Scout', next: 'Ask Better Questions' },
    ],
    skills: [
      { name: 'Python', color: '#9ED840', shape: 'serpent' },
      { name: 'DSA', color: '#7EC820', shape: 'tree' },
      { name: 'C++', color: '#BBEE66', shape: 'cube' },
    ],
  },
  {
    id: 'frontend',
    index: 2,
    title: 'Frontend Dev',
    subtitle: 'Worlds take shape',
    theme: 'frontend',
    color: '#00C8FF',
    accent: '#44DDFF',
    parentLabel: 'Building skills',
    xp: 450,
    missions: [
      { title: 'Create A Landing Page', reward: '+140 XP', badge: 'UI Builder', next: 'Style With CSS' },
      { title: 'Animate A Component', reward: '+110 XP', badge: 'Motion Artist', next: 'Polish Interaction' },
      { title: 'Connect A UI To Data', reward: '+100 XP', badge: 'React Builder', next: 'Build With Purpose' },
    ],
    skills: [
      { name: 'HTML', color: '#FF7B40', shape: 'cube' },
      { name: 'CSS', color: '#00C8FF', shape: 'crystal' },
      { name: 'JavaScript', color: '#FFD700', shape: 'lightning' },
      { name: 'React', color: '#00C8FF', shape: 'atom' },
    ],
  },
  {
    id: 'miniProjects',
    index: 3,
    title: 'Mini Projects',
    subtitle: 'Ideas become real',
    theme: 'miniProjects',
    color: '#7EC820',
    accent: '#A8E040',
    parentLabel: 'Confidence grows',
    xp: 700,
    missions: [
      { title: 'Build A Clone Project', reward: '+150 XP', badge: 'Clone Architect', next: 'Recreate A Popular UI' },
      { title: 'Ship A Personal API App', reward: '+130 XP', badge: 'API Explorer', next: 'Connect Real Data' },
      { title: 'Publish Your Portfolio', reward: '+120 XP', badge: 'Portfolio Builder', next: 'Show Your Work' },
    ],
    skills: [
      { name: 'UI Clone', color: '#A8E040', shape: 'cube' },
      { name: 'API App', color: '#7EC820', shape: 'atom' },
      { name: 'Portfolio', color: '#C4F060', shape: 'crystal' },
    ],
  },
  {
    id: 'majorProjects',
    index: 4,
    title: 'Major Projects',
    subtitle: 'Architecture emerges',
    theme: 'majorProjects',
    color: '#00C8FF',
    accent: '#00E5FF',
    parentLabel: 'Real building',
    xp: 1050,
    missions: [
      { title: 'Launch A Full Stack App', reward: '+180 XP', badge: 'System Builder', next: 'Deploy To Production' },
      { title: 'Train A Simple AI Model', reward: '+160 XP', badge: 'AI Explorer', next: 'Measure Impact' },
      { title: 'Deploy On The Cloud', reward: '+140 XP', badge: 'Cloud Navigator', next: 'Scale Your Build' },
    ],
    skills: [
      { name: 'Full Stack', color: '#00E5FF', shape: 'atom' },
      { name: 'AI / ML', color: '#7EC820', shape: 'brain' },
      { name: 'Cloud', color: '#00C8FF', shape: 'cloud' },
    ],
  },
  {
    id: 'hackathons',
    index: 5,
    title: 'Hackathons',
    subtitle: 'Pressure forges steel',
    theme: 'hackathons',
    color: '#FF5E3A',
    accent: '#FF7A5A',
    parentLabel: 'Testing limits',
    xp: 1400,
    missions: [
      { title: 'Join A 24 Hour Build', reward: '+200 XP', badge: 'Problem Solver', next: 'Pitch Your Idea' },
      { title: 'Lead A Team Sprint', reward: '+170 XP', badge: 'Team Captain', next: 'Coordinate Delivery' },
      { title: 'Ship Fast Under Pressure', reward: '+150 XP', badge: 'Execution Engine', next: 'Present With Confidence' },
    ],
    skills: [
      { name: 'Team Build', color: '#FF7A5A', shape: 'atom' },
      { name: 'Pitch', color: '#FF5E3A', shape: 'lightning' },
      { name: 'Ship Fast', color: '#FFB0A0', shape: 'cube' },
    ],
  },
  {
    id: 'openSource',
    index: 6,
    title: 'Open Source',
    subtitle: 'Join the global code',
    theme: 'openSource',
    color: '#7EC820',
    accent: '#B0E840',
    parentLabel: 'Giving back',
    xp: 1800,
    missions: [
      { title: 'Open A Pull Request', reward: '+160 XP', badge: 'Contributor', next: 'Review A Repo' },
      { title: 'Fix A Small Bug', reward: '+140 XP', badge: 'Debugger', next: 'Write Clear Notes' },
      { title: 'Support A Community Thread', reward: '+120 XP', badge: 'Community Builder', next: 'Help A New Learner' },
    ],
    skills: [
      { name: 'Git', color: '#B0E840', shape: 'repo' },
      { name: 'PRs', color: '#7EC820', shape: 'cube' },
      { name: 'Community', color: '#D0F870', shape: 'atom' },
    ],
  },
  {
    id: 'mockInterviews',
    index: 7,
    title: 'Mock Interviews',
    subtitle: 'Sharpen the edge',
    theme: 'mockInterviews',
    color: '#00C8FF',
    accent: '#66DDFF',
    parentLabel: 'Refining talent',
    xp: 2300,
    missions: [
      { title: 'Practice A Mock Interview', reward: '+180 XP', badge: 'Confidence Builder', next: 'Answer With Clarity' },
      { title: 'Explain A System Design Flow', reward: '+170 XP', badge: 'Architect', next: 'Break Down Tradeoffs' },
      { title: 'Refine Your Storytelling', reward: '+140 XP', badge: 'Communicator', next: 'Own Your Wins' },
    ],
    skills: [
      { name: 'System Design', color: '#66DDFF', shape: 'tree' },
      { name: 'Communication', color: '#00C8FF', shape: 'atom' },
      { name: 'Confidence', color: '#99EEFF', shape: 'lightning' },
    ],
  },
  {
    id: 'placement',
    index: 8,
    title: 'Placement',
    subtitle: 'Industry ready',
    theme: 'placement',
    color: '#FFD700',
    accent: '#FFE840',
    parentLabel: 'Goal achieved',
    xp: 3000,
    missions: [
      { title: 'Get Your First Internship', reward: '+220 XP', badge: 'Future Intern', next: 'Convert To Full Time' },
      { title: 'Master Your Resume Story', reward: '+160 XP', badge: 'Career Narrator', next: 'Ace The Interview' },
      { title: 'Lead A Real Product Sprint', reward: '+200 XP', badge: 'Industry Ready', next: 'Launch With Impact' },
    ],
    skills: [
      { name: 'Internship', color: '#FFE840', shape: 'cube' },
      { name: 'Full-time', color: '#FFD700', shape: 'atom' },
      { name: 'Career', color: '#FFF080', shape: 'cloud' },
    ],
  },
];

export const YEAR_PROGRESSIONS = [
  { year: 1, title: 'Foundation Valley', accent: '#00C8FF', places: ['Foundation Valley', 'Builder City', 'Hackathon Arena'] },
  { year: 2, title: 'Full Stack City', accent: '#7EC820', places: ['Full Stack City', 'Open Source Planet', 'Cloud Systems'] },
  { year: 3, title: 'AI Research Lab', accent: '#00E5FF', places: ['AI Research Lab', 'Real Product Factory', 'Startup Zone'] },
  { year: 4, title: 'Leadership Tower', accent: '#FF7A5A', places: ['Leadership Tower', 'Community Headquarters', 'National Network'] },
  { year: 5, title: 'Legacy Citadel', accent: '#FFD700', places: ['Legacy Citadel', 'Innovation Hub', 'Global Impact Portal'] },
];

export const WEEKLY_JOURNEY = [
  { day: 'Monday', stage: 'Programming', color: '#00C8FF' },
  { day: 'Tuesday', stage: 'DSA', color: '#7EC820' },
  { day: 'Wednesday', stage: 'Projects', color: '#00E5FF' },
  { day: 'Thursday', stage: 'Mentorship', color: '#9ED840' },
  { day: 'Friday', stage: 'Hackathon', color: '#FF5E3A' },
  { day: 'Saturday', stage: 'Community', color: '#7EC820' },
  { day: 'Sunday', stage: 'Reflection', color: '#FFD700' },
];

export const PARENT_FLOW = [
  { label: 'Student', icon: 'user', color: '#00C8FF' },
  { label: 'Learning', icon: 'book', color: '#7EC820' },
  { label: 'Building', icon: 'hammer', color: '#00E5FF' },
  { label: 'Confidence', icon: 'shield', color: '#9ED840' },
  { label: 'Leadership', icon: 'crown', color: '#FF5E3A' },
  { label: 'Placement', icon: 'briefcase', color: '#FFD700' },
];

// Orb evolution: cyan → lime → bright cyan → lime → golden → radiant white-gold
export const ORB_COLORS = [
  '#00C8FF',
  '#7EC820',
  '#00E5FF',
  '#9ED840',
  '#FFD700',
  '#FFFFFF',
];
