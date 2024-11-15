import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const ParticleWave = () => {
  const count = 5000;
  const points = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color = new THREE.Color();
    const purpleColors = [
      '#c4b5fd',
      '#a78bfa',
      '#8b5cf6',
      '#7c3aed',
      '#6d28d9'
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 50;
      pos[i3 + 1] = (Math.random() - 0.5) * 50;
      pos[i3 + 2] = (Math.random() - 0.5) * 50;

      color.set(purpleColors[Math.floor(Math.random() * purpleColors.length)]);
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  const originalPositions = useMemo(() => positions.slice(), [positions]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;

    const time = clock.getElapsedTime() * 0.5;
    const positions = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];

      positions[i3] = x + Math.sin(time + y * 0.05) * 1.5;
      positions[i3 + 1] = y + Math.cos(time + x * 0.05) * 1.5;
      positions[i3 + 2] = z + Math.sin(time + x * 0.05) * 1.5;

      const dx = positions[i3] - mousePosition.current.x * 15;
      const dy = positions[i3 + 1] - mousePosition.current.y * 15;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 15);

      if (influence > 0) {
        positions[i3] += dx * influence * 0.05;
        positions[i3 + 1] += dy * influence * 0.05;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = time * 0.03;
    points.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const FluidCanvas: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ 
        position: 'fixed',
        zIndex: -1,
        isolation: 'isolate'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(26, 26, 58, 0.5) 0%, rgba(15, 15, 42, 0.5) 100%)'
        }}
        frameloop="always"
        performance={{ min: 0.5 }}
        dpr={[1, 2]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleWave />
        <fog attach="fog" args={['#0f0f2a', 30, 100]} />
      </Canvas>
    </div>
  );
};