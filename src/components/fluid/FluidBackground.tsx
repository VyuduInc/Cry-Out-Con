import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FluidShader } from './FluidShader';

const WaveMesh = ({ scrollY }: { scrollY: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / size.width;
      const y = 1 - (e.clientY / size.height);
      mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, x, 0.1);
      mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, y, 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame(({ clock }) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.5;
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      
      // Adjust wave parameters based on scroll
      const scrollFactor = scrollY * 0.001;
      materialRef.current.uniforms.uWaveAmplitude.value = 0.1 + scrollFactor * 0.05;
      materialRef.current.uniforms.uWaveFrequency.value = 3.0 + scrollFactor * 0.5;
      materialRef.current.uniforms.uNoiseStrength.value = 0.2 + scrollFactor * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.3, 0, 0]}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FluidShader.vertexShader}
        fragmentShader={FluidShader.fragmentShader}
        uniforms={THREE.UniformsUtils.clone(FluidShader.uniforms)}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const FluidBackground = ({ scrollY = 0 }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        dpr={[1, 2]}
      >
        <WaveMesh scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default FluidBackground;