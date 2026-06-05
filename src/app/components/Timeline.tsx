import React from 'react';
import { motion } from 'motion/react';

interface TimelineItem {
  id: string;
  title: string;
  company?: string;
  position?: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies?: string[];
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary transform md:-translate-x-1/2"></div>

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`relative mb-12 ${
            index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
          }`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Timeline dot */}
          <div
            className={`absolute top-0 ${
              index % 2 === 0
                ? 'right-0 md:right-[-20px]'
                : 'left-0 md:left-[-20px]'
            } w-10 h-10 bg-[#FF6B35] border-4 border-primary rounded-full z-10 flex items-center justify-center`}
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>

          {/* Content card */}
          <div
            className={`bg-white border-4 border-primary p-6 ml-16 md:ml-0 ${
              index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
            }`}
            style={{
              boxShadow: '8px 8px 0px 0px #111111',
            }}
          >
            {/* Date badge */}
            <div className="inline-block bg-[#FFD93D] border-2 border-primary px-3 py-1 text-sm font-bold mb-3 transform -rotate-1">
              {item.startDate} - {item.endDate || (item.current ? 'Present' : 'N/A')}
            </div>

            {/* Position/Title */}
            <h3 className="text-2xl font-black mb-1">
              {item.position || item.title}
            </h3>

            {/* Company */}
            {item.company && (
              <h4 className="text-xl font-bold text-[#4F46E5] mb-3">
                {item.company}
              </h4>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-4">{item.description}</p>

            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-[#F8F5EC] border-2 border-primary font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Hand-drawn decoration */}
            <div className="absolute top-2 right-2 w-6 h-6 border-2 border-[#FF6B35] rounded-full opacity-30 transform rotate-12"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
