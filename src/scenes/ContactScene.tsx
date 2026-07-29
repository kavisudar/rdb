import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { soundEngine } from '../utils/audio';
import { Terminal, Send, CheckCircle2, Sparkles, Lock, RefreshCw } from 'lucide-react';

interface ContactSceneProps {
  onFormSubmitted: () => void;
}

export function ContactScene({ onFormSubmitted }: ContactSceneProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const portalCoreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration / Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYSTEM READY // EVENT HORIZON PORTAL OPEN',
    'AWAITING QUANTUM TRANSMISSION...'
  ]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isSubmitting ? 2.5 : 0.4);
    }

    if (portalCoreRef.current) {
      portalCoreRef.current.rotation.y = time * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z = -time * 0.1;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playWarpSound();
    setIsSubmitting(true);

    setConsoleLogs((prev) => [
      ...prev,
      `> ENCRYPTING PAYLOAD FROM [${formData.name.toUpperCase()}]...`,
      '> DISPATCHING QUANTUM PARTICLES TO PORTAL HORIZON...'
    ]);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setConsoleLogs((prev) => [
        ...prev,
        '>> TRANSMISSION ACKNOWLEDGED! DATA SAFELY RECORDED IN VAULT.'
      ]);
      onFormSubmitted();
    }, 1800);
  };

  return (
    <group position={[0, 0, -210]}>
      {/* Colossal Event Horizon Portal Ring */}
      <Torus ref={ringRef} args={[7, 0.25, 32, 128]} position={[0, 1.5, -8]}>
        <meshStandardMaterial
          color={submitted ? '#10b981' : isSubmitting ? '#06b6d4' : '#6366f1'}
          emissive={submitted ? '#10b981' : isSubmitting ? '#06b6d4' : '#6366f1'}
          emissiveIntensity={isSubmitting ? 4.0 : 2.0}
          roughness={0.1}
        />
      </Torus>

      {/* Inner Portal Event Horizon Surface */}
      <mesh ref={portalCoreRef} position={[0, 1.5, -8.2]}>
        <circleGeometry args={[6.8, 64]} />
        <meshBasicMaterial
          color={submitted ? '#059669' : '#1e1b4b'}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flowing Particle Vortex into Portal */}
      <points ref={particlesRef} position={[0, 1.5, -5]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 600 }, () => (Math.random() - 0.5) * 16)
              ),
              3
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={submitted ? '#34d399' : '#38bdf8'}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Sci-Fi Console Terminal HTML Interface */}
      <Html
        position={[0, 0.2, 0]}
        transform
        occlude={false}
        scale={0.42}
        className="pointer-events-auto"
      >
        <div className="w-145 glass-panel-glow p-6 rounded-2xl border border-cyan-500/30 text-white font-sans backdrop-blur-2xl shadow-2xl relative">
          {/* Console Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-orange-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif italic text-white tracking-wide">
                  TOUCH WITH US
                </h3>
                <span className="text-[10px] text-orange-300 font-mono-code uppercase tracking-wider">
                  DIRECT COMMUNICATION PORTAL
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono-code px-3 py-1 rounded-full bg-white/5 border border-white/15 text-orange-200">
              <Lock className="w-3 h-3 text-emerald-400" />
              START YOUR BRAND WITH US
            </div>
          </div>

          {/* Form / Submitted Confirmation */}
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-2xl font-serif italic text-white">
                TRANSMISSION SUCCESSFUL!
              </h4>
              <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed font-sans">
                Your message has passed through the event horizon portal. Alex Vance will review and respond shortly!
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Collaboration / Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono-code text-orange-200 border border-white/20 flex items-center gap-2 mx-auto transition-colors tracking-widest uppercase"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                SEND ANOTHER SIGNAL
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-code text-white/60 mb-1 tracking-widest uppercase">
                   NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commander Sarah"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      soundEngine.playKeyPressSound();
                    }}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-code text-white/60 mb-1 tracking-widest uppercase">
                     EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@galaxy.io"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      soundEngine.playKeyPressSound();
                    }}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-code text-white/60 mb-1 tracking-widest uppercase">
                  TRANSMISSION SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    soundEngine.playKeyPressSound();
                  }}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code text-white/60 mb-1 tracking-widest uppercase">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe project requirements, timeline, or inquiries..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    soundEngine.playKeyPressSound();
                  }}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all font-sans resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl font-serif italic font-bold text-sm tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-orange-500 text-white opacity-80 cursor-wait'
                    : 'bg-white hover:bg-orange-100 text-black'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    TRANSMITTING SIGNAL
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    TRANSMIT SIGNAL
                  </>
                )}
              </button>
            </form>
          )}

          {/* Console Log Feed */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono-code text-white/50 space-y-1 bg-black/60 p-3 rounded-xl border border-white/10">
            {consoleLogs.slice(-2).map((log, idx) => (
              <p key={idx} className="truncate">
                {log}
              </p>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
