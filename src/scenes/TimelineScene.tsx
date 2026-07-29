import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TIMELINE_DATA } from '../data/portfolioData';
import { TimelineStation } from '../types';
import { soundEngine } from '../utils/audio';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function TimelineScene() {
  const [activeStationId, setActiveStationId] = useState<string | null>(null);

  return (
    <group position={[0, 0, -140]}>
      {/* Illuminated Space Railway Beam Track */}
      <mesh position={[0, -1, -20]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 70]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Parallel Grid Ties along track */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={i} position={[0, -1.1, -50 + i * 2.5]}>
          <boxGeometry args={[3, 0.1, 0.3]} />
          <meshStandardMaterial color="#1e293b" wireframe />
        </mesh>
      ))}

      {/* Railway Stations */}
      {TIMELINE_DATA.map((station) => (
        <SingleTimelineStation
          key={station.id}
          station={station}
          isActive={activeStationId === station.id}
          onSelect={() => {
            setActiveStationId(station.id);
            soundEngine.playClickSound();
          }}
        />
      ))}
    </group>
  );
}

interface SingleTimelineStationProps {
  station: TimelineStation;
  isActive: boolean;
  onSelect: () => void;
}

function SingleTimelineStation({ station, isActive, onSelect }: SingleTimelineStationProps) {
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 1.0;
    }
  });

  return (
    <group position={station.position}>
      {/* Station Beacon Cylinder */}
      <mesh ref={beaconRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        <meshStandardMaterial
          color={station.color}
          emissive={station.color}
          emissiveIntensity={isActive ? 2.5 : 1.0}
          wireframe
        />
      </mesh>

      {/* Station Platform Base */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.2, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Station Content HTML Card */}
      <Html
        position={[0, 0.8, 1]}
        transform
        occlude={false}
        scale={0.42}
        className="pointer-events-auto cursor-pointer"
      >
        <div
          onClick={onSelect}
          className={`w-95 p-6 rounded-3xl border transition-all duration-300 font-sans backdrop-blur-2xl ${
            isActive
              ? 'glass-panel-glow border-orange-400 shadow-2xl shadow-orange-500/20'
              : 'glass-panel border-white/15 hover:border-white/30'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono-code px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center gap-1.5 uppercase tracking-wider">
              <Calendar className="w-3 h-3 text-orange-400" />
              {station.period}
            </span>
            <span className="text-[10px] text-white/50 font-mono-code flex items-center gap-1 tracking-wider uppercase">
              <MapPin className="w-3 h-3 text-amber-400" />
              {station.location}
            </span>
          </div>

          <h3 className="text-xl font-serif italic text-white mb-1">
            {station.title}
          </h3>
          <p className="text-xs font-semibold text-orange-300 font-mono-code mb-3 flex items-center gap-1.5 tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            {station.company}
          </p>

          <p className="text-xs text-white/80 mb-4 leading-relaxed font-sans">
            {station.description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 mb-4">
            {station.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-white/80 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {station.skillsUsed.map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-white/5 text-orange-200 border border-white/15 px-2.5 py-0.5 rounded-full font-mono-code"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
