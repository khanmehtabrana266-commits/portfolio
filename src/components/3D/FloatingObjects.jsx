import React, { useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* =========================================
   FLOATING CUBE
========================================= */

function FloatingCube({ position, size = 0.25, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      state.clock.elapsedTime * 0.45 * speed;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.6 * speed;
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.7}
      floatIntensity={1}
    >
      <mesh
        ref={meshRef}
        position={position}
      >
        <boxGeometry
          args={[size, size, size]}
        />

        <meshStandardMaterial
          color="#6366f1"
          metalness={0.8}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

/* =========================================
   FLOATING SPHERE
========================================= */

function FloatingSphere({
  position,
  size = 0.12,
}) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * 1.5) *
      0.0008;
  });

  return (
    <Float
      speed={1.8}
      rotationIntensity={0.4}
      floatIntensity={1.5}
    >
      <mesh
        ref={meshRef}
        position={position}
      >
        <sphereGeometry
          args={[size, 24, 24]}
        />

        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* =========================================
   FLOATING TORUS
========================================= */

function FloatingTorus({ position }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      state.clock.elapsedTime * 0.35;

    meshRef.current.rotation.z =
      state.clock.elapsedTime * 0.5;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.8}
      floatIntensity={0.8}
    >
      <mesh
        ref={meshRef}
        position={position}
      >
        <torusGeometry
          args={[0.25, 0.06, 16, 40]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function FloatingObjects() {
  return (
    <group>

      {/* Left side */}

      <FloatingCube
        position={[-2.4, 1.5, 0]}
        size={0.28}
        speed={0.8}
      />

      <FloatingSphere
        position={[-2.8, -0.4, 0.5]}
        size={0.11}
      />

      <FloatingTorus
        position={[-2.1, -1.3, 0]}
      />

      {/* Right side */}

      <FloatingCube
        position={[2.5, 1.3, 0]}
        size={0.22}
        speed={1.1}
      />

      <FloatingSphere
        position={[2.8, -0.2, 0.5]}
        size={0.14}
      />

      <FloatingTorus
        position={[2.2, -1.2, 0]}
      />

      {/* Top */}

      <FloatingSphere
        position={[0, 2.2, -0.5]}
        size={0.09}
      />

      <FloatingCube
        position={[0.8, 2.5, -0.3]}
        size={0.16}
        speed={1.3}
      />

    </group>
  );
}