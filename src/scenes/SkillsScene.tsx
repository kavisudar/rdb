import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Ring, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS_DATA, SERVICES_DATA } from '../data/portfolioData';
import { SkillItem, AgencyService } from '../types';
import { soundEngine } from '../utils/audio';
import { Sparkles, CheckCircle2, Zap, ArrowUpRight, Box, Layers, Cpu, Palette, Activity } from 'lucide-react';

interface SkillsSceneProps {
  onSelectSkill: (skill: SkillItem) => void;
  onSelectService?: (service: AgencyService) => void;
}

export function SkillsScene({ onSelectSkill, onSelectService }: SkillsSceneProps) {
  const galaxyGroupRef = useRef<THREE.Group>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y = time * 0.03;
    }
  });

  const selectedService = SERVICES_DATA[activeServiceTab] || SERVICES_DATA[0];

  return (
    <group position={[0, 0, -70]}>
      {/* Central Pulsing Cosmic Sun / Galaxy Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#c2410c"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>
      
      {/* Core Sun Corona Glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit Rings */}
      {[5, 6.5, 8, 9.5].map((r, i) => (
        <Ring
          key={i}
          args={[r - 0.02, r + 0.02, 64]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#818cf8" transparent opacity={0.15} />
        </Ring>
      ))}

      {/* Floating 3D HTML Agency Services Console */}
      <Html
        position={[0, 0, 2]}
        center
        distanceFactor={16}
        className="pointer-events-auto select-none"
      >
        <div className="w-155 max-w-[92vw] glass-panel-glow p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-2xl text-white font-sans shadow-2xl relative overflow-hidden">
          {/* Top Bar Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
              <h2 className="text-xl md:text-2xl font-serif italic text-white tracking-wide">
                Services We Provide
              </h2>
            </div>
            <span className="text-[10px] font-mono-code text-orange-300 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 uppercase tracking-widest">
              AGENCY CAPABILITIES
            </span>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {SERVICES_DATA.map((srv, idx) => {
              const isActive = idx === activeServiceTab;
              return (
                <button
                  key={srv.id}
                  onClick={() => {
                    setActiveServiceTab(idx);
                    soundEngine.playClickSound();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-serif italic transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-white text-black font-bold border-white shadow-lg'
                      : 'bg-white/5 border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: srv.color }}
                  />
                  <span>{srv.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Overview Card */}
          {selectedService && (
            <div className="bg-black/60 p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-serif italic text-white mb-1 flex items-center gap-2">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-orange-300 font-mono-code tracking-wider">
                    {selectedService.subtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-serif italic font-bold text-emerald-400 block">
                    {selectedService.startingPrice}
                  </span>
                  <span className="text-[10px] font-mono-code text-white/50 block">
                    EST. {selectedService.turnaround}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-sans">
                {selectedService.description}
              </p>

              {/* Deliverables Grid */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono-code text-white/50 uppercase tracking-widest block">
                  CLIENT DELIVERABLES:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-[11px] text-white/90 bg-white/5 p-2 rounded-xl border border-white/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 text-orange-200 border border-white/15 px-2.5 py-0.5 rounded-full font-mono-code"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {onSelectService && (
                  <button
                    onClick={() => {
                      soundEngine.playClickSound();
                      onSelectService(selectedService);
                    }}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-orange-100 text-black font-serif italic font-bold text-xs transition-all shadow-xl flex items-center gap-1.5 shrink-0"
                  >
                    <span>SERVICE DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Html>

      {/* Skills Galaxy Group Orbiting Planets */}
      <group ref={galaxyGroupRef}>
        {SKILLS_DATA.map((skill) => {
          const isHovered = hoveredSkillId === skill.id;

          return (
            <SinglePlanet
              key={skill.id}
              skill={skill}
              isHovered={isHovered}
              onHover={() => {
                setHoveredSkillId(skill.id);
                soundEngine.playHoverSound();
              }}
              onUnhover={() => setHoveredSkillId(null)}
              onClick={() => {
                soundEngine.playClickSound();
                onSelectSkill(skill);
              }}
            />
          );
        })}
      </group>
    </group>
  );
}

interface SinglePlanetProps {
  skill: SkillItem;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

function SinglePlanet({ skill, isHovered, onHover, onUnhover, onClick }: SinglePlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.5);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
    }
  });

  const scale = isHovered ? skill.size * 1.35 : skill.size;

  return (
    <group position={skill.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Planet Sphere */}
        <mesh
          ref={meshRef}
          scale={scale}
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
          castShadow
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.emissiveColor}
            emissiveIntensity={isHovered ? 2.0 : 0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Planet Atmosphere Glow */}
        {isHovered && (
          <mesh scale={scale * 1.25}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Planet Saturn Ring */}
        <Ring
          ref={ringRef}
          args={[skill.size * 1.4, skill.size * 1.8, 32]}
          rotation={[-Math.PI / 3, 0, 0]}
        >
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={isHovered ? 0.6 : 0.3}
            side={THREE.DoubleSide}
          />
        </Ring>

        {/* Floating Label in 3D Space */}
        <Html
          position={[0, skill.size * 1.6, 0]}
          center
          distanceFactor={15}
          className="pointer-events-none select-none whitespace-nowrap"
        >
          <div
            className={`transition-all duration-300 px-4 py-2 rounded-2xl border flex items-center gap-2.5 backdrop-blur-xl font-sans ${
              isHovered
                ? 'bg-black/90 border-orange-400 text-white shadow-2xl shadow-orange-500/20 scale-110'
                : 'bg-black/60 border-white/15 text-white/80'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm font-serif italic tracking-wide">{skill.name}</span>
            {isHovered && (
              <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full font-mono-code uppercase tracking-wider">
                {skill.proficiency}%
              </span>
            )}
          </div>
        </Html>
      </Float>
    </group>
  );
}

