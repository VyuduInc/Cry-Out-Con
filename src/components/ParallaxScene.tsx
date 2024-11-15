import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Trail, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParallaxObjectProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  rotationSpeed: number;
  scrollY: number;
  type: 'sphere' | 'torus' | 'ring';
}

const LuxuryObject = ({ position, scale, color, speed, rotationSpeed, scrollY, type }: ParallaxObjectProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    const scrollEffect = scrollY * 0.0005 * speed;
    
    // Smoother, more elegant movement
    mesh.current.position.y = initialY - scrollEffect;
    mesh.current.position.x = position[0] + Math.sin(time * speed * 0.3) * 0.2;
    mesh.current.position.z = position[2] + Math.cos(time * speed * 0.3) * 0.2;
    
    // Subtle, refined rotation
    mesh.current.rotation.x = Math.sin(time * rotationSpeed * 0.3) * 0.1;
    mesh.current.rotation.y = time * rotationSpeed * 0.1;
  });

  const Geometry = () => {
    switch (type) {
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 32, 100]} />;
      case 'ring':
        return <ringGeometry args={[0.7, 1, 32]} />;
      default:
        return <sphereGeometry args={[1, 64, 64]} />;
    }
  };

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <Trail
        width={0.1}
        length={4}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
      >
        <mesh ref={mesh} position={position} scale={scale}>
          <Geometry />
          <MeshDistortMaterial
            color={color}
            envMapIntensity={0.4}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            metalness={0.9}
            roughness={0.3}
            distort={0.2}
            speed={0.5}
          />
        </mesh>
      </Trail>
    </Float>
  );
};

const ParallaxObjects = ({ scrollY }: { scrollY: number }) => {
  // Define a luxury color palette
  const luxuryColors = [
    '#4A90E2', // Electric Blue
    '#81DCFF', // Light Blue
    '#3D5AFE', // Bright Blue
    '#0A2463', // Deep Blue
    '#7400B8', // Royal Purple
  ];

  // Generate more sophisticated object arrangements
  const objects = useMemo(() => {
    const types: ('sphere' | 'torus' | 'ring')[] = ['sphere', 'torus', 'ring'];
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.2,
      color: luxuryColors[Math.floor(Math.random() * luxuryColors.length)],
      speed: Math.random() * 1 + 0.5,
      rotationSpeed: Math.random() * 1 + 0.2,
      type: types[Math.floor(Math.random() * types.length)],
      layer: Math.floor(Math.random() * 3)
    }));
  }, []);

  const sortedObjects = useMemo(() => {
    return [...objects].sort((a, b) => a.layer - b.layer);
  }, [objects]);

  return (
    <group>
      {sortedObjects.map((obj, i) => (
        <LuxuryObject
          key={i}
          position={obj.position}
          scale={obj.scale}
          color={obj.color}
          speed={obj.speed}
          rotationSpeed={obj.rotationSpeed}
          scrollY={scrollY}
          type={obj.type}
        />
      ))}
    </group>
  );
};

const ParallaxScene = ({ scrollY }: { scrollY: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false
        }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#000', 15, 25]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <ParallaxObjects scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default ParallaxScene;