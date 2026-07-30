import { SceneConfig, SceneId, SkillItem, ProjectItem, TimelineStation, TestimonialItem, AgencyService } from '../types';
import flexImg from '../assets/client/flex.png';
import mhcImg from '../assets/client/mhc.png';
import orangeImg from '../assets/client/orange.png';
import rkImg from '../assets/client/rk.png';
import man from '../assets/client/man.png';
import lk from '../assets/client/lk.png';
export const AGENCY_INFO = {
  name: "Raga Designers",
  tagline: "Next-Gen 3D Spatial Web, AI Systems & Digital Product Agency",
  description: "We are an elite creative technology agency crafting immersive 3D WebGL web applications, custom full-stack SaaS client products, and intelligent multi-modal AI systems for industry pioneers.",
  location: "Chennai, IN",
  availableForHire: true,
  stats: [
    { label: "Client Products Launched", value: "65+" },
    { label: "Global Industry Awards", value: "24+" },
    { label: "Client Capital Raised", value: "$120M+" },
    { label: "Client Satisfaction Rate", value: "99.8%" }
  ],
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "admin@ragadesigners.com"
  }
};

export const PERSONAL_INFO = {
  name: "Raga Designers",
  title: "The Future of Brand Building",
  tagline: "Building world-class 3D web experiences, custom SaaS platforms & AI client products.",
  bio: "Raga Designers is a full-service brand, web, and digital engineering studio transforming ideas into market-ready businesses. From strategic brand identity and visual design to high-performance websites, mobile applications, AI-powered solutions, digital marketing, and scalable business platforms, we deliver complete digital ecosystems that help brands launch, grow, and lead in competitive markets. Every project is crafted through a balance of creativity, technology, and measurable business impact.",
  location: "Chennai, IN",
  availableForHire: true,
  stats: AGENCY_INFO.stats,
  socials: AGENCY_INFO.socials
};

export const SERVICES_DATA: AgencyService[] = [
  {
    id: 'logo design',
    title: 'Logo Design & Brand Identity',
    subtitle: 'Visual Identity Solutions',
    category: 'design',
    iconName: 'Palette',
    description: 'We create distinctive logos and comprehensive brand identities that resonate with your target audience and reflect your unique value proposition.',
    deliverables: [
      'Interactive 3D Product Viewers & Configurator Engines',
      'Custom WebGL Shaders & GPU Particle Systems',
      'Cross-Device 60 FPS Performance Optimization',
      'Procedural Canvas Architecture & AR Portals'
    ],
    technologies: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU', 'GSAP'],
    startingPrice: 'From $12k',
    turnaround: '2-4 Weeks',
    color: '#ea580c'
  },
  {
    id: 'fullstack-saas',
    title: 'Web App Development',
    subtitle: 'Scalable Full-Stack Architecture',
    category: 'fullstack',
    iconName: 'Layers',
    description: 'End-to-end full-stack web application development for client products. From complex database models and secure serverless APIs to lightning-fast React / Next.js frontends.',
    deliverables: [
      'Production-Ready Next.js & React 19 Client Web Apps',
      'High-Throughput Node.js & Serverless Microservices',
      'Database Architecture (Firestore / PostgreSQL / Redis)',
      'Secure Payment Systems & OAuth Integration'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    startingPrice: 'From $15k',
    turnaround: '3-6 Weeks',
    color: '#818cf8'
  },
  {
    id: 'ai-agents',
    title: 'Digital Marketing',
    subtitle: 'Gemini & Multi-Modal AI Solutions',
    category: 'ai',
    iconName: 'Cpu',
    description: 'Integrating cutting-edge generative AI models, semantic search vectors, and intelligent autonomous agents into client products for automated workflows and smart user interactions.',
    deliverables: [
      'Gemini 2.5 Multi-Modal Text, Vision & Speech Engines',
      'Real-Time Intelligent Chatbot & Audio Interfaces',
      'Automated Data Pipelines & Semantic Vector Search',
      'Custom Prompt Chaining & Agent Workflows'
    ],
    technologies: ['Gemini API', 'Node.js', 'Python', 'Vector DBs', 'WebSockets'],
    startingPrice: 'From $10k',
    turnaround: '2-3 Weeks',
    color: '#facc15'
  },
  {
    id: 'uiux-design',
    title: 'Graphic Design',
    subtitle: 'High-Contrast Luxury Interfaces',
    category: 'design',
    iconName: 'Palette',
    description: 'Crafting bespoke visual identity systems, dark-mode & light-mode design tokens, mathematical typography scales, and fluid interaction choreography for web applications.',
    deliverables: [
      'Modular UI Design Systems & Component Libraries',
      'Figma Prototypes & Micro-Interaction Choreography',
      'WCAG AA Compliant Accessibility & Typography',
      'Responsive Fluid Layout Systems across Desktop & Mobile'
    ],
    technologies: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Design Tokens'],
    startingPrice: 'From $8k',
    turnaround: '1-3 Weeks',
    color: '#38bdf8'
  },
  {
    id: 'perf-audits',
    title: 'Content Creation',
    subtitle: 'Frame Rate & Asset Compression Audits',
    category: 'optimization',
    iconName: 'Activity',
    description: 'Auditing existing web apps and 3D scenes to eliminate frame drops, optimize GPU draw calls, compress 3D assets with KTX2/Basis, and accelerate load times.',
    deliverables: [
      'Comprehensive WebGL & React Profiling Reports',
      'GPU Draw Call Reduction & Texture Compression',
      'Memory Leak Detection & Garbage Collection Fixes',
      'Core Web Vitals & Bundle Size Reduction'
    ],
    technologies: ['Chrome DevTools', 'Spector.js', 'WebGL Profiler', 'Vite'],
    startingPrice: 'From $5k',
    turnaround: '1 Week',
    color: '#4ade80'
  }
];

export const SCENE_CONFIGS: SceneConfig[] = [
  {
    id: SceneId.HERO,
    name: "01 // AGENCY HERO PORTAL",
    subtitle: "Aetheria Spatial Creative Studio",
    cameraPosition: [0, 2.5, 12],
    cameraTarget: [0, 0, 0],
    progressRange: [0, 0.14]
  },
  {
    id: SceneId.ABOUT,
    name: "02 // STUDIO & MISSION",
    subtitle: "Agency Philosophy & Team Matrix",
    cameraPosition: [0, 1.2, -28],
    cameraTarget: [0, 1.2, -38],
    progressRange: [0.14, 0.30]
  },
  {
    id: SceneId.SKILLS,
    name: "03 // SERVICES WE PROVIDE",
    subtitle: "Capabilities, Deliverables & Tech Stack",
    cameraPosition: [0, 3.5, -63],
    cameraTarget: [0, 0, -70],
    progressRange: [0.30, 0.48]
  },
  {
    id: SceneId.PROJECTS,
    name: "04 // CLIENT PRODUCTS SHOWCASE",
    subtitle: "Featured Client Web & 3D Products",
    cameraPosition: [0, 2, -98],
    cameraTarget: [0, 2, -105],
    progressRange: [0.48, 0.66]
  },
  {
    id: SceneId.TIMELINE,
    name: "05 // AGENCY TRACK RECORD",
    subtitle: "Milestones & Delivery History",
    cameraPosition: [0, 2.5, -133],
    cameraTarget: [0, 1, -140],
    progressRange: [0.66, 0.82]
  },
  {
    id: SceneId.TESTIMONIALS,
    name: "06 // CLIENT REVIEWS",
    subtitle: "Endorsements from Founders & CTOs",
    cameraPosition: [0, 1.8, -168],
    cameraTarget: [0, 1.8, -175],
    progressRange: [0.82, 0.93]
  },
  {
    id: SceneId.CONTACT,
    name: "07 // AGENCY INQUIRY CONSOLE",
    subtitle: "Start a Client Project with Us",
    cameraPosition: [0, 1.0, -203],
    cameraTarget: [0, 0.8, -210],
    progressRange: [0.93, 1.0]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'react',
    name: 'Business Growth & Strategy',
    category: 'frontend',
    color: '#38bdf8',
    emissiveColor: '#0284c7',
    size: 1.4,
    position: [-5, 2, 0],
    orbitRadius: 6,
    orbitSpeed: 0.6,
    proficiency: 98,
    description: 'Expertise in modern React server/client architecture, custom hooks, state optimization, and fiber reconciliation.',
    iconName: 'Code',
    tags: ['React 19', 'Next.js', 'Server Components', 'Zustand', 'Context']
  },
  {
    id: 'threejs',
    name: 'Logo Creation',
    category: 'graphics',
    color: '#ea580c',
    emissiveColor: '#c2410c',
    size: 1.8,
    position: [5, 1, 3],
    orbitRadius: 8,
    orbitSpeed: 0.4,
    proficiency: 95,
    description: 'Specialized in real-time GLSL custom shaders, GPU particle simulations, raycasting, and post-processing FX.',
    iconName: 'Box',
    tags: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Post-Processing', 'Drei']
  },
  {
    id: 'javascript',
    name: 'Digital Product Architecture',
    category: 'frontend',
    color: '#facc15',
    emissiveColor: '#ca8a04',
    size: 1.3,
    position: [-3, -3, -3],
    orbitRadius: 5,
    orbitSpeed: 0.8,
    proficiency: 96,
    description: 'Strict type safety, generic design, async pipelines, performance profiling, and memory management.',
    iconName: 'FileCode',
    tags: ['TypeScript 5+', 'ESNext', 'Performance', 'Design Patterns']
  },
  {
    id: 'node',
    name: 'Branding & Marketing',
    category: 'backend',
    color: '#4ade80',
    emissiveColor: '#16a34a',
    size: 1.2,
    position: [4, -2, 1],
    orbitRadius: 7,
    orbitSpeed: 0.5,
    proficiency: 90,
    description: 'Scalable REST & GraphQL APIs, microservices, WebSockets, real-time streaming, and database engines.',
    iconName: 'Server',
    tags: ['Node.js', 'Express', 'WebSockets', 'PostgreSQL', 'Redis']
  },
  {
    id: 'gsap',
    name: 'Mobile Application',
    category: 'graphics',
    color: '#f43f5e',
    emissiveColor: '#e11d48',
    size: 1.5,
    position: [0, 4, 5],
    orbitRadius: 9,
    orbitSpeed: 0.35,
    proficiency: 94,
    description: 'Choreographed scroll triggers, timeline sequencing, morphing SVGs, and fluid physics-based transitions.',
    iconName: 'Activity',
    tags: ['GSAP', 'ScrollTrigger', 'Framer Motion', 'FLIP', 'Keyframes']
  },
  {
    id: 'tailwind',
    name: 'Digital Marketing & SEO',
    category: 'frontend',
    color: '#818cf8',
    emissiveColor: '#4f46e5',
    size: 1.1,
    position: [-6, -1, 4],
    orbitRadius: 6.5,
    orbitSpeed: 0.7,
    proficiency: 97,
    description: 'Designing modular, tokenized UI systems with dark luxury visual aesthetics, typography, and accessibility.',
    iconName: 'Palette',
    tags: ['Tailwind v4', 'CSS Grid', 'Design Tokens', 'Responsive UI']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'flx',
    title: 'FLEXZO',
    subtitle: 'Client: Aether Sound Labs',
    clientName: 'FLEXZO',
    clientIndustry: 'Career Development & Professional Networking',
    impactMetric: '120,000+ Active Listeners',
    year: '2025',
    description: 'A revolutionary client product engineered for Aether Sound Labs: an interactive 3D WebGL soundscape platform that renders real-time audio FFT frequencies into procedural 3D terrain landscapes.',
    fullDetails: [
      'Engineered an FFT frequency analyzer with WebGL instanced geometry rendering over 120,000 reactive vertex points at 60 FPS.',
      'Custom GLSL noise shaders deform terrain topology dynamically according to audio pitch and bass transients.',
      'Implemented spatial HRTF audio positioning allowing users to navigate through sound sources in 3D space.'
    ],
    technologies: ['React 19', 'Three.js', 'Web Audio API', 'GLSL Shaders', 'Tailwind CSS'],
    liveUrl: 'https://flexzo.in/',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'Audio Latency', value: '< 12ms' },
      { label: 'Particles Rendered', value: '120k' },
      { label: 'Awwwards Honor', value: 'Site of the Month' }
    ],
    color: '#ea580c',
    portalPosition: [-4.5, 2, -17],
    portalRotation: [0, 0.2, 0],
    accentHex: 0xea580c,
    featuredImgPlaceholder: flexImg
  },
  {
    id: 'mhc',
    title: 'MY HOLIDAYCLUB',
    subtitle: 'Client: QuantX Trading',
    clientName: 'MY HOLIDAY CLUB',
    clientIndustry: 'Travel & Tourism',
    impactMetric: '$10M+ Daily Stream Volume',
    year: '2025',
    description: 'A high-throughput 3D crypto asset matrix client product for QuantX Trading Corp, rendering multi-dimensional trading candlestick volumes as interactive holographic crystal towers in real time.',
    fullDetails: [
      'Built custom WebGL Raycaster to select individual millisecond order ticks out of 500,000 streamed data points.',
      'Integrated real-time WebSocket data feeds with zero-allocation memory buffers.',
      'Awarded FWA Site of the Day for groundbreaking financial visualization.'
    ],
    technologies: ['Next.js', 'React Three Fiber', 'WebSockets', 'GSAP', 'TypeScript'],
    liveUrl: 'https://www.myholidayclub.co.in/',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'Stream Throughput', value: '50k/sec' },
      { label: 'Frame Time', value: '14.2ms' },
      { label: 'FWA Winner', value: 'Site of the Day' }
    ],
    color: '#818cf8',
    portalPosition: [4.5, 2, -15],
    portalRotation: [0, -0.2, 0],
    accentHex: 0x818cf8,
    featuredImgPlaceholder: mhcImg
  },
  {
    id: 'oi',
    title: 'ORANGE INTERIORS',
    subtitle: 'Client: AeroSpace ',
    clientName: 'ORANGE INTERIORS',
    clientIndustry: 'Interior Design & Architecture',
    impactMetric: '250,000+ Active Pilots',
    year: '2024',
    description: 'A browser-based spacecraft flight simulator client product crafted for AeroSpace Dynamics, featuring Cannon.js physics, particle thruster dynamics, and dynamic terrain level-of-detail algorithms.',
    fullDetails: [
      'Designed custom quad-tree LOD terrain mesh generation to seamlessly transition from orbit to ground level.',
      'Implemented rigid-body physics calculations for aerodynamics, inertia tensor, and gravitational vector fields.'
    ],
    technologies: ['Three.js', 'Cannon.js', 'React', 'GLSL Shaders', 'Express API'],
    liveUrl: 'https://www.orangeinterior.in/chennai',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'Physics Loop', value: '120Hz' },
      { label: 'Terrain Mesh', value: 'Procedural' },
      { label: 'Global Pilots', value: '250k+' }
    ],
    color: '#38bdf8',
    portalPosition: [-5, 2, -9],
    portalRotation: [0, 0.15, 0],
    accentHex: 0x38bdf8,
    featuredImgPlaceholder: orangeImg
  },
  {
    id: 'rk',
    title: 'RK GROUPS',
    subtitle: 'Client: Lumina NFT Arts',
    clientName: 'RK GROUPS',
    clientIndustry: 'CONSTRUCTION & REAL ESTATE',
    impactMetric: '10,000+ Minted Sculptures',
    year: '2025',
    description: 'An AI-driven generative art client platform that combines Gemini AI prompts with procedural WebGL geometry generation to yield one-of-a-kind 3D digital sculptures.',
    fullDetails: [
      'Utilized Gemini API server-side routes to extract semantic vectors and drive procedural geometry parameters.',
      'GLTF export pipeline directly in browser allowing instant 3D model downloading and AR viewing on mobile.',
      'Over $1.2M volume generated in digital art minting drops.'
    ],
    technologies: ['React 19', 'Gemini API', 'Three.js', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://rkgroups.in/',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'AI Synthesis', value: '< 2.1s' },
      { label: 'Sculptures Minted', value: '10,000+' },
      { label: 'GLTF Export', value: 'Native 3D' }
    ],
    color: '#facc15',
    portalPosition: [4.5, 2, -10],
    portalRotation: [0, -0.15, 0],
    accentHex: 0xfacc15,
    featuredImgPlaceholder: rkImg
  },
  {
    id: 'man',
    title: 'MANJELLA',
    subtitle: 'Client: Lumina NFT Arts',
    clientName: 'MANJELLA',
    clientIndustry: 'COSMETICS',
    impactMetric: '10,000+ Minted Sculptures',
    year: '2025',
    description: 'An AI-driven generative art client platform that combines Gemini AI prompts with procedural WebGL geometry generation to yield one-of-a-kind 3D digital sculptures.',
    fullDetails: [
      'Utilized Gemini API server-side routes to extract semantic vectors and drive procedural geometry parameters.',
      'GLTF export pipeline directly in browser allowing instant 3D model downloading and AR viewing on mobile.',
      'Over $1.2M volume generated in digital art minting drops.'
    ],
    technologies: ['React 19', 'Gemini API', 'Three.js', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://example.com/nebulus',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'AI Synthesis', value: '< 2.1s' },
      { label: 'Sculptures Minted', value: '10,000+' },
      { label: 'GLTF Export', value: 'Native 3D' }
    ],
    color: '#facc15',
    portalPosition: [4.5, 2, -5],
    portalRotation: [0, -0.15, 0],
    accentHex: 0xfacc15,
    featuredImgPlaceholder: man
  },
  {
    id: 'tnrb',
    title: 'LK TRADERS',
    subtitle: 'Client: AeroSpace Dynamics',
    clientName: 'LK TRADERS',
    clientIndustry: 'HANDICRAFT & EXPORTS',
    impactMetric: '250,000+ Active Pilots',
    year: '2024',
    description: 'A browser-based spacecraft flight simulator client product crafted for AeroSpace Dynamics, featuring Cannon.js physics, particle thruster dynamics, and dynamic terrain level-of-detail algorithms.',
    fullDetails: [
      'Designed custom quad-tree LOD terrain mesh generation to seamlessly transition from orbit to ground level.',
      'Implemented rigid-body physics calculations for aerodynamics, inertia tensor, and gravitational vector fields.',
      'Over 250,000 active global pilot sessions recorded in leaderboard database.'
    ],
    technologies: ['Three.js', 'Cannon.js', 'React', 'GLSL Shaders', 'Express API'],
    liveUrl: 'https://ecommerce.tod360ai.com/store/lk-traders',
    githubUrl: 'https://github.com',
    metrics: [
      { label: 'Physics Loop', value: '120Hz' },
      { label: 'Terrain Mesh', value: 'Procedural' },
      { label: 'Global Pilots', value: '250k+' }
    ],
    color: '#38bdf8',
    portalPosition: [-4.5, 2.3, -1],
    portalRotation: [0, 0.15, 0],
    accentHex: 0x38bdf8,
    featuredImgPlaceholder: lk
  }
];

export const TIMELINE_DATA: TimelineStation[] = [
  {
    id: 'lead-dev',
    title: 'Agency Expansion & Global Studios',
    company: 'Aetheria Studio // SF & London',
    period: '2024 — Present',
    location: 'San Francisco, CA & London, UK',
    description: 'Expanded agency operations to 15+ senior creative engineers and 3D architects, delivering spatial web products for enterprise clients.',
    highlights: [
      'Delivered 20+ flagship client products spanning 3D WebGL, SaaS, and AI integrations.',
      'Maintained 99.8% client retention and won 12 international Web awards.',
      'Established internal R&D lab for WebGPU & Gemini AI integration.'
    ],
    skillsUsed: ['React 19', 'Three.js', 'Gemini AI', 'WebGL', 'System Architecture'],
    position: [-3, 1, 10],
    color: '#ea580c'
  },
  {
    id: 'senior-frontend',
    title: 'Studio Founding & First 20 Clients',
    company: 'Aetheria Creative Labs',
    period: '2022 — 2024',
    location: 'San Francisco, CA',
    description: 'Founded Aetheria as a boutique 3D creative agency servicing high-growth Silicon Valley startups and digital brands.',
    highlights: [
      'Architected 3D spatial web configurators for luxury automotive and fintech clients.',
      'Engineered open-source R3F animation plugins downloaded over 150,000 times.',
      'Achieved $2.5M agency revenue in second year.'
    ],
    skillsUsed: ['React Three Fiber', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'],
    position: [3, 2, -5],
    color: '#818cf8'
  },
  {
    id: 'creative-dev',
    title: 'Core Engineering R&D',
    company: 'Vanguard Interactive',
    period: '2020 — 2022',
    location: 'New York, NY',
    description: 'Led technical implementation for high-profile client interactive campaigns and real-time WebGL microsites.',
    highlights: [
      'Engineered award-winning interactive launch site with 2.5M unique visitors in week 1.',
      'Pioneered GPU particle physics algorithms for web browsers.'
    ],
    skillsUsed: ['Three.js', 'GSAP', 'JavaScript', 'Canvas', 'GLSL'],
    position: [-3, 1.5, -20],
    color: '#38bdf8'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    author: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Aether Sound Labs',
    quote: 'Aetheria Agency delivered our 3D spatial sound product ahead of schedule. Their team possesses an ultra-rare fusion of high technical rigor and world-class artistic design!',
    avatarSeed: 'Elena',
    color: '#ea580c',
    position: [-4, 2, 5]
  },
  {
    id: 't2',
    author: 'Marcus Vance',
    role: 'CTO',
    company: 'QuantX Trading Corp',
    quote: 'Working with Aetheria transformed our financial platform into a breathtaking, real-time spatial matrix. Client conversion jumped 340% within weeks of launch!',
    avatarSeed: 'Marcus',
    color: '#818cf8',
    position: [4, 1, -5]
  },
  {
    id: 't3',
    author: 'Sophia Chen',
    role: 'VP of Product',
    company: 'Lumina NFT Arts',
    quote: 'The level of smoothness in the 3D WebGL portals and Gemini AI integration built by Aetheria is unprecedented. They are the premier agency for 3D web products!',
    avatarSeed: 'Sophia',
    color: '#facc15',
    position: [0, 2, -15]
  }
];
