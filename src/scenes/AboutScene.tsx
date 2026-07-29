import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';
import logo from '../assets/logo.png';
import { User, Terminal, Cpu, Award, Coffee, BookOpen, Laptop, Sparkles } from 'lucide-react';

export function AboutScene() {
  const roomGroupRef = useRef<THREE.Group>(null);
  const laptopRef = useRef<THREE.Group>(null);
  const mugRef = useRef<THREE.Group>(null);
  const keyboardRef = useRef<THREE.Group>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'stats' | 'principles'>('bio');

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (roomGroupRef.current) {
      roomGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    }

    if (laptopRef.current) {
      laptopRef.current.position.y = -0.2 + Math.sin(time * 1.2) * 0.08;
    }

    if (mugRef.current) {
      mugRef.current.rotation.y = time * 0.5;
    }

    if (keyboardRef.current) {
      keyboardRef.current.position.y = -0.5 + Math.cos(time * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -35]} ref={roomGroupRef}>
      {/* Room Wireframe Cyber Grid Enclosure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[18, 10, 16]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Cyber Desk Platform */}
      <mesh position={[0, -1.8, -2]} receiveShadow>
        <boxGeometry args={[10, 0.2, 5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3D PROP 1: Futuristic Laptop Mesh Construct */}
      <group ref={laptopRef} position={[-2.8, -1.2, -1.5]} rotation={[0, 0.3, 0]}>
        {/* Laptop Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.06, 1.0]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Laptop Screen */}
        <mesh position={[0, 0.55, -0.48]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.35, 0.9, 0.04]} />
          <meshStandardMaterial color="#ea580c" emissive="#f97316" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* 3D PROP 2: Cyber Coffee Mug with Steam Particles */}
      <group ref={mugRef} position={[2.8, -1.3, -1.8]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.2, 0.6, 16]} />
          <meshStandardMaterial color="#ea580c" emissive="#c2410c" emissiveIntensity={0.5} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.22, 16]} />
          <meshBasicMaterial color="#451a03" />
        </mesh>
      </group>

      {/* 3D PROP 3: Floating Cyber Keyboard */}
      <group ref={keyboardRef} position={[0, -1.5, -0.8]} rotation={[0.1, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#1e293b" emissive="#0f172a" metalness={0.8} />
        </mesh>
        {/* Glowing Keys Grid */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[2.0, 0.02, 0.7]} />
          <meshBasicMaterial color="#fb923c" wireframe />
        </mesh>
      </group>

      {/* 3D PROP 4: Floating Holographic Books / Data Disks */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6} position={[3.2, 0.8, -2]}>
        <mesh rotation={[0.4, 0.8, 0]}>
          <boxGeometry args={[0.8, 1.1, 0.15]} />
          <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      {/* Main Interactive Holographic Screen Panel */}
      <Html
        transform
        occlude={false}
        position={[0, 2, 10]}
        scale={0.5}
        className="pointer-events-auto"
      >
        <div className="w-180 glass-panel-glow rounded-3xl p-8 text-slate-100 shadow-2xl border border-white/20 font-sans backdrop-blur-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-l bg-linear-to-br from-white to-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-orange-500/10 overflow-hidden">
                    <img
                      src={logo}
                      alt="Raga Designer Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
              <div>
                <h3 className="text-2xl font-serif italic text-white tracking-wide flex items-center gap-2">
                  {PERSONAL_INFO.name}
                  {/* <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono-code font-normal uppercase tracking-wider">
                    ONLINE // ACTIVE
                  </span> */}
                </h3>
                <p className="text-xs text-orange-300/80 font-mono-code tracking-wider">{PERSONAL_INFO.title}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1.5 bg-black/50 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => {
                  setActiveTab('bio');
                  soundEngine.playClickSound();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-code tracking-widest transition-all flex items-center gap-1.5 ${
                  activeTab === 'bio'
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                BIOGRAPHY
              </button>
              <button
                onClick={() => {
                  setActiveTab('stats');
                  soundEngine.playClickSound();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-code tracking-widest transition-all flex items-center gap-1.5 ${
                  activeTab === 'stats'
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                METRICS
              </button>
              <button
                onClick={() => {
                  setActiveTab('principles');
                  soundEngine.playClickSound();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-code tracking-widest transition-all flex items-center gap-1.5 ${
                  activeTab === 'principles'
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                PHILOSOPHY
              </button>
            </div>
          </div>

          {/* Tab Content Body */}
          {activeTab === 'bio' && (
            <div className="space-y-5 animate-fadeIn">
              <p className="text-white/80 text-sm leading-relaxed font-sans">
                {PERSONAL_INFO.bio}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-orange-400" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono-code block">Specialty</span>
                    <span className="text-xs font-semibold text-white">Brand Architecture</span>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono-code block">Location</span>
                    <span className="text-xs font-semibold text-white">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-4 animate-fadeIn">
              {PERSONAL_INFO.stats.map((s, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-3xl font-serif italic font-bold text-orange-300">{s.value}</span>
                  <span className="text-xs text-white/60 mt-1 font-mono-code tracking-wider uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'principles' && (
            <div className="space-y-3.5 animate-fadeIn text-xs text-white/80">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3.5">
                <Laptop className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-serif italic text-base block mb-0.5">We Build Brands That People Remember</strong>
                 Every successful business begins with a memorable identity. We craft logos, visual systems, messaging, and brand guidelines that communicate your purpose with clarity and consistency across every touchpoint.
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-serif italic text-base block mb-0.5">Aesthetic Digital Storytelling</strong>
                  Web experiences should trigger emotion, intrigue, and delight through intentional light, motion, and interaction.
                </div>
              </div>
            </div>
          )}

          {/* Footer Status */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono-code tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CORE MATRIX: STABLE
            </span>
            <span>ARTISTIC FLAIR // 2026</span>
          </div>
        </div>
      </Html>
    </group>
  );
}
