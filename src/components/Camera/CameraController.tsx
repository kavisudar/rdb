import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_CONFIGS } from '../../data/portfolioData';

interface CameraControllerProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSceneIndex: number;
}

export function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera, pointer } = useThree();
  const currentPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 12));
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const lookAtVecRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // Compute interpolated camera position and target based on scroll progress across SCENE_CONFIGS
  useEffect(() => {
    // Initial camera setup
    camera.position.set(0, 2.5, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    // 1. Calculate ideal position along the scene progression
    const totalScenes = SCENE_CONFIGS.length;
    const progress = Math.max(0, Math.min(1, scrollProgress));
    
    // Find which two keyframes we are between
    const rawIdx = progress * (totalScenes - 1);
    const lowerIdx = Math.floor(rawIdx);
    const upperIdx = Math.min(totalScenes - 1, lowerIdx + 1);
    const t = rawIdx - lowerIdx;

    const startScene = SCENE_CONFIGS[lowerIdx];
    const endScene = SCENE_CONFIGS[upperIdx];

    // Lerp base camera position
    const targetX = THREE.MathUtils.lerp(startScene.cameraPosition[0], endScene.cameraPosition[0], t);
    const targetY = THREE.MathUtils.lerp(startScene.cameraPosition[1], endScene.cameraPosition[1], t);
    const targetZ = THREE.MathUtils.lerp(startScene.cameraPosition[2], endScene.cameraPosition[2], t);

    // Lerp base lookAt target
    const targetLookX = THREE.MathUtils.lerp(startScene.cameraTarget[0], endScene.cameraTarget[0], t);
    const targetLookY = THREE.MathUtils.lerp(startScene.cameraTarget[1], endScene.cameraTarget[1], t);
    const targetLookZ = THREE.MathUtils.lerp(startScene.cameraTarget[2], endScene.cameraTarget[2], t);

    // 2. Add subtle mouse parallax offset
    const parallaxX = pointer.x * 0.8;
    const parallaxY = pointer.y * 0.5;

    const desiredPosX = targetX + parallaxX;
    const desiredPosY = targetY + parallaxY;
    const desiredPosZ = targetZ;

    // 3. Smooth Damping (Dampening lerp for 60fps cinematic feel)
    const dampFactor = Math.min(1, delta * 4); // Smooth, responsive lag
    currentPosRef.current.x = THREE.MathUtils.lerp(currentPosRef.current.x, desiredPosX, dampFactor);
    currentPosRef.current.y = THREE.MathUtils.lerp(currentPosRef.current.y, desiredPosY, dampFactor);
    currentPosRef.current.z = THREE.MathUtils.lerp(currentPosRef.current.z, desiredPosZ, dampFactor);

    currentTargetRef.current.x = THREE.MathUtils.lerp(currentTargetRef.current.x, targetLookX + parallaxX * 0.4, dampFactor);
    currentTargetRef.current.y = THREE.MathUtils.lerp(currentTargetRef.current.y, targetLookY + parallaxY * 0.4, dampFactor);
    currentTargetRef.current.z = THREE.MathUtils.lerp(currentTargetRef.current.z, targetLookZ, dampFactor);

    // Apply to camera
    camera.position.copy(currentPosRef.current);
    lookAtVecRef.current.copy(currentTargetRef.current);
    camera.lookAt(lookAtVecRef.current);
  });

  return null;
}
