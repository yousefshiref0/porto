import React from 'react';
import { motion } from 'motion/react';

interface SkillCardProps {
  name: string;
  level?: number;
  icon?: string;
  category: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level = 80,
  icon,
  category,
}) => {
  return (
    <motion.div
      className="bg-white border-4 border-primary p-4 relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        translateX: 4,
        translateY: 4,
        boxShadow: '4px 4px 0px 0px #111111',
      }}
      style={{
        boxShadow: '6px 6px 0px 0px #111111',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative hand-drawn circle */}
      <div className="absolute top-2 right-2 w-8 h-8 border-2 border-[#FFD93D] rounded-full opacity-50 transform rotate-12"></div>

      <div className="relative z-10">
        {icon && (
          <div className="text-3xl mb-2">{icon}</div>
        )}
        <h4 className="font-bold text-lg mb-2">{name}</h4>

        {/* Skill level bar */}
        <div className="relative h-3 bg-gray-200 border-2 border-primary mt-3">
          <motion.div
            className="h-full bg-[#FF6B35]"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Hand-drawn annotation */}
        <div className="handwritten text-sm text-[#4F46E5] mt-2 opacity-70">
          {level}%
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-0 left-0 bg-[#FFD93D] border-2 border-primary px-2 py-1 text-xs font-bold transform -rotate-2">
        {category}
      </div>
    </motion.div>
  );
};
