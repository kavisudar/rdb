import { useState } from 'react';
import { SCENE_CONFIGS, PERSONAL_INFO, AGENCY_INFO } from '../../data/portfolioData';
import { SkillItem, ProjectItem, AgencyService } from '../../types';
import { soundEngine } from '../../utils/audio';
import logo from '@/src/assets/logo.png';
import {
  Volume2,
  VolumeX,
  Compass,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Cpu,
  CheckCircle,
  Globe,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Zap,
  Box
} from 'lucide-react';

interface HUDOverlayProps {
  scrollProgress: number;
  activeSceneIndex: number;
  onWarpToScene: (index: number) => void;
  selectedSkill: SkillItem | null;
  onCloseSkill: () => void;
  selectedProject: ProjectItem | null;
  onCloseProject: () => void;
  selectedService?: AgencyService | null;
  onCloseService?: () => void;
}

export function HUDOverlay({
  scrollProgress,
  activeSceneIndex,
  onWarpToScene,
  selectedSkill,
  onCloseSkill,
  selectedProject,
  onCloseProject,
  selectedService,
  onCloseService
}: HUDOverlayProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isWarpMenuOpen, setIsWarpMenuOpen] = useState(false);

  const currentScene = SCENE_CONFIGS[activeSceneIndex] || SCENE_CONFIGS[0];
  const depthZ = (-scrollProgress * 380).toFixed(1);

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      {/* Side Rail Decorative Guides (Artistic Flair Theme) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 pointer-events-none z-30 opacity-40">
        <div className="w-px h-20 bg-linear-to-b from-transparent via-white/30 to-transparent" />
        <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase writing-vertical-rl rotate-180 text-white/70">
          SPATIAL COORD // {depthZ}M
        </span>
        <div className="w-px h-20 bg-linear-to-b from-transparent via-white/30 to-transparent" />
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 pointer-events-none z-30 opacity-40">
        <div className="w-px h-20 bg-linear-to-b from-transparent via-white/30 to-transparent" />
        <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase writing-vertical-rl text-white/70">
          BRAND 
        </span>
        <div className="w-px h-20 bg-linear-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* HUD Fixed Overhead Layer */}
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-8 font-sans">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full">
          {/* Top-Left Branding & Coordinates */}
          <div className="pointer-events-auto flex items-center gap-4">
            {/* <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 backdrop-blur-xl flex items-center justify-center text-white font-serif italic text-2xl shadow-xl shadow-black/50">
            
            </div> */}
            <img 
            src={logo}
            alt="Raga Designers"
            className="w-11 h-11 rounded-l bg-linear-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 backdrop-blur-xl flex items-center justify-center text-white font-serif italic text-2xl shadow-xl shadow-black/50"

            />
            <div>
              <h1 className="text-base md:text-lg font-serif italic tracking-wide text-white flex items-center gap-2">
                {PERSONAL_INFO.name}
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              </h1>
              <p className="text-[11px] font-mono-code text-white/60 tracking-wider uppercase flex items-center gap-2">
                <Compass className="w-3 h-3 text-orange-400" />
                SECTOR {activeSceneIndex + 1}: {currentScene.name.replace('//', '')}
              </p>
            </div>
          </div>

          {/* Top-Right Controls */}
          <div className="pointer-events-auto flex items-center gap-3">
            {/* Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80 text-[11px] font-mono-code tracking-wider backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              BRANDING
            </div>

            {/* Audio Synth Toggle */}
            {/* <button
              onClick={handleToggleAudio}
              className={`px-3.5 py-2 rounded-xl border backdrop-blur-xl transition-all flex items-center gap-2 text-xs font-mono-code ${
                !isMuted
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-200 shadow-lg shadow-orange-500/10'
                  : 'bg-white/5 border-white/15 text-white/60 hover:text-white hover:border-white/30'
              }`}
              title={isMuted ? 'Enable Atmospheric Sound' : 'Mute Sound'}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-orange-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden md:inline tracking-widest">{!isMuted ? 'AUDIO // ON' : 'AUDIO // MUTED'}</span>
            </button> */}

            {/* Warp Navigation Button */}
            <button
              onClick={() => {
                setIsWarpMenuOpen(!isWarpMenuOpen);
                soundEngine.playClickSound();
              }}
              className="px-4 py-2 rounded-xl bg-white text-black hover:bg-orange-100 font-serif font-bold text-xs tracking-wider transition-all shadow-xl flex items-center gap-2 group"
            >
              <span>OUR SECTIONS</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isWarpMenuOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between w-full gap-4">
          {/* Bottom-Left Scene Navigation Radar */}
          <div className="pointer-events-auto hidden lg:flex items-center gap-1 bg-black/60 p-1.5 rounded-full border border-white/15 backdrop-blur-2xl shadow-2xl">
            {SCENE_CONFIGS.map((sc, idx) => {
              const isActive = idx === activeSceneIndex;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    onWarpToScene(idx);
                    soundEngine.playWarpSound();
                  }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-mono-code tracking-widest uppercase transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black shadow-lg font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-orange-500' : 'bg-white/30'}`} />
                  {sc.name.split('//')[1]?.trim() || sc.name}
                </button>
              );
            })}
          </div>

          {/* Bottom-Right Trajectory Meter */}
          <div className="pointer-events-auto flex items-center gap-4 bg-black/60 px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="text-right">
              <span className="text-[9px] font-mono-code text-white/50 block tracking-widest uppercase">
                 OUR BRAND JOURNEY
              </span>
              <span className="text-sm font-serif italic font-bold text-white tracking-wide">
                {Math.round(scrollProgress * 100)}% DISCOVERED
              </span>
            </div>

            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-linear-to-r from-orange-500 via-amber-400 to-indigo-400 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Warp Navigation Drawer Modal */}
      {isWarpMenuOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-2xl z-40 flex items-center justify-center p-4 font-sans animate-fadeIn">
          <div className="w-full max-w-xl glass-panel-glow p-6 md:p-8 rounded-3xl border border-white/20 text-white relative shadow-2xl">
            <button
              onClick={() => setIsWarpMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono-code text-orange-400 tracking-widest uppercase block mb-1">
                SPATIAL TRANSPORT
              </span>
              <h3 className="text-2xl font-serif italic text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                Select Spatial Destination
              </h3>
            </div>

            <div className="space-y-2.5">
              {SCENE_CONFIGS.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    onWarpToScene(idx);
                    setIsWarpMenuOpen(false);
                    soundEngine.playWarpSound();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                    idx === activeSceneIndex
                      ? 'bg-white/10 border-orange-500/50 text-white shadow-xl shadow-orange-500/5'
                      : 'bg-white/5 border-white/10 text-white/80 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <h4 className="text-base font-serif italic group-hover:text-orange-300 transition-colors">
                      {sc.name}
                    </h4>
                    <p className="text-xs text-white/50 font-mono-code tracking-wider">{sc.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Service Inspection Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-2xl z-50 flex items-center justify-center p-4 font-sans animate-fadeIn">
          <div className="w-full max-w-xl glass-panel-glow p-6 md:p-8 rounded-3xl border border-white/20 text-white relative shadow-2xl">
            <button
              onClick={onCloseService}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/20"
                style={{ backgroundColor: selectedService.color }}
              >
                <Box className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-white">{selectedService.title}</h3>
                <span className="text-xs text-orange-400 font-mono-code uppercase tracking-wider">
                  {selectedService.subtitle} // STARTING AT {selectedService.startingPrice}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed mb-6 font-sans">
              {selectedService.description}
            </p>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-mono-code text-orange-400 uppercase tracking-widest">
                INCLUDED CLIENT DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono-code text-white/50 uppercase tracking-widest mb-3">
                RECOMMENDED TECH STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs text-orange-200 border border-white/15 font-mono-code"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onCloseService) onCloseService();
                  onWarpToScene(6);
                }}
                className="flex-1 py-3.5 rounded-xl bg-white text-black font-serif italic font-bold text-sm hover:bg-orange-100 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>COMMISSION THIS SERVICE</span>
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </button>

              <button
                onClick={onCloseService}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-serif italic text-sm border border-white/20 transition-all"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Inspection Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-2xl z-50 flex items-center justify-center p-4 font-sans animate-fadeIn">
          <div className="w-full max-w-lg glass-panel-glow p-6 md:p-8 rounded-3xl border border-white/20 text-white relative shadow-2xl">
            <button
              onClick={onCloseSkill}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/20"
                style={{ backgroundColor: selectedSkill.color }}
              >
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-white">{selectedSkill.name}</h3>
                <span className="text-xs text-orange-400 font-mono-code uppercase tracking-wider">
                  {selectedSkill.category} // PROFICIENCY: {selectedSkill.proficiency}%
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed mb-6 font-sans">
              {selectedSkill.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono-code text-white/50 uppercase tracking-widest mb-3">
                CORE TECHNICAL TAGS
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs text-orange-200 border border-white/15 font-mono-code flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onCloseSkill}
              className="w-full py-3.5 rounded-xl bg-white text-black font-serif italic font-bold text-sm hover:bg-orange-100 transition-all shadow-xl"
            >
              DISMISS DIAGNOSTICS
            </button>
          </div>
        </div>
      )}

      {/* Project Detail Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4 font-sans animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-3xl glass-panel-glow p-6 md:p-8 rounded-3xl border border-white/20 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseProject}
              className="absolute top-6 right-1 z-1 p-2 rounded-xl bg-white hover:bg-white/25 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white/15">
              <img
                src={selectedProject.featuredImgPlaceholder}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-orange-300 font-mono-code uppercase px-3 py-0.5 rounded-full bg-black/80 border border-white/15 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-orange-400" />
                      Client: {selectedProject.clientName || 'Partner'}
                    </span>
                    {selectedProject.clientIndustry && (
                      <span className="text-xs text-white/70 font-mono-code uppercase px-3 py-0.5 rounded-full bg-black/60 border border-white/10">
                        {selectedProject.clientIndustry}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-serif italic text-white mb-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-orange-300 font-mono-code tracking-wider">{selectedProject.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <span className="text-[10px] text-white/50 font-mono-code uppercase block mb-1">{m.label}</span>
                  <span className="text-base font-serif italic text-orange-300">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Description & Full Details */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono-code text-orange-400 uppercase tracking-widest">
                  ARCHITECTURAL HIGHLIGHTS
                </h4>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                
                {/* {selectedProject.fullDetails.map((detail, idx) => (
                  // <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  //   <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  //   <span>{detail}</span>
                  // </div>
                ))} */}
              </div>
            </div>

            {/* Tech Tags */}
            {/* <div className="mb-8">
              <h4 className="text-xs font-mono-code text-white/50 uppercase tracking-widest mb-3">
                TECHNOLOGY STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs text-orange-200 border border-white/15 font-mono-code"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div> */}

            {/* Links Row */}
            <div className="flex items-center gap-4">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-white hover:bg-orange-100 text-black font-serif italic font-bold text-sm text-center flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  LAUNCH DEMO PREVIEW
                </a>
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

