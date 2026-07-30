import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundEngine } from '../utils/audio';

import { ExternalLink, Layers, ArrowUpRight, CheckCircle, Sparkles, Building2, TrendingUp } from 'lucide-react';

interface ProjectsSceneProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsScene({ onSelectProject }: ProjectsSceneProps) {
  const museumGroupRef = useRef<THREE.Group>(null);
  const [hoveredPortalId, setHoveredPortalId] = useState<string | null>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (museumGroupRef.current) {
      museumGroupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -105]} ref={museumGroupRef}>
      {/* Sci-Fi Museum Wireframe Structure Grid */}
      <mesh position={[0, 0, -5]}>
        <boxGeometry args={[26, 14, 20]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Central Arch Portal Columns */}
      <mesh position={[0, 5, -8]} rotation={[0, 0, 0]}>
        <torusGeometry args={[11, 0.2, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#ea580c" emissive="#c2410c" emissiveIntensity={0.8} />
      </mesh>

      {/* Floating 3D HTML Header Banner for Client Products */}
      <Html
        position={[0, 2, 9]}
        center
        distanceFactor={19}
        className="pointer-events-none select-none"
      >
        <div className="text-center bg-black/80 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-mono-code uppercase tracking-widest mb-2 border border-orange-500/30">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span>OUR WORK</span>
          </div>
          <h2 className="text-3xl font-serif italic text-white mb-1">
            Our Client Products Showcase
          </h2>
          <p className="text-xs text-white/70 font-sans max-w-lg mx-auto">
            Explore battle-tested 3D platforms, SaaS applications, and AI engines deployed for industry-defining clients.
          </p>
        </div>
      </Html>

      {/* Project Portals Matrix */}
      {PROJECTS_DATA.map((project) => {
        const isHovered = hoveredPortalId === project.id;

        return (
          <SingleProjectPortal
            key={project.id}
            project={project}
            isHovered={isHovered}
            onHover={() => {
              setHoveredPortalId(project.id);
              soundEngine.playHoverSound();
            }}
            onUnhover={() => setHoveredPortalId(null)}
            onClick={() => {
              soundEngine.playClickSound();
              onSelectProject(project);
            }}
          />
        );
      })}
    </group>
  );
}

interface SingleProjectPortalProps {
  project: ProjectItem;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

function SingleProjectPortal({
  project,
  isHovered,
  onHover,
  onUnhover,
  onClick,
}: SingleProjectPortalProps) {
  const portalRingRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z += delta * (isHovered ? 1.2 : 0.4);
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y += delta * 0.8;
      coreMeshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group
      position={project.portalPosition}
      rotation={project.portalRotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onUnhover();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Outer Glowing Portal Ring */}
        <Torus ref={portalRingRef} args={[2.2, 0.08, 16, 64]}>
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={isHovered ? 2.5 : 0.8}
            roughness={0.1}
          />
        </Torus>

        {/* Holographic Wireframe Core Octahedron */}
        <mesh ref={coreMeshRef} position={[0, 0, 0]} scale={isHovered ? 1.2 : 0.8}>
          <octahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Portal HTML Card Overlay */}
        <Html
          position={[0, 0, -2]}
          transform
          occlude={false}
          scale={0.38}
          className="pointer-events-auto cursor-pointer"
        >
          <div
            onClick={onClick}
            className={`w-105 transition-all duration-300 rounded-3xl p-5 border backdrop-blur-xl flex flex-col justify-between group font-sans ${
              isHovered
                ? 'glass-panel-glow border-orange-400 shadow-2xl shadow-orange-500/30 scale-105'
                : 'glass-panel border-slate-700/80'
            }`}
          >
            {/* Card Preview Image Header */}
            <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-orange-500/50 transition-colors">
              {/* <img
                src={project.featuredImgPlaceholder}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              /> */}
              <img src={project.featuredImgPlaceholder} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              
              {/* Client Name Badge Top Left */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono-code text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Building2 className="w-3 h-3 text-orange-400" />
                <span>{project.clientName || 'Client Partner'}</span>
              </div>

              {/* Impact Metric Top Right */}
              {project.impactMetric && (
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-[10px] font-mono-code text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>{project.impactMetric}</span>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-orange-300/80 uppercase tracking-wider">
                <span>{project.clientIndustry}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-xl font-serif italic text-white group-hover:text-orange-300 transition-colors flex items-center justify-between">
                {project.title}
                <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>
              <p className="text-xs text-white/70 font-mono-code tracking-wider">{project.subtitle}</p>
            </div>

            {/* Description excerpt */}
            <p className="text-xs text-white/80 line-clamp-2 mb-4 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 3).map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-white/5 text-white/80 border border-white/15 px-2.5 py-0.5 rounded-full font-mono-code"
                >
                  {t}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[10px] bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono-code">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Bottom Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-orange-100 font-serif italic font-bold text-xs transition-all shadow-xl flex items-center justify-center gap-2"
            >
              INSPECT CLIENT PRODUCT
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
            </button>
          </div>
        </Html>
      </Float>
    </group>
  );
}

