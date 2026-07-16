import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ORB_COLORS } from '../data/stages';
import type { TapData } from './TouchRipple';

interface StudentOrbProps {
  position: [number, number, number];
  unlockedCount: number;
  tapRef?: React.MutableRefObject<TapData | null>;
}

export default function StudentOrb({ position, unlockedCount, tapRef }: StudentOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowBoost = useRef(0);
  const lastTapTime = useRef(0);

  const colorIndex = Math.min(Math.floor(unlockedCount / 1.5), ORB_COLORS.length - 1);
  const orbColor = ORB_COLORS[colorIndex];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.lerp(new THREE.Vector3(...position), 0.04);

    if (tapRef?.current && tapRef.current.time !== lastTapTime.current) {
      lastTapTime.current = tapRef.current.time;
      glowBoost.current = 1;
    }

    glowBoost.current *= 0.92;

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      const scale = (1 + Math.sin(t * 2) * 0.08) * (1 + glowBoost.current * 0.6);
      coreRef.current.scale.setScalar(scale);

      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.9 + glowBoost.current * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8 + glowBoost.current * 2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.2;

      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      ringMat.opacity = 0.6 + glowBoost.current * 0.4;
    }

    const light = groupRef.current.children.find(
      (c) => c instanceof THREE.PointLight,
    ) as THREE.PointLight | undefined;
    if (light) light.intensity = 3 + glowBoost.current * 8;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={orbColor} transparent opacity={0.9} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={orbColor} transparent opacity={0.2} depthWrite={false} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color={orbColor} transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshBasicMaterial color={orbColor} transparent opacity={0.6} />
      </mesh>

      {/* Point light */}
      <pointLight color={orbColor} intensity={3} distance={8} />
    </group>
  );
}
