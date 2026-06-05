import React from 'react';
import { motion } from 'motion/react';

interface HandDrawnArrowProps {
  direction?: 'down' | 'right' | 'up' | 'left';
  className?: string;
  color?: string;
}

export const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({
  direction = 'down',
  className = '',
  color = '#FF6B35',
}) => {
  const rotations = {
    down: 0,
    right: -90,
    up: 180,
    left: 90,
  };

  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ rotate: `${rotations[direction]}deg` }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.path
        d="M 50 10 Q 48 30 50 50 Q 52 70 50 85"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d="M 50 85 L 35 70 M 50 85 L 65 70"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
    </motion.svg>
  );
};
