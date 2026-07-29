import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CosmicEnvironment() {
  const starfieldRef = useRef<THREE.Points>(null);
  const nebulaGroupRef = useRef<THREE.Group>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  // Generate 2500 procedural star particles distributed through deep space Z range (-450 to +20)
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#38bdf8'), // cyan
      new THREE.Color('#818cf8'), // indigo
      new THREE.Color('#f43f5e'), // rose
      new THREE.Color('#ffffff'), // pure white
      new THREE.Color('#a855f7'), // purple
    ];

    for (let i = 0; i < count; i++) {
      // Cylinder / Tunnel distribution around camera trajectory
      const radius = 25 + Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.9) * 450; // -405 to +45

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 1.8 + 0.5;
    }

    return [positions, colors, sizes];
  }, []);

  // Generate cosmic floating dust clouds
  const cloudPositions = useMemo(() => {
    const clouds = [];
    const colors = ['#1e1b4b', '#0f172a', '#1e293b', '#311042', '#0c4a6e'];
    for (let i = 0; i < 20; i++) {
      clouds.push({
        position: [
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 30,
          -Math.random() * 400
        ] as [number, number, number],
        scale: 15 + Math.random() * 25,
        color: colors[i % colors.length],
        rotationSpeed: (Math.random() - 0.5) * 0.05
      });
    }
    return clouds;
  }, []);

  useFrame((_, delta) => {
    // Subtle starfield rotation
    if (starfieldRef.current) {
      starfieldRef.current.rotation.z += delta * 0.02;
    }

    // Slowly rotate nebulae
    if (nebulaGroupRef.current) {
      nebulaGroupRef.current.children.forEach((cloud, idx) => {
        cloud.rotation.z += delta * (0.01 + idx * 0.002);
      });
    }
  });

  return (
    <>
      {/* Deep Space Volumetric Fog */}
      <color attach="background" args={['#030508']} />
      <fogExp2 attach="fog" args={['#030508', 0.006]} />

      {/* Main Lighting Setup */}
      <ambientLight ref={ambientLightRef} intensity={0.8} color="#e2e8f0" />
      
      {/* Key Directional Sun Light */}
      <directionalLight
        position={[20, 40, 20]}
        intensity={1.5}
        color="#818cf8"
        castShadow
      />
      
      {/* Rim Accent Light */}
      <directionalLight
        position={[-20, -10, -50]}
        intensity={1.2}
        color="#06b6d4"
      />

      {/* Dynamic Key Point Lights across the environment track */}
      <pointLight position={[0, 10, 0]} intensity={2} color="#38bdf8" distance={40} />
      <pointLight position={[0, 8, -35]} intensity={2.5} color="#818cf8" distance={40} />
      <pointLight position={[0, 12, -95]} intensity={3} color="#a855f7" distance={50} />
      <pointLight position={[0, 10, -165]} intensity={3} color="#3b82f6" distance={50} />
      <pointLight position={[0, 10, -245]} intensity={2.5} color="#ec4899" distance={50} />
      <pointLight position={[0, 10, -315]} intensity={3} color="#06b6d4" distance={50} />
      <pointLight position={[0, 12, -375]} intensity={4} color="#6366f1" distance={60} />

      {/* Starfield Particles */}
      <points ref={starfieldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Cosmic Nebula Clouds */}
      <group ref={nebulaGroupRef}>
        {cloudPositions.map((c, i) => (
          <mesh key={i} position={c.position} scale={c.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={c.color}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
