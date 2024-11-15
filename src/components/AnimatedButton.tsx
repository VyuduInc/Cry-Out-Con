import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  whileHover?: object;
  whileTap?: object;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = '',
  onClick,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
}) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;