export enum SceneId {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  TIMELINE = 'timeline',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact'
}

export interface SceneConfig {
  id: SceneId;
  name: string;
  subtitle: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  progressRange: [number, number]; // [start, end] from 0 to 1
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'graphics' | 'backend' | 'architecture';
  color: string;
  emissiveColor: string;
  size: number;
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  proficiency: number;
  description: string;
  iconName: string;
  tags: string[];
}

export interface AgencyService {
  id: string;
  title: string;
  subtitle: string;
  category: 'graphics3d' | 'fullstack' | 'ai' | 'design' | 'optimization';
  iconName: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  startingPrice?: string;
  turnaround?: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  clientName?: string;
  clientIndustry?: string;
  impactMetric?: string;
  year?: string;
  description: string;
  fullDetails: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  metrics: { label: string; value: string }[];
  color: string;
  portalPosition: [number, number, number];
  portalRotation: [number, number, number];
  accentHex: number;
  featuredImgPlaceholder: string;
}

export interface TimelineStation {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skillsUsed: string[];
  position: [number, number, number];
  color: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarSeed: string;
  color: string;
  position: [number, number, number];
}

export interface TerminalLog {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'system';
  timestamp: string;
}
