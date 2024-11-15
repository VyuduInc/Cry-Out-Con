import React from 'react';
import { motion } from 'framer-motion';

interface NeonTextProps {
  text: string;
  className?: string;
}

const NeonText: React.FC<NeonTextProps> = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial="initial"
      animate="animate"
    >
      {/* Base text with strong glow */}
      <span className="relative inline-block">
        {/* Outermost pink glow */}
        <motion.span
          className="absolute inset-0 blur-[40px] bg-gradient-to-r from-pink-500/70 via-purple-500/70 to-blue-500/70 bg-clip-text text-transparent"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            filter: [
              'brightness(1)',
              'brightness(1.5)',
              'brightness(1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>

        {/* Middle purple glow */}
        <motion.span
          className="absolute inset-0 blur-[25px] bg-gradient-to-r from-purple-600/80 via-blue-500/80 to-purple-600/80 bg-clip-text text-transparent"
          animate={{
            opacity: [0.5, 0.9, 0.5],
            filter: [
              'brightness(1.2)',
              'brightness(1.8)',
              'brightness(1.2)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          {text}
        </motion.span>

        {/* Inner blue glow */}
        <motion.span
          className="absolute inset-0 blur-[15px] bg-gradient-to-r from-blue-400/90 via-pink-400/90 to-blue-400/90 bg-clip-text text-transparent"
          animate={{
            opacity: [0.6, 1, 0.6],
            filter: [
              'brightness(1.4)',
              'brightness(2)',
              'brightness(1.4)',
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          {text}
        </motion.span>

        {/* Main text */}
        <motion.span
          className="relative inline-block text-transparent bg-clip-text"
          style={{
            background: 'linear-gradient(45deg, #fff 10%, #fdf2f8 30%, #fff 50%, #ede9fe 70%, #fff 90%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            textShadow: `
              0 0 10px rgba(236, 72, 153, 0.7),
              0 0 20px rgba(139, 92, 246, 0.6),
              0 0 30px rgba(59, 130, 246, 0.5),
              0 0 40px rgba(236, 72, 153, 0.4),
              0 0 70px rgba(139, 92, 246, 0.3),
              0 0 90px rgba(59, 130, 246, 0.2)
            `,
          }}
          animate={{
            filter: [
              'brightness(1.2)',
              'brightness(1.8)',
              'brightness(1.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>

        {/* Flickering effect */}
        <motion.span
          className="absolute inset-0"
          animate={{
            opacity: [1, 0.9, 1, 0.95, 1],
            filter: [
              'brightness(1)',
              'brightness(1.2)',
              'brightness(1)',
              'brightness(1.1)',
              'brightness(1)',
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          {text}
        </motion.span>

        {/* Enhanced corona effect */}
        <motion.span
          className="absolute inset-0"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))',
              'drop-shadow(0 0 20px rgba(236, 72, 153, 0.9)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.7)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.5))',
              'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      </span>
    </motion.span>
  );
};

export default NeonText;