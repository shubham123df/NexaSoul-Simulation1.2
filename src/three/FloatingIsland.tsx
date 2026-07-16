import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Stage } from '../data/stages';

interface FloatingIslandProps {
  stage: Stage;
  position: [number, number, number];
  unlocked: boolean;
  active: boolean;
  onClick: () => void;
}

const THEME_GEOMETRIES: Record<string, 'crystal' | 'hologram' | 'city' | 'frame' | 'tower' | 'arena' | 'network' | 'dome' | 'skyline'> = {
  foundation: 'crystal',
  programming: 'hologram',
  frontend: 'city',
  miniProjects: 'frame',
  majorProjects: 'tower',
  hackathons: 'arena',
  openSource: 'network',
  mockInterviews: 'dome',
  placement: 'skyline',
};

function CrystalIsland({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, -0.3, 0]}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.85} roughness={0.2} metalness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.04, 8, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} transparent opacity={0.7} flatShading />
      </mesh>
    </group>
  );
}

function HologramIsland({ color, accent }: { color: string; accent: string }) {
  const blocks = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      arr.push({
        pos: [Math.cos(angle) * 1.2, Math.random() * 0.8, Math.sin(angle) * 1.2],
        scale: 0.15 + Math.random() * 0.2,
      });
    }
    return arr;
  }, []);
  return (
    <group>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 6]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.65, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} side={THREE.DoubleSide} />
      </mesh>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={[b.scale, b.scale * 2, b.scale]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CityIsland({ color, accent }: { color: string; accent: string }) {
  const buildings = useMemo(() => {
    const arr: { pos: [number, number, number]; h: number; w: number }[] = [];
    for (let x = -1; x <= 1; x += 0.5) {
      for (let z = -1; z <= 1; z += 0.5) {
        if (Math.abs(x) < 0.2 && Math.abs(z) < 0.2) continue;
        arr.push({
          pos: [x * 1.1, 0, z * 1.1],
          h: 0.2 + Math.random() * 0.9,
          w: 0.18 + Math.random() * 0.1,
        });
      }
    }
    return arr;
  }, []);
  return (
    <group>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.4} metalness={0.6} />
      </mesh>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.pos[0], b.h / 2 - 0.1, b.pos[2]]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function FrameIsland({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 0.15, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Construction frame */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.2, 0.5, Math.sin(angle) * 1.2]}>
            <boxGeometry args={[0.08, 1.2, 0.08]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} />
          </mesh>
        );
      })}
      {[0.3, 0.7].map((h, i) => (
        <mesh key={`f${i}`} position={[0, h, 0]} rotation={[0, (i * Math.PI) / 4, 0]}>
          <torusGeometry args={[1.2, 0.03, 4, 4]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function TowerIsland({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.12, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.6, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.55, 0.5, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function ArenaIsland({ color, accent }: { color: string; accent: string }) {
  const pillars = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      arr.push([Math.cos(angle) * 1.3, 0.4, Math.sin(angle) * 1.3]);
    }
    return arr;
  }, []);
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 0.12, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.5, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {pillars.map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
        </mesh>
      ))}
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.04, 8, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function HostingIsland({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.45, 1.6, 0.12, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.45} metalness={0.7} />
      </mesh>

      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.15, 1.0, 0.55]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} roughness={0.25} metalness={0.8} />
      </mesh>

      {[ -0.45, 0, 0.45 ].map((x, i) => (
        <mesh key={`rack-${i}`} position={[x, 0.4, 0]}>
          <boxGeometry args={[0.16, 0.55, 0.26]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
        </mesh>
      ))}

      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.04, 8, 24]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} />
      </mesh>

      <mesh position={[0.55, 0.95, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[-0.55, 0.95, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

function DomeIsland({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 0.12, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function SkylineIsland({ color, accent }: { color: string; accent: string }) {
  const towers = useMemo(() => {
    const arr: { pos: [number, number, number]; h: number; w: number; d: number }[] = [];
    const layout = [
      { x: 0, z: 0, h: 2.2, w: 0.4, d: 0.4 },
      { x: 0.5, z: 0.3, h: 1.4, w: 0.3, d: 0.3 },
      { x: -0.5, z: 0.2, h: 1.6, w: 0.3, d: 0.3 },
      { x: 0.2, z: -0.5, h: 1.2, w: 0.25, d: 0.25 },
      { x: -0.4, z: -0.4, h: 1.0, w: 0.25, d: 0.25 },
    ];
    layout.forEach((l) => arr.push({ pos: [l.x, l.h / 2 - 0.1, l.z], h: l.h, w: l.w, d: l.d }));
    return arr;
  }, []);
  return (
    <group>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.2, 0.1, 2.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
      </mesh>
      {towers.map((t, i) => (
        <mesh key={i} position={t.pos}>
          <boxGeometry args={[t.w, t.h, t.d]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} roughness={0.1} metalness={0.95} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

const THEME_COMPONENTS: Record<string, React.FC<{ color: string; accent: string }>> = {
  crystal: CrystalIsland,
  hologram: HologramIsland,
  city: CityIsland,
  frame: FrameIsland,
  tower: TowerIsland,
  arena: ArenaIsland,
  network: HostingIsland,
  dome: DomeIsland,
  skyline: SkylineIsland,
};

export default function FloatingIsland({ stage, position, unlocked, active, onClick }: FloatingIslandProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const themeGeo = THEME_GEOMETRIES[stage.theme];
  const ThemeComponent = THEME_COMPONENTS[themeGeo];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + stage.index) * 0.15;
    groupRef.current.rotation.y = t * 0.1 + stage.index;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      if (active) {
        mat.opacity = 0.3 + Math.sin(t * 3) * 0.15;
      } else if (unlocked) {
        mat.opacity = 0.12;
      } else {
        mat.opacity = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Glow disc under island */}
      <mesh ref={glowRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color={stage.accent} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Locked state overlay */}
      {!unlocked && (
        <group>
          <mesh>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshBasicMaterial color="#1a1a2e" transparent opacity={0.3} />
          </mesh>
        </group>
      )}

      <group visible={unlocked}>
        <ThemeComponent color={unlocked ? stage.color : '#333'} accent={unlocked ? stage.accent : '#555'} />
      </group>

      {/* Active ring */}
      {active && (
        <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.4, 64]} />
          <meshBasicMaterial color={stage.accent} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}
