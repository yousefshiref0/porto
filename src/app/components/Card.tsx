import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-[#F8F5EC] border-4 border-primary p-6';

  return (
    <motion.div
      className={`${baseClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={
        hover
          ? {
              translateX: 4,
              translateY: 4,
              boxShadow: '4px 4px 0px 0px #111111',
            }
          : {}
      }
      style={{
        boxShadow: '8px 8px 0px 0px #111111',
      }}
    >
      {children}
    </motion.div>
  );
};
