import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyWaveProps {
  position: [number, number, number];
  color: string;
  trigger: number;
}

export default function EnergyWave({ position, color, trigger }: EnergyWaveProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(-1);

  useMemo(() => {
    if (trigger > 0) {
      startTime.current = -1;
    }
  }, [trigger]);

  useFrame((state) => {
    if (!meshRef.current || trigger <= 0) return;
    if (startTime.current < 0) startTime.current = state.clock.elapsedTime;

    const elapsed = state.clock.elapsedTime - startTime.current;
    const duration = 1.5;

    if (elapsed > duration) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const progress = elapsed / duration;
    const scale = 1 + progress * 8;
    meshRef.current.scale.setScalar(scale);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (1 - progress) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.5, 0.7, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}
