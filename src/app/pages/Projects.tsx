import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { API_BASE_URL } from '../utils/api';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch(console.error);
  }, []);

  const categories = ['All', 'Hardware', 'Software', 'IoT'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

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
            MY PROJECTS
          </h1>
          <div className="w-32 h-2 bg-[#FF6B35] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A showcase of hardware designs, software solutions, and IoT systems I've built.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-bold uppercase tracking-wider border-4 border-primary transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-[#F8F5EC]'
                  : 'bg-white text-primary hover:bg-[#F8F5EC]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: selectedCategory === category
                  ? '6px 6px 0px 0px #111111'
                  : '4px 4px 0px 0px #111111',
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
            <p className="text-gray-600">Projects will appear here once added via the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                tags={project.tags || []}
                coverImage={project.coverImage}
                featured={project.featured}
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
