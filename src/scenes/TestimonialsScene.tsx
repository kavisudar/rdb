import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { TestimonialItem } from '../types';
import { Quote, Star, Sparkles } from 'lucide-react';

export function TestimonialsScene() {
  return (
    <group position={[0, 0, -175]}>
      {/* Crystal Room Outer Polyhedron Cage */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[14, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Testimonial Crystals */}
      {TESTIMONIALS_DATA.map((testimonial) => (
        <SingleCrystalTestimonial key={testimonial.id} testimonial={testimonial} />
      ))}
    </group>
  );
}

function SingleCrystalTestimonial({ testimonial }: { testimonial: TestimonialItem }) {
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.4;
      crystalRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={testimonial.position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Prismatic Crystal Mesh */}
        <mesh ref={crystalRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color={testimonial.color}
            emissive={testimonial.color}
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Speech Bubble Hologram */}
        <Html
          position={[0, 0, 0]}
          transform
          occlude={false}
          scale={0.42}
          className="pointer-events-auto"
        >
          <div className="w-90 glass-panel-glow p-6 rounded-3xl border border-white/15 text-white font-sans backdrop-blur-2xl shadow-2xl relative">
            <Quote className="w-8 h-8 text-orange-400/30 absolute top-4 right-4" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
              ))}
            </div>

            <p className="text-sm font-serif italic text-white/90 leading-relaxed mb-4">
              "{testimonial.quote}"
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif italic font-bold text-sm text-white shadow-md">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-serif italic font-bold text-white">{testimonial.author}</h4>
                <p className="text-[10px] text-orange-300 font-mono-code uppercase tracking-wider">{testimonial.role} // {testimonial.company}</p>
              </div>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}
