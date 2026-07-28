"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const AbstractCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
      meshRef.current.rotation.y += 0.003;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = -time * 0.1;
      outerMeshRef.current.rotation.y += 0.002;
    }
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        0.35 + Math.sin(time * 0.8) * 0.1,
        0.05
      );
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      {/* Inner Distorted Wireframe Icosahedron */}
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#fb8dff"
          emissive="#c481ff"
          emissiveIntensity={0.6}
          wireframe
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={1}
        />
      </mesh>

      {/* Outer Geometric Wireframe Shell */}
      <mesh ref={outerMeshRef} scale={3.0}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fb8dff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Rig = () => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.current.x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.current.y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const Scene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fb8dff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#c481ff" />
        <spotLight position={[0, 5, 10]} intensity={1.2} color="#f59bf8" penumbra={1} />
        
        <AbstractCore />
        <Particles />
        <Rig />
      </Canvas>
    </div>
  );
};

export default Scene;

