import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uScroll: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float elevation = sin(pos.x * 3.0 + uTime) * 0.2
                     + sin(pos.y * 2.0 + uTime) * 0.2;
                     
      pos.z += elevation;
      
      float distanceToMouse = length(uv - uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, distanceToMouse);
      pos.z += mouseInfluence * sin(uTime * 2.0) * 0.2;
      
      pos.z += sin(pos.x * 2.0 + uTime * 0.5 + uScroll * 0.1) * 0.1;
      
      vElevation = pos.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uColorAccent;
    varying float vElevation;
    
    void main() {
      vec3 colorA = vec3(0.1, 0.1, 0.4);
      vec3 colorB = vec3(0.3, 0.2, 0.8);
      float mixStrength = (vElevation + 0.25) * 0.8;
      vec3 color = mix(colorA, colorB, mixStrength);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const Wave = ({ scroll = 0, mouse = { x: 0, y: 0 } }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.5;
      materialRef.current.uniforms.uScroll.value = scroll * 0.001;
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.3, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[15, 15, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={WaveShaderMaterial.vertexShader}
        fragmentShader={WaveShaderMaterial.fragmentShader}
        uniforms={WaveShaderMaterial.uniforms}
      />
    </mesh>
  );
};

export const ScrollEffect = ({ scroll }) => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Wave scroll={scroll} mouse={mouse} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};