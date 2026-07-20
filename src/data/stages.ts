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
  shape: 'cube' | 'crystal' | 'lightning' | 'Atom' | 'repo' | 'tree' | 'serpent' | 'brain' | 'cloud';
}

export interface Mission {
  title: string;
  reward: string;
  badge: string;
  next: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
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
  // Enhanced learning content
  description: string;
  keyConcepts: string[];
  examples: string[];
  tips: string[];
  commonMistakes: string[];
  resources: { title: string; url: string }[];
  quiz?: Quiz;
  flashcards?: Flashcard[];
  // Detailed task breakdowns
  tasks: {
    title: string;
    description: string;
    learningOutcomes: string[];
    nexaSoulBenefit: string;
    completed?: boolean;
  }[];
  // NexaSoul-specific information
  nexaSoulValue: string;
  communitySupport: string[];
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
      { name: 'Mindset', color: '#7ADEFD', shape: 'Atom' },
    ],
    description: 'Every great developer starts with a strong foundation. This stage introduces you to the fundamental concepts of programming, web development, and computational thinking.',
    keyConcepts: [
      'HTML structure and semantic markup',
      'CSS styling and layout principles',
      'Basic programming logic and algorithms',
      'Problem-solving methodologies',
      'Growth mindset for learning'
    ],
    examples: [
      'Creating a simple HTML page with headings, paragraphs, and links',
      'Using CSS to style text, add colors, and create layouts',
      'Writing your first JavaScript function to handle user interactions',
      'Breaking down a complex problem into smaller, manageable steps'
    ],
    tips: [
      'Start with small projects and gradually increase complexity',
      'Practice daily - consistency beats intensity',
      'Read documentation and learn to search for solutions effectively',
      'Join coding communities to learn from others',
      'Don\'t be afraid to make mistakes - they\'re your best teachers'
    ],
    commonMistakes: [
      'Skipping fundamentals to jump into advanced topics too quickly',
      'Not practicing enough hands-on coding',
      'Copying code without understanding how it works',
      'Giving up when facing difficult concepts',
      'Not asking for help when stuck'
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { title: 'freeCodeCamp', url: 'https://freecodecamp.org' },
      { title: 'CSS Tricks', url: 'https://css-tricks.com' }
    ],
    quiz: {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlinks Text Mark Language'
      ],
      correctAnswer: 0,
      explanation: 'HTML stands for Hyper Text Markup Language. It\'s the standard markup language for creating web pages and describing the structure of web content.'
    },
    flashcards: [
      { front: 'What is the purpose of HTML?', back: 'HTML defines the structure and content of web pages using markup tags.' },
      { front: 'What is CSS used for?', back: 'CSS (Cascading Style Sheets) is used to style and layout web pages, controlling colors, fonts, spacing, and more.' },
      { front: 'What is a growth mindset?', back: 'A growth mindset believes that abilities can be developed through dedication and hard work, embracing challenges as opportunities to learn.' }
    ],
    tasks: [
      {
        title: 'HTML Fundamentals',
        description: 'Master the building blocks of web pages',
        learningOutcomes: [
          'Understand HTML document structure',
          'Use semantic HTML5 elements',
          'Create properly nested elements',
          'Add links and images to pages'
        ],
        nexaSoulBenefit: 'NexaSoul provides interactive HTML workshops with real-time code review from mentors'
      },
      {
        title: 'CSS Styling',
        description: 'Learn to make your pages beautiful',
        learningOutcomes: [
          'Apply colors, fonts, and spacing',
          'Create responsive layouts',
          'Use CSS selectors effectively',
          'Add animations and transitions'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s design system library and get feedback on your UI designs'
      },
      {
        title: 'JavaScript Basics',
        description: 'Add interactivity to your websites',
        learningOutcomes: [
          'Write variables and functions',
          'Handle user events',
          'Manipulate the DOM',
          'Debug common JavaScript errors'
        ],
        nexaSoulBenefit: 'Practice with NexaSoul\'s coding challenges and get instant feedback'
      },
      {
        title: 'Problem Solving',
        description: 'Develop computational thinking skills',
        learningOutcomes: [
          'Break down complex problems',
          'Design algorithms step by step',
          'Test and iterate on solutions',
          'Learn debugging strategies'
        ],
        nexaSoulBenefit: 'Join NexaSoul\'s problem-solving sessions with peer collaboration'
      }
    ],
    nexaSoulValue: 'NexaSoul transforms beginners into confident developers through hands-on learning, mentorship, and real project experience. We provide the structure, community, and support you need to succeed.',
    communitySupport: [
      '24/7 Discord community support',
      'Weekly mentorship sessions',
      'Code review from industry professionals',
      'Peer learning groups and study circles',
      'Career guidance and placement support'
    ]
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
    description: 'Programming is the art of instructing computers to solve problems. This stage focuses on core programming concepts, data structures, and algorithms that form the backbone of software development.',
    keyConcepts: [
      'Variables, data types, and operators',
      'Control flow (if-else, loops)',
      'Functions and modular programming',
      'Data structures (arrays, lists, dictionaries)',
      'Algorithm complexity and efficiency'
    ],
    examples: [
      'Writing a Python script to automate file organization',
      'Implementing a sorting algorithm from scratch',
      'Creating a function to calculate Fibonacci numbers',
      'Building a simple command-line calculator'
    ],
    tips: [
      'Learn one language deeply before branching out',
      'Practice algorithm problems regularly on platforms like LeetCode',
      'Write clean, readable code with meaningful variable names',
      'Understand time and space complexity of your solutions',
      'Debug systematically using print statements and debuggers'
    ],
    commonMistakes: [
      'Not understanding the basics before moving to advanced topics',
      'Writing code without planning the logic first',
      'Ignoring edge cases in algorithm solutions',
      'Not refactoring code for better readability',
      'Memorizing solutions instead of understanding the approach'
    ],
    resources: [
      { title: 'LeetCode', url: 'https://leetcode.com' },
      { title: 'HackerRank', url: 'https://hackerrank.com' },
      { title: 'Python Documentation', url: 'https://docs.python.org' }
    ],
    quiz: {
      question: 'What is the time complexity of binary search?',
      options: [
        'O(n)',
        'O(log n)',
        'O(nÂ²)',
        'O(1)'
      ],
      correctAnswer: 1,
      explanation: 'Binary search has O(log n) time complexity because it divides the search space in half with each iteration, making it very efficient for sorted data.'
    },
    flashcards: [
      { front: 'What is a variable?', back: 'A variable is a named storage location in memory that holds a value, which can be changed during program execution.' },
      { front: 'What is Big O notation?', back: 'Big O notation describes the performance or complexity of an algorithm, specifically how the runtime grows as the input size increases.' },
      { front: 'What is a function?', back: 'A function is a reusable block of code that performs a specific task, taking inputs (parameters) and returning outputs.' }
    ],
    tasks: [
      {
        title: 'Python Programming',
        description: 'Learn one of the most versatile programming languages',
        learningOutcomes: [
          'Write Python syntax and basic programs',
          'Use data types and control structures',
          'Work with lists, dictionaries, and sets',
          'Handle files and exceptions'
        ],
        nexaSoulBenefit: 'NexaSoul offers Python bootcamps with industry projects and mentor guidance'
      },
      {
        title: 'Data Structures',
        description: 'Master the fundamental building blocks of efficient code',
        learningOutcomes: [
          'Implement arrays, linked lists, and stacks',
          'Understand hash tables and trees',
          'Choose the right data structure for problems',
          'Analyze time and space complexity'
        ],
        nexaSoulBenefit: 'Practice with NexaSoul\'s DSA visualization tools and get expert explanations'
      },
      {
        title: 'Algorithms',
        description: 'Learn to solve problems efficiently',
        learningOutcomes: [
          'Implement sorting and searching algorithms',
          'Understand recursion and dynamic programming',
          'Apply graph algorithms',
          'Optimize code for performance'
        ],
        nexaSoulBenefit: 'Join NexaSoul\'s algorithm competitions and learn from top performers'
      },
      {
        title: 'C++ Fundamentals',
        description: 'Learn systems programming and memory management',
        learningOutcomes: [
          'Understand memory allocation and pointers',
          'Write efficient C++ code',
          'Use object-oriented programming in C++',
          'Debug memory issues'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s C++ labs with hands-on systems programming projects'
      }
    ],
    nexaSoulValue: 'NexaSoul bridges the gap between academic learning and industry requirements by providing practical programming experience with real-world projects and expert mentorship.',
    communitySupport: [
      'Daily coding practice sessions',
      'Algorithm discussion groups',
      'Code review from senior developers',
      'Pair programming opportunities',
      'Industry mentorship programs'
    ]
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
      { name: 'React', color: '#00C8FF', shape: 'Atom' },
    ],
    description: 'Frontend development brings designs to life in the browser. This stage covers the essential technologies and frameworks for creating beautiful, responsive, and interactive user interfaces.',
    keyConcepts: [
      'DOM manipulation and event handling',
      'CSS Flexbox and Grid layouts',
      'Component-based architecture',
      'State management in React',
      'Responsive design principles'
    ],
    examples: [
      'Building a responsive navigation bar with mobile menu',
      'Creating a card component with hover effects',
      'Implementing a form with validation',
      'Building a weather app that fetches API data'
    ],
    tips: [
      'Master CSS fundamentals before using frameworks',
      'Learn React hooks deeply (useState, useEffect, useContext)',
      'Use CSS-in-JS or utility frameworks like Tailwind for faster development',
      'Test your designs on multiple screen sizes',
      'Optimize images and assets for better performance'
    ],
    commonMistakes: [
      'Not considering mobile responsiveness',
      'Over-engineering simple components',
      'Not managing state properly leading to bugs',
      'Ignoring accessibility (a11y) best practices',
      'Using too many external dependencies'
    ],
    resources: [
      { title: 'React Documentation', url: 'https://react.dev' },
      { title: 'CSS Tricks Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
      { title: 'Tailwind CSS', url: 'https://tailwindcss.com' }
    ],
    quiz: {
      question: 'What hook is used to manage state in React?',
      options: [
        'useEffect',
        'useState',
        'useContext',
        'useReducer'
      ],
      correctAnswer: 1,
      explanation: 'useState is the React hook used to add state to functional components. It returns a state value and a function to update it.'
    },
    flashcards: [
      { front: 'What is the DOM?', back: 'The DOM (Document Object Model) is a programming interface that represents HTML documents as a tree structure, allowing JavaScript to manipulate page content.' },
      { front: 'What is a React component?', back: 'A React component is a reusable, self-contained piece of UI that can accept inputs (props) and return JSX to describe what should appear on screen.' },
      { front: 'What is responsive design?', back: 'Responsive design is an approach that makes web pages render well on all screen sizes and devices, using flexible layouts, media queries, and flexible images.' }
    ],
    tasks: [
      {
        title: 'React Framework',
        description: 'Master modern frontend development with React',
        learningOutcomes: [
          'Build component-based UIs',
          'Use React hooks for state management',
          'Handle events and forms',
          'Optimize React performance'
        ],
        nexaSoulBenefit: 'NexaSoul provides React workshops with real-world project templates and code reviews'
      },
      {
        title: 'CSS & Styling',
        description: 'Create beautiful, responsive user interfaces',
        learningOutcomes: [
          'Master Flexbox and Grid layouts',
          'Use CSS animations and transitions',
          'Implement responsive design principles',
          'Work with CSS frameworks like Tailwind'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s design system and get UI/UX feedback from designers'
      },
      {
        title: 'JavaScript Mastery',
        description: 'Deepen your JavaScript knowledge',
        learningOutcomes: [
          'Understand closures and scope',
          'Work with async/await and promises',
          'Use modern ES6+ features',
          'Debug complex JavaScript issues'
        ],
        nexaSoulBenefit: 'Practice with NexaSoul\'s JavaScript challenges and get expert explanations'
      },
      {
        title: 'State Management',
        description: 'Learn to manage application state effectively',
        learningOutcomes: [
          'Use React Context API',
          'Implement Redux patterns',
          'Handle complex state logic',
          'Optimize state updates'
        ],
        nexaSoulBenefit: 'Learn NexaSoul\'s best practices for scalable state management'
      }
    ],
    nexaSoulValue: 'NexaSoul prepares you for modern frontend development with hands-on React projects, design system access, and industry-standard practices.',
    communitySupport: [
      'UI/UX design feedback sessions',
      'React component library access',
      'Frontend code reviews',
      'Design system contributions',
      'Portfolio project showcases'
    ]
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
      { name: 'API App', color: '#7EC820', shape: 'Atom' },
      { name: 'Portfolio', color: '#C4F060', shape: 'crystal' },
    ],
    description: 'Mini projects bridge the gap between learning and building. This stage focuses on creating small, complete applications that demonstrate your skills and build your portfolio.',
    keyConcepts: [
      'Project planning and scoping',
      'API integration and data fetching',
      'State management in real applications',
      'Deployment and hosting',
      'Version control with Git'
    ],
    examples: [
      'Building a Netflix clone with movie API integration',
      'Creating a weather dashboard with location-based data',
      'Developing a task manager with local storage',
      'Building a personal portfolio website with project showcases'
    ],
    tips: [
      'Start with projects you\'re genuinely interested in',
      'Break projects into smaller, manageable features',
      'Use existing APIs to add functionality without building backends',
      'Deploy your projects to show them to others',
      'Write clean, documented code for your portfolio'
    ],
    commonMistakes: [
      'Trying to build too complex projects too early',
      'Not finishing projects before starting new ones',
      'Ignoring error handling and edge cases',
      'Not using version control from the start',
      'Skipping deployment and keeping projects local only'
    ],
    resources: [
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Vercel', url: 'https://vercel.com' },
      { title: 'Netlify', url: 'https://netlify.com' }
    ],
    quiz: {
      question: 'What is the primary purpose of Git?',
      options: [
        'To write code faster',
        'Version control and collaboration',
        'To deploy applications',
        'To manage databases'
      ],
      correctAnswer: 1,
      explanation: 'Git is a distributed version control system that tracks changes in code, enables collaboration, and helps manage project history across different versions.'
    },
    flashcards: [
      { front: 'What is an API?', back: 'An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other.' },
      { front: 'What is deployment?', back: 'Deployment is the process of making an application available to users by hosting it on servers or cloud platforms.' },
      { front: 'Why build mini projects?', back: 'Mini projects help apply learned concepts, build practical skills, create portfolio pieces, and gain confidence before tackling larger projects.' }
    ],
    tasks: [
      {
        title: 'Clone Projects',
        description: 'Recreate popular applications to learn best practices',
        learningOutcomes: [
          'Reverse engineer existing UIs',
          'Implement complex features',
          'Learn industry-standard patterns',
          'Build portfolio-worthy projects'
        ],
        nexaSoulBenefit: 'NexaSoul provides clone project templates and step-by-step guidance'
      },
      {
        title: 'API Integration',
        description: 'Connect your applications to real data sources',
        learningOutcomes: [
          'Fetch data from REST APIs',
          'Handle API authentication',
          'Manage API errors and loading states',
          'Implement data caching strategies'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s API sandbox and real-world API integrations'
      },
      {
        title: 'Portfolio Development',
        description: 'Build your professional portfolio',
        learningOutcomes: [
          'Design and implement portfolio website',
          'Showcase your projects effectively',
          'Optimize for search engines',
          'Add contact and social features'
        ],
        nexaSoulBenefit: 'Get portfolio reviews from NexaSoul mentors and career coaches'
      },
      {
        title: 'Version Control',
        description: 'Master Git for professional development',
        learningOutcomes: [
          'Use Git branches and workflows',
          'Collaborate with pull requests',
          'Resolve merge conflicts',
          'Maintain clean commit history'
        ],
        nexaSoulBenefit: 'Learn NexaSoul\'s Git best practices and team collaboration workflows'
      }
    ],
    nexaSoulValue: 'NexaSoul helps you build a strong portfolio through guided projects, real API integrations, and professional code reviews that prepare you for real-world development.',
    communitySupport: [
      'Project showcase events',
      'Code review sessions',
      'Portfolio feedback from recruiters',
      'Deployment assistance',
      'GitHub portfolio optimization'
    ]
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
      { name: 'Full Stack', color: '#00E5FF', shape: 'Atom' },
      { name: 'AI / ML', color: '#7EC820', shape: 'brain' },
      { name: 'Cloud', color: '#00C8FF', shape: 'cloud' },
    ],
    description: 'Major projects require architectural thinking and full-stack capabilities. This stage challenges you to build complete, production-ready applications with complex features.',
    keyConcepts: [
      'Full-stack architecture (frontend, backend, database)',
      'Authentication and authorization',
      'Database design and optimization',
      'Cloud deployment and scaling',
      'AI/ML integration basics'
    ],
    examples: [
      'Building an e-commerce platform with payment integration',
      'Creating a social media app with real-time features',
      'Developing a SaaS application with subscription management',
      'Building an AI-powered recommendation system'
    ],
    tips: [
      'Plan your architecture before writing code',
      'Choose the right tech stack for your project needs',
      'Implement proper security measures from the start',
      'Monitor performance and optimize bottlenecks',
      'Write comprehensive tests for critical functionality'
    ],
    commonMistakes: [
      'Not planning scalability from the beginning',
      'Ignoring security best practices',
      'Over-engineering simple features',
      'Not implementing proper error handling',
      'Skipping testing and quality assurance'
    ],
    resources: [
      { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com' },
      { title: 'MongoDB University', url: 'https://university.mongodb.com' },
      { title: 'TensorFlow Tutorials', url: 'https://tensorflow.org/tutorials' }
    ],
    quiz: {
      question: 'What does full-stack development include?',
      options: [
        'Only frontend development',
        'Only backend development',
        'Both frontend and backend development',
        'Database administration only'
      ],
      correctAnswer: 2,
      explanation: 'Full-stack development involves working on both the frontend (user interface) and backend (server, database, API) of an application.'
    },
    flashcards: [
      { front: 'What is authentication?', back: 'Authentication is the process of verifying the identity of a user or system, typically through login credentials or tokens.' },
      { front: 'What is cloud deployment?', back: 'Cloud deployment is hosting applications on cloud infrastructure like AWS, Google Cloud, or Azure, providing scalability and reliability.' },
      { front: 'What is a RESTful API?', back: 'A RESTful API is an architectural style for designing networked applications using HTTP requests to access and manipulate data.' }
    ],
    tasks: [
      {
        title: 'Full Stack Development',
        description: 'Build complete applications from frontend to backend',
        learningOutcomes: [
          'Design database schemas',
          'Build RESTful APIs',
          'Implement authentication systems',
          'Connect frontend to backend'
        ],
        nexaSoulBenefit: 'NexaSoul provides full-stack project templates and architecture guidance'
      },
      {
        title: 'Cloud Deployment',
        description: 'Deploy applications to cloud platforms',
        learningOutcomes: [
          'Use AWS/GCP/Azure services',
          'Implement CI/CD pipelines',
          'Monitor application performance',
          'Handle scaling and load balancing'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s cloud credits and deployment workshops'
      },
      {
        title: 'AI/ML Integration',
        description: 'Add artificial intelligence to your applications',
        learningOutcomes: [
          'Understand ML fundamentals',
          'Use pre-trained models',
          'Implement basic ML features',
          'Work with AI APIs'
        ],
        nexaSoulBenefit: 'Learn with NexaSoul\'s AI projects and ML mentorship programs'
      },
      {
        title: 'System Architecture',
        description: 'Design scalable application architectures',
        learningOutcomes: [
          'Design microservices architectures',
          'Implement caching strategies',
          'Handle database optimization',
          'Plan for scalability'
        ],
        nexaSoulBenefit: 'Get architecture reviews from NexaSoul\'s senior engineers'
      }
    ],
    nexaSoulValue: 'NexaSoul prepares you for full-stack development with real-world projects, cloud deployment experience, and AI integration skills that are in high demand.',
    communitySupport: [
      'Architecture review sessions',
      'Cloud deployment assistance',
      'AI/ML project collaboration',
      'System design discussions',
      'Infrastructure planning help'
    ]
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
      { name: 'Team Build', color: '#FF7A5A', shape: 'Atom' },
      { name: 'Pitch', color: '#FF5E3A', shape: 'lightning' },
      { name: 'Ship Fast', color: '#FFB0A0', shape: 'cube' },
    ],
    description: 'Hackathons test your ability to build under pressure and collaborate effectively. This stage focuses on rapid prototyping, teamwork, and presentation skills in time-constrained environments.',
    keyConcepts: [
      'Rapid prototyping and MVP development',
      'Team collaboration and communication',
      'Time management and prioritization',
      'Pitching and presentation skills',
      'Adapting to changing requirements'
    ],
    examples: [
      'Building a working prototype in 24 hours',
      'Collaborating with a team of diverse skills',
      'Presenting a product to judges and investors',
      'Pivoting ideas based on feedback and constraints'
    ],
    tips: [
      'Focus on core features that demonstrate your concept',
      'Form balanced teams with complementary skills',
      'Practice your pitch before the final presentation',
      'Network with other participants and mentors',
      'Take care of your health during the event'
    ],
    commonMistakes: [
      'Trying to build too many features',
      'Not communicating effectively with team members',
      'Ignoring the presentation and focusing only on code',
      'Not testing the demo before presenting',
      'Getting stuck on perfecting minor details'
    ],
    resources: [
      { title: 'Devpost', url: 'https://devpost.com' },
      { title: 'Hackathon Tips', url: 'https://hackathon.guide' },
      { title: 'MLH (Major League Hacking)', url: 'https://mlh.io' }
    ],
    quiz: {
      question: 'What is the primary goal of a hackathon?',
      options: [
        'To win prizes only',
        'To build a complete, production-ready product',
        'To create a working prototype in limited time',
        'To network without building anything'
      ],
      correctAnswer: 2,
      explanation: 'The primary goal of a hackathon is to create a working prototype or MVP (Minimum Viable Product) within a limited time frame, demonstrating creativity and technical skills.'
    },
    flashcards: [
      { front: 'What is an MVP?', back: 'An MVP (Minimum Viable Product) is a version of a product with just enough features to satisfy early customers and provide feedback for future development.' },
      { front: 'Why participate in hackathons?', back: 'Hackathons provide opportunities to build quickly, learn new technologies, network with peers and industry professionals, and potentially win prizes or recognition.' },
      { front: 'What makes a good hackathon pitch?', back: 'A good hackathon pitch clearly explains the problem, your solution, the technology used, and the potential impact, all within a short, engaging presentation.' }
    ],
    tasks: [
      {
        title: 'Rapid Prototyping',
        description: 'Build working prototypes under time pressure',
        learningOutcomes: [
          'Prioritize features for MVP',
          'Work efficiently under deadlines',
          'Make quick technical decisions',
          'Deliver functional demos'
        ],
        nexaSoulBenefit: 'NexaSoul hosts internal hackathons with mentor support and prizes'
      },
      {
        title: 'Team Collaboration',
        description: 'Work effectively in diverse teams',
        learningOutcomes: [
          'Communicate technical concepts clearly',
          'Divide work among team members',
          'Resolve conflicts constructively',
          'Coordinate integration of components'
        ],
        nexaSoulBenefit: 'Join NexaSoul team-building events and collaborative projects'
      },
      {
        title: 'Pitching & Presentation',
        description: 'Present your ideas convincingly',
        learningOutcomes: [
          'Structure compelling presentations',
          'Demonstrate product value',
          'Handle Q&A effectively',
          'Persuade judges and investors'
        ],
        nexaSoulBenefit: 'Get pitch coaching from NexaSoul mentors and industry experts'
      },
      {
        title: 'Problem Solving',
        description: 'Tackle complex challenges creatively',
        learningOutcomes: [
          'Break down complex problems',
          'Generate innovative solutions',
          'Adapt to changing requirements',
          'Learn new technologies quickly'
        ],
        nexaSoulBenefit: 'Practice with NexaSoul\'s challenge-based learning scenarios'
      }
    ],
    nexaSoulValue: 'NexaSoul organizes hackathons and competitions to help you build under pressure, collaborate effectively, and showcase your skills to potential employers.',
    communitySupport: [
      'Hackathon team formation',
      'Mentorship during events',
      'Pitch preparation workshops',
      'Networking with industry judges',
      'Prize and recognition opportunities'
    ]
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
      { name: 'Community', color: '#D0F870', shape: 'Atom' },
    ],
    description: 'Open source is about collaboration and contributing to the global software ecosystem. This stage teaches you how to participate in open source projects, make meaningful contributions, and engage with developer communities.',
    keyConcepts: [
      'Git workflow and branching strategies',
      'Pull requests and code review process',
      'Open source licenses and contribution guidelines',
      'Community communication and etiquette',
      'Finding and selecting projects to contribute to'
    ],
    examples: [
      'Fixing a bug in a popular JavaScript library',
      'Adding documentation to an open source project',
      'Creating a new feature for a framework you use',
      'Helping answer questions in project issue trackers'
    ],
    tips: [
      'Start with documentation improvements or small bug fixes',
      'Read contribution guidelines before making changes',
      'Communicate clearly in pull requests and issues',
      'Be patient with the review process',
      'Build relationships with maintainers and contributors'
    ],
    commonMistakes: [
      'Not reading contribution guidelines',
      'Making large, complex changes for first contributions',
      'Taking feedback personally',
      'Not following the project\'s coding standards',
      'Abandoning contributions mid-way'
    ],
    resources: [
      { title: 'GitHub Explore', url: 'https://github.com/explore' },
      { title: 'Open Source Guides', url: 'https://opensource.guide' },
      { title: 'First Contributions', url: 'https://firstcontributions.github.io' }
    ],
    quiz: {
      question: 'What is a pull request?',
      options: [
        'A request to download code',
        'A proposal to merge changes into a codebase',
        'A request to delete code',
        'A type of git branch'
      ],
      correctAnswer: 1,
      explanation: 'A pull request is a proposal to merge changes from one branch into another, allowing team members to review and discuss the changes before integration.'
    },
    flashcards: [
      { front: 'What is open source software?', back: 'Open source software is software with source code that anyone can inspect, modify, and enhance, typically under licenses that permit these freedoms.' },
      { front: 'Why contribute to open source?', back: 'Contributing to open source improves your skills, builds your reputation, helps you learn from experienced developers, and gives back to the community.' },
      { front: 'What is a code review?', back: 'A code review is the process of examining code changes by peers to ensure quality, identify bugs, maintain consistency, and share knowledge.' }
    ],
    tasks: [
      {
        title: 'Git Workflow',
        description: 'Master version control for collaboration',
        learningOutcomes: [
          'Use branching strategies effectively',
          'Create clean pull requests',
          'Resolve merge conflicts',
          'Maintain commit history best practices'
        ],
        nexaSoulBenefit: 'NexaSoul teaches industry Git workflows and provides collaboration practice'
      },
      {
        title: 'First Contributions',
        description: 'Make your first open source contributions',
        learningOutcomes: [
          'Find beginner-friendly issues',
          'Follow contribution guidelines',
          'Write clear commit messages',
          'Respond to code review feedback'
        ],
        nexaSoulBenefit: 'NexaSoul guides you through your first contributions with mentor support'
      },
      {
        title: 'Code Review',
        description: 'Learn to review and improve code',
        learningOutcomes: [
          'Identify code quality issues',
          'Provide constructive feedback',
          'Suggest improvements',
          'Learn from others\' code'
        ],
        nexaSoulBenefit: 'Practice code reviews with NexaSoul mentors and peer reviews'
      },
      {
        title: 'Community Engagement',
        description: 'Become an active open source community member',
        learningOutcomes: [
          'Communicate effectively in issues',
          'Help others solve problems',
          'Document your contributions',
          'Build relationships with maintainers'
        ],
        nexaSoulBenefit: 'Join NexaSoul\'s open source community and collaborative projects'
      }
    ],
    nexaSoulValue: 'NexaSoul connects you with the open source community, helping you build a reputation, learn from experienced developers, and contribute to real-world projects.',
    communitySupport: [
      'Open source project matching',
      'Contribution guidance',
      'Code review mentorship',
      'Community building events',
      'GitHub profile optimization'
    ]
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
      { name: 'Communication', color: '#00C8FF', shape: 'Atom' },
      { name: 'Confidence', color: '#99EEFF', shape: 'lightning' },
    ],
    description: 'Mock interviews prepare you for real technical interviews. This stage focuses on system design, communication skills, and presenting your work effectively under interview conditions.',
    keyConcepts: [
      'System design principles and patterns',
      'Behavioral interview techniques (STAR method)',
      'Technical communication and explanation',
      'Problem-solving under pressure',
      'Resume and portfolio presentation'
    ],
    examples: [
      'Designing a scalable URL shortener system',
      'Explaining a complex project you built',
      'Solving algorithmic problems with clear explanations',
      'Answering behavioral questions with specific examples'
    ],
    tips: [
      'Practice the STAR method (Situation, Task, Action, Result)',
      'Think aloud during problem-solving to show your process',
      'Ask clarifying questions before diving into solutions',
      'Prepare stories that demonstrate your skills and impact',
      'Practice with peers or mentors to get feedback'
    ],
    commonMistakes: [
      'Not communicating thought process clearly',
      'Jumping to solutions without understanding requirements',
      'Being too brief or too verbose in explanations',
      'Not preparing for behavioral questions',
      'Getting nervous and losing structure in responses'
    ],
    resources: [
      { title: 'System Design Primer', url: 'https://systemdesign.one' },
      { title: 'Pramp', url: 'https://pramp.com' },
      { title: 'Interviewing.io', url: 'https://interviewing.io' }
    ],
    quiz: {
      question: 'What does STAR stand for in behavioral interviews?',
      options: [
        'Situation, Task, Action, Result',
        'Story, Time, Action, Response',
        'Skills, Tasks, Achievements, Results',
        'Situation, Team, Action, Result'
      ],
      correctAnswer: 0,
      explanation: 'STAR is a structured method to answer behavioral questions: Situation (context), Task (what needed to be done), Action (what you did), and Result (the outcome).'
    },
    flashcards: [
      { front: 'What is system design?', back: 'System design is the process of defining the architecture, components, and interfaces of a system to meet specific requirements and constraints.' },
      { front: 'What is a behavioral interview?', back: 'A behavioral interview focuses on how you handled past situations to predict future performance, using questions like "Tell me about a time when..."' },
      { front: 'Why practice mock interviews?', back: 'Mock interviews help reduce anxiety, improve communication skills, identify knowledge gaps, and build confidence for real interviews.' }
    ],
    tasks: [
      {
        title: 'System Design',
        description: 'Learn to design scalable systems',
        learningOutcomes: [
          'Design database schemas',
          'Plan API architectures',
          'Handle scalability requirements',
          'Consider security and reliability'
        ],
        nexaSoulBenefit: 'NexaSoul provides system design templates and architecture reviews'
      },
      {
        title: 'Technical Interviews',
        description: 'Master coding interview techniques',
        learningOutcomes: [
          'Solve problems under time pressure',
          'Communicate thought process clearly',
          'Optimize solutions for efficiency',
          'Handle edge cases effectively'
        ],
        nexaSoulBenefit: 'Practice with NexaSoul\'s interview question bank and mock sessions'
      },
      {
        title: 'Behavioral Interviews',
        description: 'Prepare for soft skills assessment',
        learningOutcomes: [
          'Use STAR method effectively',
          'Tell compelling stories',
          'Demonstrate leadership and teamwork',
          'Handle difficult questions'
        ],
        nexaSoulBenefit: 'Get behavioral interview coaching from NexaSoul career mentors'
      },
      {
        title: 'Communication Skills',
        description: 'Improve technical communication',
        learningOutcomes: [
          'Explain complex concepts simply',
          'Ask clarifying questions',
          'Present technical solutions',
          'Handle feedback constructively'
        ],
        nexaSoulBenefit: 'Join NexaSoul communication workshops and presentation practice'
      }
    ],
    nexaSoulValue: 'NexaSoul prepares you for technical interviews through mock sessions, system design practice, and communication coaching from industry professionals.',
    communitySupport: [
      'Mock interview sessions',
      'System design reviews',
      'Resume feedback',
      'Interview preparation workshops',
      'Alumni interview experiences'
    ]
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
      { name: 'Full-time', color: '#FFD700', shape: 'Atom' },
      { name: 'Career', color: '#FFF080', shape: 'cloud' },
    ],
    description: 'Placement is the culmination of your learning journey. This stage focuses on landing internships, full-time positions, and launching your career in the tech industry.',
    keyConcepts: [
      'Resume building and optimization',
      'LinkedIn and professional networking',
      'Interview preparation and negotiation',
      'Company research and culture fit',
      'Career planning and growth strategies'
    ],
    examples: [
      'Creating a targeted resume for specific roles',
      'Networking with professionals on LinkedIn',
      'Negotiating salary and benefits',
      'Researching companies before interviews',
      'Building a personal brand online'
    ],
    tips: [
      'Tailor your resume for each application',
      'Build a strong LinkedIn presence and network',
      'Practice interview skills regularly',
      'Research companies thoroughly before interviews',
      'Don\'t be afraid to negotiate offers'
    ],
    commonMistakes: [
      'Using a generic resume for all applications',
      'Not networking enough before applying',
      'Being underprepared for technical interviews',
      'Accepting the first offer without negotiation',
      'Not following up after interviews'
    ],
    resources: [
      { title: 'LinkedIn Learning', url: 'https://learning.linkedin.com' },
      { title: 'Glassdoor', url: 'https://glassdoor.com' },
      { title: 'Pramp', url: 'https://pramp.com' }
    ],
    quiz: {
      question: 'What is the best approach to salary negotiation?',
      options: [
        'Accept the first offer immediately',
        'Never negotiate to avoid offending the employer',
        'Research market rates and negotiate respectfully',
        'Ask for double the offered amount'
      ],
      correctAnswer: 2,
      explanation: 'The best approach is to research market rates for your role and location, then negotiate respectfully and professionally based on that data.'
    },
    flashcards: [
      { front: 'What is a resume?', back: 'A resume is a document that summarizes your education, skills, experience, and achievements, used to apply for jobs and internships.' },
      { front: 'Why is networking important?', back: 'Networking helps you discover job opportunities, get referrals, learn about companies, and build relationships that can advance your career.' },
      { front: 'What is a cover letter?', back: 'A cover letter is a document sent with your resume that introduces you, explains your interest in the position, and highlights relevant qualifications.' }
    ],
    tasks: [
      {
        title: 'Resume Building',
        description: 'Create a compelling professional resume',
        learningOutcomes: [
          'Structure resume for ATS systems',
          'Highlight relevant skills and experience',
          'Quantify achievements and impact',
          'Tailor resume for specific roles'
        ],
        nexaSoulBenefit: 'Get resume reviews from NexaSoul career coaches and industry recruiters'
      },
      {
        title: 'LinkedIn Optimization',
        description: 'Build a strong professional online presence',
        learningOutcomes: [
          'Optimize LinkedIn profile for recruiters',
          'Build professional network',
          'Share technical content',
          'Engage with industry communities'
        ],
        nexaSoulBenefit: 'NexaSoul provides LinkedIn workshops and profile optimization guidance'
      },
      {
        title: 'Interview Preparation',
        description: 'Prepare for technical and behavioral interviews',
        learningOutcomes: [
          'Research target companies',
          'Practice common interview questions',
          'Prepare technical demonstrations',
          'Develop questions for interviewers'
        ],
        nexaSoulBenefit: 'Access NexaSoul\'s interview prep resources and mock interview sessions'
      },
      {
        title: 'Job Search Strategy',
        description: 'Develop an effective job search approach',
        learningOutcomes: [
          'Identify target companies and roles',
          'Use multiple job search channels',
          'Leverage referrals and networking',
          'Follow up professionally'
        ],
        nexaSoulBenefit: 'NexaSoul connects you with hiring partners and provides job search guidance'
      }
    ],
    nexaSoulValue: 'NexaSoul supports your career journey with resume reviews, interview preparation, networking opportunities, and direct connections to hiring partners.',
    communitySupport: [
      'Resume and LinkedIn reviews',
      'Mock interview sessions',
      'Career counseling',
      'Networking events with recruiters',
      'Job placement assistance'
    ]
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

// Orb evolution: cyan â' lime â' bright cyan â' lime â' golden â' radiant white-gold
export const ORB_COLORS = [
  '#00C8FF',
  '#7EC820',
  '#00E5FF',
  '#9ED840',
  '#FFD700',
  '#FFFFFF',
];





