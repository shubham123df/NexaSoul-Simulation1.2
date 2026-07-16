import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface BridgeProps {
  start: [number, number, number];
  end: [number, number, number];
  visible: boolean;
  color: string;
}

export default function Bridge({ start, end, visible, color }: BridgeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const { position, length, quaternion } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const dir = e.clone().sub(s);
    const len = dir.length();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.normalize());
    return { position: mid.toArray() as [number, number, number], length: len, quaternion: quat };
  }, [start, end]);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    if (visible) {
      matRef.current.opacity = Math.min(matRef.current.opacity + 0.02, 0.7);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    } else {
      matRef.current.opacity = Math.max(matRef.current.opacity - 0.05, 0);
    }
  });

  return (
    <mesh ref={meshRef} position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.06, 0.06, length, 8]} />
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
