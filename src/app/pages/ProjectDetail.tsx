import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../utils/api';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data.project))
      .catch(console.error);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F5EC] pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div className="text-2xl font-bold">Loading project...</div>
        </div>
      </div>
    );
  }

  const images = project.images || [];
  const allImages = project.coverImage ? [project.coverImage, ...images] : images;

  return (
    <div className="min-h-screen bg-[#F8F5EC] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 mb-8 px-4 py-2 border-2 border-primary bg-white hover:bg-[#F8F5EC] transition-colors font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        {/* Hero Image / Gallery */}
        {allImages.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative border-8 border-primary bg-white overflow-hidden" style={{ boxShadow: '12px 12px 0px 0px #111111' }}>
              <img
                src={allImages[currentImageIndex]}
                alt={project.title}
                className="w-full h-96 object-cover"
              />

              {/* Image navigation */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {allImages.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 border-2 border-primary ${
                        index === currentImageIndex ? 'bg-[#FF6B35]' : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block bg-[#4F46E5] text-white px-4 py-2 border-2 border-primary font-bold mb-4">
                {project.category}
              </div>

              <h1 className="text-5xl font-black mb-4">{project.title}</h1>

              <p className="text-xl text-gray-700 mb-6">{project.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                {project.completionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span className="font-medium">{project.completionDate}</span>
                  </div>
                )}
                {project.status && (
                  <div className="flex items-center gap-2">
                    <Tag size={20} />
                    <span className="font-medium">{project.status}</span>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.githubUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github size={20} className="inline mr-2" />
                    GitHub
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="accent"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink size={20} className="inline mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <div>
            <motion.div
              className="bg-white border-4 border-primary p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{ boxShadow: '8px 8px 0px 0px #111111' }}
            >
              <h3 className="text-2xl font-black mb-4 border-b-2 border-primary pb-2">
                TECH STACK
              </h3>

              <div className="space-y-2">
                {(project.technologies || []).map((tech: string, index: number) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-[#F8F5EC] border-2 border-primary font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project Story */}
        {project.story && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6">PROJECT STORY</h2>
            <div className="bg-white border-4 border-primary p-8" style={{ boxShadow: '8px 8px 0px 0px #111111' }}>
              <p className="text-lg leading-relaxed whitespace-pre-line">{project.story}</p>
            </div>
          </motion.section>
        )}

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black mb-4">CHALLENGES</h3>
              <div className="bg-white border-4 border-primary p-6" style={{ boxShadow: '8px 8px 0px 0px #111111' }}>
                <p className="whitespace-pre-line">{project.challenges}</p>
              </div>
            </motion.div>
          )}

          {project.solutions && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black mb-4">SOLUTIONS</h3>
              <div className="bg-white border-4 border-primary p-6" style={{ boxShadow: '8px 8px 0px 0px #111111' }}>
                <p className="whitespace-pre-line">{project.solutions}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        {project.results && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6">RESULTS</h2>
            <div className="bg-[#FFD93D] border-4 border-primary p-8" style={{ boxShadow: '8px 8px 0px 0px #111111' }}>
              <p className="text-lg leading-relaxed whitespace-pre-line">{project.results}</p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};
