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
    skills: [
      { name: 'Internship', color: '#FFE840', shape: 'cube' },
      { name: 'Full-time', color: '#FFD700', shape: 'atom' },
      { name: 'Career', color: '#FFF080', shape: 'cloud' },
    ],
  },
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
