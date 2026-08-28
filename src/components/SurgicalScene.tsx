"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Text, Environment, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function generateSurgicalField(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius * (0.6 + Math.random() * 0.4);
    const jitter = (Math.random() - 0.5) * 0.3;
    positions[i * 3] = Math.cos(angle) * r + jitter;
    positions[i * 3 + 1] = Math.sin(angle) * r + jitter;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
  }
  return positions;
}

function OrganParticles({ count = 4000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSurgicalField(count, 2.8), [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0f6f7d"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function RingGlare() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.25;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.07;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.6, 0.008, 16, 120]} />
      <meshBasicMaterial color="#d8a847" transparent opacity={0.18} />
    </mesh>
  );
}

function Crosshair() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    // Animate crosshair line materials directly
    ref.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && typeof child.material === 'object' && 'opacity' in child.material) {
        child.material.opacity = 0.5 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.25;
      }
    });
  });
  return (
    <group ref={ref}>
      {[0, 90, 180, 270].map((angle) => (
        <mesh key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <planeGeometry args={[0.8, 0.004]} />
          <meshBasicMaterial color="#d8a847" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function PulsingDot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.5;
    ref.current.scale.setScalar(scale);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.8 - Math.sin(state.clock.getElapsedTime() * 2) * 0.4;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color="#d8a847" transparent opacity={0.8} />
    </mesh>
  );
}

function SceneContent() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.y = Math.sin(Date.now() * 0.0003) * 0.08;
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#d8a847" />
      <pointLight position={[-3, -3, -3]} intensity={0.6} color="#0f6f7d" />
      <OrganParticles count={3500} />
      <RingGlare />
      <Crosshair />
      <PulsingDot />
      <Stars radius={60} depth={30} count={800} factor={2} fade speed={0.4} />
    </>
  );
}

export default function SurgicalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
