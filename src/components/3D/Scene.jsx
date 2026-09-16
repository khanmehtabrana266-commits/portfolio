import React from "react";
import { Canvas } from "@react-three/fiber";
import FloatingObjects from "./FloatingObjects";
import ParticleBackground from "./ParticleBackground";
import "./Scene.css";

const Scene = () => {
  return (
    <div className="scene-container">
      <Canvas className="scene-canvas">
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
        />

        <ParticleBackground />
        <FloatingObjects />
      </Canvas>

      <div className="scene-overlay">
        <div className="scene-glow"></div>
      </div>
    </div>
  );
};

export default Scene;