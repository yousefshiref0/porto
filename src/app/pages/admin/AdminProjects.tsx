import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/Button';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../utils/api';

export const AdminProjects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        toast.success('Project deleted');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EC] pt-8 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black mb-2">PROJECTS</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-sm text-gray-600 hover:text-primary"
            >
              ← Back to Dashboard
            </button>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/admin/projects/new')}
          >
            <Plus size={20} className="inline mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects List */}
        {isLoading ? (
          <div className="text-center py-20">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first project to get started.</p>
            <Button variant="primary" onClick={() => navigate('/admin/projects/new')}>
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white border-4 border-primary p-6"
                style={{ boxShadow: '8px 8px 0px 0px #111111' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black">{project.title}</h3>
                      <span className="px-3 py-1 bg-[#4F46E5] text-white text-xs font-bold border-2 border-primary">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 bg-[#FFD93D] text-primary text-xs font-bold border-2 border-primary">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 5).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-[#F8F5EC] border border-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="p-2 border-2 border-primary bg-white hover:bg-[#F8F5EC]"
                      title="View"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                      className="p-2 border-2 border-primary bg-[#FFD93D] hover:bg-[#FFD93D]/80"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 border-2 border-primary bg-red-500 text-white hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
