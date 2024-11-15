import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative inline-block">
        <span className="relative z-10">{text}</span>
        <motion.span
          className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen bg-clip-text text-transparent"
          style={{ WebkitTextFillColor: 'transparent' }}
          animate={{
            x: [0, -2, 0, 2, 0],
            y: [0, 1, -1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen bg-clip-text text-transparent"
          style={{ WebkitTextFillColor: 'transparent' }}
          animate={{
            x: [0, 2, 0, -2, 0],
            y: [0, -1, 1, 0],
          }}
          transition={{
            duration: 0.45,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      </span>
    </span>
  );
};

export default GlitchText;