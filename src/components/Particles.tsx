import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  mouse: { x: number; y: number };
}

export function Particles({ count, mouse }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 10;
      temp[i3 + 1] = (Math.random() - 0.5) * 10;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [count]);

  const velocities = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i].x + mouse.x * 0.01;
      positions[i3 + 1] += velocities[i].y + mouse.y * 0.01;
      positions[i3 + 2] += velocities[i].z;

      // Boundary check and bounce
      if (Math.abs(positions[i3]) > 5) velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 5) velocities[i].z *= -1;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.001;

    if (light.current) {
      light.current.position.x = mouse.x * 10;
      light.current.position.y = mouse.y * 10;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="#4f46e5" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#4f46e5"
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <ambientLight intensity={0.5} />
    </>
  );
}