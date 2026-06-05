import React from 'react';
import { motion } from 'motion/react';

interface FloatingCard3DProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FloatingCard3D: React.FC<FloatingCard3DProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
