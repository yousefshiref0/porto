import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SkillCard } from '../components/SkillCard';
import { useSkillsByCategory } from '../utils/hooks';

export const Skills: React.FC = () => {
  const { skills: groupedSkills } = useSkillsByCategory();

  const defaultSkills = {
    Hardware: [
      { name: 'Embedded Systems', level: 90, category: 'Hardware' },
      { name: 'Microcontrollers', level: 95, category: 'Hardware' },
      { name: 'Electronics', level: 88, category: 'Hardware' },
      { name: 'Hardware System Development', level: 90, category: 'Hardware' },
    ],
    Software: [
      { name: 'React', level: 95, category: 'Software' },
      { name: 'Node.js', level: 90, category: 'Software' },
      { name: 'Python', level: 88, category: 'Software' },
      { name: 'TypeScript', level: 92, category: 'Software' },
      { name: 'Full Stack', level: 90, category: 'Software' },
    ],
    Mobile: [
      { name: 'React Native', level: 85, category: 'Mobile' },
      { name: 'Flutter', level: 80, category: 'Mobile' },
      { name: 'iOS Development', level: 75, category: 'Mobile' },
      { name: 'Android Development', level: 78, category: 'Mobile' },
    ],
    IoT: [
      { name: 'MQTT', level: 90, category: 'IoT' },
      { name: 'Sensor Integration', level: 92, category: 'IoT' },
      { name: 'Edge Computing', level: 85, category: 'IoT' },
      { name: 'Cloud Integration', level: 88, category: 'IoT' },
    ],
  };

  // Merge database skills with defaults, excluding "PCB Design"
  const displaySkills = Object.keys(groupedSkills || {}).length > 0 ? groupedSkills : defaultSkills;
  
  // Filter out "PCB Design" from all categories
  const filteredSkills = Object.entries(displaySkills || {}).reduce((acc, [category, skills]: [string, any]) => {
    acc[category] = skills.filter((skill: any) => skill.name !== 'PCB Design');
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-[#F8F5EC] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            MY SKILLS
          </h1>
          <div className="w-32 h-2 bg-[#FF6B35] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A comprehensive toolkit spanning hardware design, software engineering, mobile development, and IoT solutions.
          </p>

          {/* Hand-drawn annotation */}
          <div className="handwritten text-2xl text-[#4F46E5] mt-4">
            Always learning & growing!
          </div>
        </motion.div>

        {/* Skills by Category */}
        {Object.entries(filteredSkills).map(([category, categorySkills]: [string, any], categoryIndex) => (
          <section key={category} className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary text-[#F8F5EC] px-6 py-3 border-4 border-primary font-black text-2xl">
                  {category}
                </div>
                <div className="flex-1 h-1 bg-primary"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorySkills.map((skill: any, index: number) => (
                  <SkillCard
                    key={skill.name || index}
                    name={skill.name}
                    level={skill.level || 80}
                    category={category}
                  />
                ))}
              </div>
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
};
