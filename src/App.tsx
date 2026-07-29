import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './components/Camera/CameraController';
import { CosmicEnvironment } from './components/Environment/CosmicEnvironment';
import { HeroScene } from './scenes/HeroScene';
import { AboutScene } from './scenes/AboutScene';
import { SkillsScene } from './scenes/SkillsScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { TimelineScene } from './scenes/TimelineScene';
import { TestimonialsScene } from './scenes/TestimonialsScene';
import { ContactScene } from './scenes/ContactScene';
import { HUDOverlay } from './components/UI/HUDOverlay';
import { SCENE_CONFIGS } from './data/portfolioData';
import { SkillItem, ProjectItem, AgencyService } from './types';
import { soundEngine } from './utils/audio';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<AgencyService | null>(null);

  const touchStartYRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Compute active scene index based on scrollProgress
  const activeSceneIndex = SCENE_CONFIGS.findIndex(
    (sc) => scrollProgress >= sc.progressRange[0] && scrollProgress <= sc.progressRange[1]
  );
  const safeSceneIdx = activeSceneIndex !== -1 ? activeSceneIndex : 0;

  // Wheel & Touch Scroll Listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Smooth out scroll delta across high-DPI trackpads and mouse wheels
      const cappedDeltaY = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100);
      const delta = cappedDeltaY * 0.00012;
      setTargetProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = (touchStartYRef.current - currentY) * 0.0004;
      touchStartYRef.current = currentY;
      setTargetProgress((prev) => Math.max(0, Math.min(1, prev + deltaY)));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setTargetProgress((prev) => Math.min(1, prev + 0.03));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setTargetProgress((prev) => Math.max(0, prev - 0.03));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Smooth progress interpolation loop for 60 FPS camera travel
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setScrollProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.0001) return targetProgress;
        return prev + diff * Math.min(1, dt * 6);
      });

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetProgress]);

  // Direct Warp Handler
  const handleWarpToScene = (index: number) => {
    const scene = SCENE_CONFIGS[index];
    if (scene) {
      const midProgress = (scene.progressRange[0] + scene.progressRange[1]) / 2;
      setTargetProgress(midProgress);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505] select-none font-sans text-slate-100">
      {/* Background Atmospheric Glows & Dot Grid Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-150 h-150 bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/3 w-100 h-100 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 12], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      >
        <Suspense fallback={null}>
          <CameraController
            scrollProgress={scrollProgress}
            activeSceneIndex={safeSceneIdx}
          />
          <CosmicEnvironment />

          {/* 3D Continuous Journey Scenes */}
          <HeroScene
            onExploreServices={() => handleWarpToScene(2)}
            onExploreProducts={() => handleWarpToScene(3)}
            onContactAgency={() => handleWarpToScene(6)}
          />
          <AboutScene />
          <SkillsScene
            onSelectSkill={(skill) => setSelectedSkill(skill)}
            onSelectService={(srv) => setSelectedService(srv)}
          />
          <ProjectsScene onSelectProject={(project) => setSelectedProject(project)} />
          <TimelineScene />
          <TestimonialsScene />
          <ContactScene onFormSubmitted={() => soundEngine.playWarpSound()} />
        </Suspense>
      </Canvas>

      {/* Artistic Flair HUD Layer */}
      <HUDOverlay
        scrollProgress={scrollProgress}
        activeSceneIndex={safeSceneIdx}
        onWarpToScene={handleWarpToScene}
        selectedSkill={selectedSkill}
        onCloseSkill={() => setSelectedSkill(null)}
        selectedProject={selectedProject}
        onCloseProject={() => setSelectedProject(null)}
        selectedService={selectedService}
        onCloseService={() => setSelectedService(null)}
      />
    </div>
  );
}

