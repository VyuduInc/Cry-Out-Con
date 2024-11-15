import * as THREE from 'three';

export const FluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uScroll: { value: 0 },
    uWaveAmplitude: { value: 0.1 },
    uWaveFrequency: { value: 3.0 },
    uNoiseStrength: { value: 0.2 },
    uNoiseSpeed: { value: 0.5 },
    uDepthColor: { value: new THREE.Color('#2d1b4e') },  // Darker purple
    uSurfaceColor: { value: new THREE.Color('#9d4edd') }, // Brighter purple
    uColorStart: { value: 0.3 },
    uColorEnd: { value: 0.9 }
  },

  vertexShader: `
    uniform float uTime;
    uniform float uWaveAmplitude;
    uniform float uWaveFrequency;
    uniform float uNoiseStrength;
    uniform vec2 uMouse;

    varying vec2 vUv;
    varying float vElevation;

    // Improved noise function
    vec4 permute(vec4 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
    }

    vec2 fade(vec2 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    float cnoise(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod(Pi, 289.0);
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x,gy.x);
      vec2 g10 = vec2(gx.y,gy.y);
      vec2 g01 = vec2(gx.z,gy.z);
      vec2 g11 = vec2(gx.w,gy.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;
      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));
      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    void main() {
      vUv = uv;
      
      vec2 noiseCoord = uv * uWaveFrequency + uTime * 0.2;
      float noise = cnoise(noiseCoord) * uNoiseStrength;
      
      // Create multiple wave layers with different frequencies
      float elevation = 
        sin(uv.x * uWaveFrequency + uTime) * uWaveAmplitude +
        sin(uv.y * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveAmplitude +
        sin((uv.x + uv.y) * uWaveFrequency * 0.6 + uTime * 0.8) * uWaveAmplitude * 0.5 +
        noise;
        
      // Enhanced mouse interaction
      float distanceToMouse = length(uv - uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, distanceToMouse);
      elevation += mouseInfluence * 0.2 * sin(uTime * 2.0);
      
      // Add ripple effect
      float ripple = sin(distanceToMouse * 20.0 - uTime * 3.0) * 0.02 * mouseInfluence;
      elevation += ripple;
      
      vec3 transformed = position + normal * elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,

  fragmentShader: `
    uniform vec3 uDepthColor;
    uniform vec3 uSurfaceColor;
    uniform float uColorStart;
    uniform float uColorEnd;
    uniform float uTime;
    uniform vec2 uMouse;

    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + uColorStart) * (uColorEnd - uColorStart);
      vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
      
      // Add iridescent effect
      float iridescence = sin(vUv.x * 10.0 + uTime) * 0.1 +
                         cos(vUv.y * 8.0 - uTime * 0.5) * 0.1;
      color += vec3(0.1, 0.2, 0.3) * iridescence;
      
      // Enhanced highlights
      float highlight = smoothstep(0.2, 0.4, vElevation);
      color += vec3(0.3, 0.2, 0.5) * highlight * 0.3;
      
      // Mouse interaction glow
      float distanceToMouse = length(vUv - uMouse);
      float glow = exp(-distanceToMouse * 4.0) * 0.4;
      color += vec3(0.5, 0.3, 1.0) * glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};