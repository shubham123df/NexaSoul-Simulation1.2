import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { STAGES } from '../data/stages';
import FloatingIsland from './FloatingIsland';
import StudentOrb from './StudentOrb';
import Bridge from './Bridge';
import EnergyWave from './EnergyWave';
import ParticleField, { StarField, GridFloor } from './ParticleField';
import TouchRipple from './TouchRipple';
import type { TapData } from './TouchRipple';

export interface SceneProps {
  currentStage: number;
  unlockedCount: number;
  onStageClick: (index: number) => void;
  waveTrigger: number;
  phase: 'intro' | 'pathSelection' | 'avatarCustomization' | 'journey' | 'finale';
  tapRef: React.MutableRefObject<TapData | null>;
  avatarColor: string;
}

const STAGE_SPACING = 6;

const STAGE_POSITIONS: [number, number, number][] = STAGES.map((_, i) => {
  const y = i * STAGE_SPACING - (STAGES.length - 1) * 3;
  const x = Math.sin(i * 0.8) * 3;
  const z = Math.cos(i * 0.8) * 2;
  return [x, y, z];
});

function CinematicCamera({
  currentStage,
  phase,
  mouseRef,
}: {
  currentStage: number;
  phase: 'intro' | 'pathSelection' | 'avatarCustomization' | 'journey' | 'finale';
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 20));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (phase === 'intro') {
      const introProgress = Math.min(t / 4, 1);
      const eased = 1 - Math.pow(1 - introProgress, 3);
      targetPos.current.set(
        Math.sin(eased * 0.5) * 8,
        -2 + eased * 4,
        25 - eased * 18,
      );
      lookTarget.current.set(0, eased * 2, 0);
    } else if (phase === 'finale') {
      targetPos.current.set(
        Math.sin(t * 0.1) * 15,
        STAGE_POSITIONS[STAGE_POSITIONS.length - 1][1] + 5,
        22,
      );
      lookTarget.current.set(0, STAGE_POSITIONS[STAGE_POSITIONS.length - 1][1], 0);
    } else {
      const stagePos = STAGE_POSITIONS[currentStage] || STAGE_POSITIONS[0];
      const nextPos = STAGE_POSITIONS[currentStage + 1] || stagePos;

      const orbitAngle = t * 0.15;
      const baseX = stagePos[0] + Math.cos(orbitAngle) * 6;
      const baseZ = stagePos[2] + 8 + Math.sin(orbitAngle) * 3;
      const baseY = stagePos[1] + 2;

      const mx = mouseRef.current.x * 2;
      const my = mouseRef.current.y * 1.5;

      targetPos.current.set(baseX + mx, baseY + my, baseZ);

      const lookMid = [
        (stagePos[0] + nextPos[0]) / 2,
        (stagePos[1] + nextPos[1]) / 2,
        (stagePos[2] + nextPos[2]) / 2,
      ];
      lookTarget.current.set(lookMid[0], lookMid[1], lookMid[2]);
    }

    camera.position.lerp(targetPos.current, 0.03);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export default function Scene({ currentStage, unlockedCount, onStageClick, waveTrigger, phase, tapRef, avatarColor }: SceneProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const orbPosition = useMemo((): [number, number, number] => {
    if (phase === 'finale') {
      const last = STAGE_POSITIONS[STAGE_POSITIONS.length - 1];
      return [last[0], last[1] + 1, last[2]];
    }
    const pos = STAGE_POSITIONS[currentStage] || STAGE_POSITIONS[0];
    return [pos[0], pos[1] + 0.5, pos[2]];
  }, [currentStage, phase]);

  return (
    <>
      <CinematicCamera currentStage={currentStage} phase={phase} mouseRef={mouseRef} />

      {/* Lighting */}
      <ambientLight intensity={0.35 + unlockedCount * 0.01} color="#0a1a2e" />
      <directionalLight position={[10, 20, 10]} intensity={0.5 + unlockedCount * 0.02} color="#00C8FF" />
      <pointLight position={[0, 0, 0]} intensity={1.2 + unlockedCount * 0.04} color="#7EC820" distance={50} />
      <pointLight position={[0, 10, 0]} intensity={0.4 + unlockedCount * 0.02} color="#00E5FF" distance={80} />
      <fog attach="fog" args={['#060D1A', 30, 140]} />

      {/* Background elements */}
      <StarField count={1200} />
      <ParticleField count={600} radius={60 + unlockedCount * 2} height={60 + unlockedCount * 2} />
      <GridFloor />

      {/* Touch ripples */}
      <TouchRipple tapRef={tapRef} />

      {/* Floating islands */}
      {STAGES.map((stage, i) => (
        <FloatingIsland
          key={stage.id}
          stage={stage}
          position={STAGE_POSITIONS[i]}
          unlocked={i < unlockedCount}
          active={i === currentStage && phase === 'journey'}
          onClick={() => onStageClick(i)}
        />
      ))}

      {/* Bridges between islands */}
      {STAGES.slice(0, -1).map((stage, i) => (
        <Bridge
          key={`bridge-${stage.id}`}
          start={STAGE_POSITIONS[i]}
          end={STAGE_POSITIONS[i + 1]}
          visible={i < unlockedCount - 1}
          color={stage.accent}
        />
      ))}

      {/* Energy wave on unlock */}
      {STAGES.map((stage, i) => (
        <EnergyWave
          key={`wave-${stage.id}`}
          position={STAGE_POSITIONS[i]}
          color={stage.accent}
          trigger={waveTrigger === i ? 1 : 0}
        />
      ))}

      {/* Student orb */}
      <StudentOrb position={orbPosition} unlockedCount={unlockedCount} tapRef={tapRef} />
    </>
  );
}
