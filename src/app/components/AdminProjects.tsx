import React, { useState } from 'react';
import { useProjects } from '../utils/hooks';
import { projectsService } from '../utils/supabaseClient';
import { Button } from './Button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export const AdminProjects: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    image_url: '',
    technologies: '',
    github_link: '',
    live_link: '',
    category: 'Web',
    featured: false,
  });

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      short_description: '',
      image_url: '',
      technologies: '',
      github_link: '',
      live_link: '',
      category: 'Web',
      featured: false,
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      short_description: project.short_description,
      image_url: project.image_url || '',
      technologies: (project.technologies || []).join(', '),
      github_link: project.github_link || '',
      live_link: project.live_link || '',
      category: project.category,
      featured: project.featured,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        short_description: formData.short_description,
        image_url: formData.image_url,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        github_link: formData.github_link,
        live_link: formData.live_link,
        category: formData.category,
        featured: formData.featured,
      };

      if (editingId) {
        await projectsService.updateProject(editingId, projectData);
        toast.success('Project updated successfully');
      } else {
        await projectsService.createProject(projectData);
        toast.success('Project created successfully');
      }

      setShowForm(false);
      window.location.reload(); // Refresh projects list
    } catch (error: any) {
      toast.error(error.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsService.deleteProject(id);
      toast.success('Project deleted successfully');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete project');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#111111]">Projects Management</h2>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Project
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#F8F5EC] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#111111] text-[#F8F5EC] p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Project</h3>
              <button
                onClick={() => setShowForm(false)}
                className="hover:bg-[#1a1a1a] p-2 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#111111] rounded"
              />

              <input
                type="text"
                placeholder="Short Description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#111111] rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#111111] rounded h-24"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#111111] rounded"
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#111111] rounded"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={formData.github_link}
                  onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#111111] rounded"
                />
                <input
                  type="text"
                  placeholder="Live Link"
                  value={formData.live_link}
                  onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#111111] rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#111111] rounded"
                >
                  <option>Web</option>
                  <option>Mobile</option>
                  <option>Hardware</option>
                  <option>IoT</option>
                </select>

                <label className="flex items-center gap-2 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span className="text-[#111111]">Featured</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#4F46E5] hover:bg-[#4539CC] text-white"
                >
                  Save Project
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-[#FF6B35] hover:bg-[#FF5A1E] text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#111111] text-[#F8F5EC] rounded-lg overflow-hidden border-2 border-[#4F46E5]/30 hover:border-[#4F46E5] transition-colors"
          >
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-[#F8F5EC]/70 mb-4">{project.short_description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies &&
                  project.technologies.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-[#4F46E5] rounded"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#4F46E5] hover:bg-[#4539CC] rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#FF5A1E] rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
