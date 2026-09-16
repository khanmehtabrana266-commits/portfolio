import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function LaptopModel() {
  const laptopRef = useRef();

  const { scene } = useGLTF("/models/laptop.glb");

  useFrame((state) => {
    if (!laptopRef.current) return;

    // Smooth rotation
    laptopRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.12;

    // Very small floating movement
    laptopRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.25}
    >
      <group
        ref={laptopRef}
        position={[0, -1.15, 0]}
        rotation={[0, -0.15, 0]}
      >
        <primitive
          object={scene}
          scale={1.8}
        />
      </group>
    </Float>
  );
}

// Preload model
useGLTF.preload("/models/laptop.glb");