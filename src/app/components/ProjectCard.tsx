import React from 'react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  featured?: boolean;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  tags = [],
  coverImage,
  featured = false,
  onClick,
}) => {
  return (
    <motion.div
      className="bg-white border-4 border-primary overflow-hidden cursor-pointer group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        translateX: 6,
        translateY: 6,
        boxShadow: '6px 6px 0px 0px #111111',
      }}
      style={{
        boxShadow: '10px 10px 0px 0px #111111',
      }}
      onClick={onClick}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20 bg-[#FF6B35] text-white px-3 py-1 border-2 border-primary font-bold text-sm transform rotate-3">
          FEATURED
        </div>
      )}

      {/* Cover Image */}
      {coverImage ? (
        <div className="relative h-48 bg-gray-200 border-b-4 border-primary overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] border-b-4 border-primary flex items-center justify-center">
          <div className="text-6xl font-black text-primary opacity-20">
            {title.charAt(0)}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="inline-block bg-[#4F46E5] text-white px-3 py-1 text-xs font-bold mb-3 border-2 border-primary transform -rotate-1">
          {category}
        </div>

        <h3 className="text-2xl font-black mb-2 group-hover:text-[#FF6B35] transition-colors">
          {title}
        </h3>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[#F8F5EC] border-2 border-primary font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs px-2 py-1 handwritten text-gray-500">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Hand-drawn arrow indicator */}
        <div className="mt-4 flex items-center gap-2 handwritten text-[#FF6B35]">
          <span>View details</span>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="group-hover:translate-x-2 transition-transform">
            <path d="M 2 10 Q 15 8 28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M 28 10 L 24 6 M 28 10 L 24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
