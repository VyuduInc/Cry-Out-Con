import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ y }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
        style={{ y }}
      />
      
      {/* Light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 52%, transparent 55%),
            linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 52%, transparent 55%)
          `,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Particle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
    </motion.div>
  );
};

export default AnimatedBackground;