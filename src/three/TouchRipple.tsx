import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface TapData {
  x: number;
  y: number;
  time: number;
}

interface TouchRippleProps {
  tapRef: React.MutableRefObject<TapData | null>;
}

interface Ripple {
  position: THREE.Vector3;
  startTime: number;
  color: string;
}

const RIPPLE_COLORS = ['#00C8FF', '#7EC820', '#44DDFF', '#CCFF44'];
const MAX_RIPPLES = 5;
const RIPPLE_DURATION = 2;

export default function TouchRipple({ tapRef }: TouchRippleProps) {
  const { camera } = useThree();
  const ripples = useRef<Ripple[]>([]);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const lastTapTime = useRef(0);
  const colorIdx = useRef(0);

  useFrame((state) => {
    if (tapRef.current && tapRef.current.time !== lastTapTime.current) {
      lastTapTime.current = tapRef.current.time;

      const vec = new THREE.Vector3(tapRef.current.x, tapRef.current.y, 0.5);
      vec.unproject(camera);

      const color = RIPPLE_COLORS[colorIdx.current % RIPPLE_COLORS.length];
      colorIdx.current++;

      ripples.current.push({
        position: vec.clone(),
        startTime: state.clock.elapsedTime,
        color,
      });

      if (ripples.current.length > MAX_RIPPLES) ripples.current.shift();
    }

    ripples.current.forEach((ripple, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;

      const elapsed = state.clock.elapsedTime - ripple.startTime;

      if (elapsed > RIPPLE_DURATION) {
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      mesh.position.copy(ripple.position);
      mesh.lookAt(camera.position);

      const progress = elapsed / RIPPLE_DURATION;
      const scale = 0.5 + progress * 12;
      mesh.scale.setScalar(scale);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - progress) * 0.35;
      mat.color.set(ripple.color);
    });
  });

  return (
    <>
      {Array.from({ length: MAX_RIPPLES }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshes.current[i] = el; }}
          visible={false}
        >
          <ringGeometry args={[0.3, 0.5, 64]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}
