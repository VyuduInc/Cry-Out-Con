import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FluidMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uScroll: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uScroll;
    varying vec2 vUv;

    #define PI 3.14159265359

    vec3 colorA = vec3(0.1, 0.1, 0.4);
    vec3 colorB = vec3(0.3, 0.2, 0.8);

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse * 0.5;
      
      float time = uTime * 0.5;
      
      // Create fluid motion
      float distanceToMouse = length(uv - mouse);
      float mouseInfluence = smoothstep(0.5, 0.0, distanceToMouse);
      
      float noise = sin(uv.x * 10.0 + time) * 
                   cos(uv.y * 8.0 - time) * 
                   sin((uv.x + uv.y) * 5.0 - time);
                   
      noise += mouseInfluence * sin(distanceToMouse * 10.0 - time * 2.0);
      
      // Add scroll influence
      float scrollInfluence = uScroll * 0.001;
      noise += sin(uv.y * 10.0 + scrollInfluence) * 0.1;
      
      // Smooth color transition
      vec3 color = mix(colorA, colorB, noise * 0.5 + 0.5);
      
      // Add glow around mouse
      float glow = exp(-distanceToMouse * 4.0) * 0.5;
      color += vec3(0.3, 0.4, 1.0) * glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const FluidPlane = ({ scroll = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value = mouseRef.current;
      materialRef.current.uniforms.uScroll.value = scroll;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FluidMaterial.vertexShader}
        fragmentShader={FluidMaterial.fragmentShader}
        uniforms={FluidMaterial.uniforms}
        transparent
      />
    </mesh>
  );
};

const FluidBackground = ({ scroll }: { scroll: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidPlane scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default FluidBackground;