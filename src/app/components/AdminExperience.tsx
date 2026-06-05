import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useExperience } from '../utils/hooks';
import { experienceService } from '../utils/supabaseClient';
import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ExperienceFormData {
  role: string;
  company: string;
  description: string;
  technologies: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export const AdminExperience: React.FC = () => {
  const { experience, refetch } = useExperience();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>({
    role: '',
    company: '',
    description: '',
    technologies: '',
    start_date: new Date().getFullYear().toString(),
    end_date: 'Present',
    is_current: false,
  });

  const resetForm = () => {
    setFormData({
      role: '',
      company: '',
      description: '',
      technologies: '',
      start_date: new Date().getFullYear().toString(),
      end_date: 'Present',
      is_current: false,
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (exp: any) => {
    setFormData({
      role: exp.role || '',
      company: exp.company || '',
      description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : exp.technologies || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current || false,
    });
    setEditingId(exp.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const techArray = formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      const payload = {
        role: formData.role,
        company: formData.company,
        description: formData.description,
        technologies: techArray,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_current: formData.is_current || formData.end_date === 'Present',
      };

      if (editingId) {
        await experienceService.updateExperience(editingId, payload);
        toast.success('Experience updated successfully!');
      } else {
        await experienceService.createExperience(payload);
        toast.success('Experience created successfully!');
      }
      await refetch();
      resetForm();
    } catch (error: any) {
      toast.error('Error saving experience');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      await experienceService.deleteExperience(id);
      toast.success('Experience deleted successfully!');
      await refetch();
    } catch (error: any) {
      toast.error('Error deleting experience');
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as any;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-[#111111]">Experience Management</h2>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Experience
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={resetForm}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white border-4 border-primary p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '12px 12px 0px 0px #111111' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black mb-6">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Role/Position *</label>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., Senior Hardware Engineer"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Company *</label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Company Inc."
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What did you do?"
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-primary"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Technologies (comma-separated)</label>
                <Input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Start Date</label>
                  <Input
                    type="text"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    placeholder="e.g., 2020"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">End Date</label>
                  <Input
                    type="text"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    placeholder="e.g., 2023 or Present"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-bold">Currently working here</span>
              </label>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Saving...' : 'Save Experience'}
                </Button>
                <Button
                  type="button"
                  variant="accent"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Experience Timeline */}
      <div className="space-y-4">
        {experience && experience.length > 0 ? (
          experience.map((exp: any) => (
            <Card key={exp.id} hover>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    {exp.is_current && (
                      <span className="bg-[#4F46E5] text-white px-2 py-1 text-xs font-bold rounded">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-bold mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {exp.start_date} - {exp.end_date}
                  </p>

                  {exp.description && (
                    <p className="text-gray-600 mb-3">{exp.description}</p>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(exp.technologies) ? exp.technologies : [exp.technologies]).map(
                        (tech: string, i: number) => (
                          <span
                            key={i}
                            className="bg-[#FFD93D] text-[#111111] px-2 py-1 text-xs font-bold rounded"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 size={18} className="text-[#4F46E5]" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 size={18} className="text-[#FF6B35]" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No experience entries yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
