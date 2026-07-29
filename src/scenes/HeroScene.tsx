import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Ring, Torus, Html } from '@react-three/drei';
import * as THREE from 'three';
import { AGENCY_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';
import { Sparkles, ArrowUpRight, Layers, Box, Cpu, CheckCircle2 } from 'lucide-react';

interface HeroSceneProps {
  onExploreServices?: () => void;
  onExploreProducts?: () => void;
  onContactAgency?: () => void;
}

export function HeroScene({ onExploreServices, onExploreProducts, onContactAgency }: HeroSceneProps) {
  const islandRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const monolithRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Gentle float & rotation animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (islandRef.current) {
      islandRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      islandRef.current.rotation.y = time * 0.05;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.y = time * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.4;
      ring2Ref.current.rotation.z = time * 0.15;
    }

    if (monolithRef.current) {
      monolithRef.current.rotation.y = time * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floating Futuristic Island Group */}
      <group ref={islandRef}>
        {/* Core Island Base Structure (Layered Polygon Crystals) */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[4.5, 0.5, 2.5, 8]} />
          <meshStandardMaterial
            color="#0b1329"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Crystalline Tech Platform Ring */}
        <mesh position={[0, -0.7, 0]} receiveShadow>
          <cylinderGeometry args={[4.8, 4.5, 0.2, 12]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive="#1e1b4b"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Central Monolith Core Obelisk */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh ref={monolithRef} position={[0, 1.8, 0]} castShadow>
            <octahedronGeometry args={[1.6, 0]} />
            <meshPhysicalMaterial
              color="#ea580c"
              emissive="#f97316"
              emissiveIntensity={1.0}
              roughness={0.1}
              metalness={0.9}
              transmission={0.4}
              thickness={1.2}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>

        {/* Outer Orbit Energy Rings */}
        <Torus
          ref={ring1Ref}
          args={[2.8, 0.04, 16, 64]}
          position={[0, 1.8, 0]}
        >
          <meshStandardMaterial
            color="#fb923c"
            emissive="#ea580c"
            emissiveIntensity={1.5}
          />
        </Torus>

        <Torus
          ref={ring2Ref}
          args={[3.4, 0.03, 16, 64]}
          position={[0, 1.8, 0]}
        >
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={1.2}
          />
        </Torus>

        {/* Base Grid Tech Decal */}
        <Ring args={[0.5, 4.4, 32]} position={[0, -0.59, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
        </Ring>

        {/* Orbiting Satellite Crystals */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 3.8;
          const z = Math.sin(angle) * 3.8;
          return (
            <mesh key={i} position={[x, 0.5, z]}>
              <octahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial
                color="#60a5fa"
                emissive="#3b82f6"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Floating Interactive 3D Agency Hero HTML Card */}
      <Html
        position={[0, 1.2, 2.5]}
        center
        distanceFactor={10}
        className="pointer-events-auto select-none"
      >
        <div className="w-145 max-w-[92vw] glass-panel-glow p-7 md:p-8 rounded-3xl border border-white/20 backdrop-blur-2xl text-white font-sans shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Subtle Top Glow Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-amber-400 to-indigo-500" />

          {/* Agency Badge Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[10px] font-mono-code uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>HIGHLY EXPERIENCED</span>
            </div>
            <span className="text-[10px] font-mono-code text-white/50 tracking-wider uppercase">
              {AGENCY_INFO.location}
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-2xl md:text-3xl font-serif italic text-white leading-tight mb-3 tracking-wide">
            Become End-2-End <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-200 to-indigo-300">Brand Building </span> Partner for Your Digital Product
          </h1>

          {/* Hero Subtitle Description */}
          <p className="text-xs md:text-sm text-white/80 leading-relaxed font-sans mb-6">
            Our mission is providing  <span className="font-semibold text-white">highest quality web solutions</span> — at affordable prices, with fast delivery and excellent customer service. 
          </p>
          {/* Agency Key Stats Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 px-4 rounded-2xl bg-black/60 border border-white/10 mb-6">
            {AGENCY_INFO.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="text-base md:text-lg font-serif italic font-bold text-orange-300 block">
                  {stat.value}
                </span>
                <span className="text-[9px] font-mono-code text-white/50 uppercase block tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Call-To-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playWarpSound();
                if (onExploreServices) onExploreServices();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-orange-100 text-black font-serif italic font-bold text-xs transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <Box className="w-4 h-4 text-orange-600" />
              <span>EXPLORE OUR SERVICES</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                soundEngine.playWarpSound();
                if (onExploreProducts) onExploreProducts();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-serif italic text-xs border border-white/20 transition-all flex items-center justify-center gap-2 group"
            >
              <Layers className="w-4 h-4 text-orange-300" />
              <span>CLIENT PRODUCTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </Html>

      {/* Floating Swarm Particles around Hero Island */}
      <points ref={particlesRef} position={[0, 1, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 400 }, () => (Math.random() - 0.5) * 12)
              ),
              3
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#fb923c"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

