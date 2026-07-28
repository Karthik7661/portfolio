"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Central Distorted Wireframe Core that rotates and responds to scroll
const AbstractCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const scrollY = scrollRef.current;
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 + scrollY * 0.001;
      meshRef.current.rotation.y = time * 0.25 + scrollY * 0.0015;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = -time * 0.1 - scrollY * 0.0008;
      outerMeshRef.current.rotation.y = time * 0.18 + scrollY * 0.001;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3 + scrollY * 0.002;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }
    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        0.35 + Math.sin(time * 0.8) * 0.12,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      {/* Inner Distorted Wireframe Icosahedron */}
      <mesh ref={meshRef} scale={2.4}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#38bdf8"
          emissive="#818cf8"
          emissiveIntensity={0.8}
          wireframe
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* Outer Geometric Wireframe Shell */}
      <mesh ref={outerMeshRef} scale={3.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Orbiting Wireframe Torus Ring */}
      <mesh ref={ringRef} scale={4.2}>
        <torusGeometry args={[1, 0.02, 16, 64]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

// Secondary floating 3D nodes positioned vertically for background scroll depth
const FloatingNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = (scrollRef.current * 0.003) % 20;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY - 4, 0.05);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node 1 - Upper Left Octahedron */}
      <mesh position={[-6, 4, -3]} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Node 2 - Lower Right Tetra */}
      <mesh position={[6, -5, -4]} scale={1.4}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Node 3 - Mid Torus */}
      <mesh position={[-5, -8, -2]} scale={1.0}>
        <torusGeometry args={[1, 0.2, 8, 24]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Ambient Particle Starfield
const Particles = () => {
  const count = 1200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.05;
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
      <pointsMaterial size={0.035} color="#38bdf8" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
};

// Mouse Parallax Camera Rig
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
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.current.x * 1.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.current.y * 1.8, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const Scene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#38bdf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <spotLight position={[0, 8, 12]} intensity={1.5} color="#06b6d4" penumbra={1} />
        
        <AbstractCore />
        <FloatingNodes />
        <Particles />
        <Rig />
      </Canvas>
    </div>
  );
};

export default Scene;

