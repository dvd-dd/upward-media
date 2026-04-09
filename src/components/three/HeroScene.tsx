"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Icosahedron,
  TorusKnot,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  speed,
  geometry,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  geometry: "icosahedron" | "torusKnot" | "sphere";
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * speed * 0.3;
    meshRef.current.rotation.y += delta * speed * 0.2;

    // Subtle parallax following mouse
    meshRef.current.position.x +=
      (position[0] + pointer.x * 0.3 - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y +=
      (position[1] + pointer.y * 0.2 - meshRef.current.position.y) * 0.02;
  });

  const Geom =
    geometry === "icosahedron"
      ? Icosahedron
      : geometry === "torusKnot"
      ? TorusKnot
      : Sphere;

  const args: [number] | [number, number, number] =
    geometry === "torusKnot" ? [0.6, 0.2, 64] : [0.8];

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Geom ref={meshRef} args={args as any} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </Geom>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={1} color="#00D4AA" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#8B5CF6" />

      <FloatingShape
        position={[0, 0.8, 0]}
        color="#00D4AA"
        speed={0.8}
        geometry="icosahedron"
      />
      <FloatingShape
        position={[1.5, -0.5, -1]}
        color="#8B5CF6"
        speed={0.6}
        geometry="torusKnot"
      />
      <FloatingShape
        position={[-1.2, -1, 0.5]}
        color="#00D4AA"
        speed={1}
        geometry="sphere"
      />
      <FloatingShape
        position={[0.8, 1.5, -0.5]}
        color="#8B5CF6"
        speed={0.5}
        geometry="icosahedron"
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
