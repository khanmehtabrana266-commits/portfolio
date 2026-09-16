import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleBackground({
  count = 700,
}) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] =
        (Math.random() - 0.5) * 12;

      positions[i3 + 1] =
        (Math.random() - 0.5) * 7;

      positions[i3 + 2] =
        (Math.random() - 0.5) * 5 - 1;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    pointsRef.current.rotation.y =
      time * 0.025;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.08) * 0.03;
  });

  return (
    <points
      ref={pointsRef}
      position={[0, 0, -2]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.6}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}