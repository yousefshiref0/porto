import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Timeline } from '../components/Timeline';
import { API_BASE_URL } from '../utils/api';

export const Experience: React.FC = () => {
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/experience`)
      .then((res) => res.json())
      .then((data) => setExperience(data.experience || []))
      .catch(console.error);
  }, []);

  const defaultExperience = [
    {
      id: '1',
      position: 'Senior Hardware Engineer',
      company: 'Tech Company Inc.',
      description: 'Led the design and development of embedded systems for IoT devices. Managed a team of engineers and oversaw product lifecycle from concept to production.',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      technologies: ['Embedded Systems', 'ARM', 'C/C++', 'MQTT', 'IoT'],
    },
    {
      id: '2',
      position: 'Full Stack Developer',
      company: 'Software Solutions Ltd.',
      description: 'Developed scalable web applications using modern frameworks. Implemented RESTful APIs and microservices architecture.',
      startDate: '2020',
      endDate: 'Present',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    },
    {
      id: '3',
      position: 'Mobile App Developer',
      company: 'App Studio',
      description: 'Created cross-platform mobile applications for iOS and Android. Focused on user experience and performance optimization.',
      startDate: '2018',
      endDate: 'Present',
      technologies: ['React Native', 'Flutter', 'TypeScript', 'Firebase'],
    },
  ];

  const displayExperience = experience.length > 0 ? experience : defaultExperience;

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
            EXPERIENCE
          </h1>
          <div className="w-32 h-2 bg-[#FF6B35] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            My professional journey across hardware engineering, software development, and IoT systems.
          </p>

          {/* Hand-drawn annotation */}
          <div className="handwritten text-2xl text-[#4F46E5] mt-4">
            Building the future, one project at a time!
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16">
          <Timeline items={displayExperience} />
        </div>
      </div>
    </div>
  );
};
