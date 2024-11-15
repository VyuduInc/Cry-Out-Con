import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SpotlightEffectProps {
  sectionRef: React.RefObject<HTMLElement>;
  delay?: number;
  color?: string;
}

const SpotlightEffect: React.FC<SpotlightEffectProps> = ({ 
  sectionRef, 
  delay = 0,
  color = "purple"
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const spotlightOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.6, 0.7],
    [0, 1, 1, 0]
  );
  
  const spotlightScale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [0.8, 1.2, 0.8]
  );

  const colors = {
    purple: {
      primary: "139, 92, 246",
      secondary: "168, 85, 247",
      tertiary: "147, 51, 234"
    },
    blue: {
      primary: "59, 130, 246",
      secondary: "37, 99, 235",
      tertiary: "29, 78, 216"
    },
    pink: {
      primary: "236, 72, 153",
      secondary: "219, 39, 119",
      tertiary: "190, 24, 93"
    }
  };

  const selectedColor = colors[color as keyof typeof colors];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: spotlightOpacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          scale: spotlightScale,
          background: `radial-gradient(circle, rgba(${selectedColor.primary}, 0.3) 0%, rgba(${selectedColor.primary}, 0) 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          scale: spotlightScale,
          background: `radial-gradient(circle, rgba(${selectedColor.secondary}, 0.2) 0%, rgba(${selectedColor.secondary}, 0) 60%)`,
          filter: 'blur(40px)',
          animationDelay: '0.2s',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-pulse"
        style={{
          scale: spotlightScale,
          background: `radial-gradient(circle, rgba(${selectedColor.tertiary}, 0.1) 0%, rgba(${selectedColor.tertiary}, 0) 50%)`,
          filter: 'blur(20px)',
          animationDelay: '0.4s',
        }}
      />
    </motion.div>
  );
};

export default SpotlightEffect;