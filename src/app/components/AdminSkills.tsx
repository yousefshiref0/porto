import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSkills } from '../utils/hooks';
import { skillsService } from '../utils/supabaseClient';
import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface SkillFormData {
  name: string;
  category: string;
  percentage: number;
  description: string;
}

export const AdminSkills: React.FC = () => {
  const { skills, refetch } = useSkills();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'Software',
    percentage: 80,
    description: '',
  });

  const categories = ['Hardware', 'Software', 'Mobile', 'IoT'];

  const resetForm = () => {
    setFormData({ name: '', category: 'Software', percentage: 80, description: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (skill: any) => {
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Software',
      percentage: skill.percentage || skill.level || 80,
      description: skill.description || '',
    });
    setEditingId(skill.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await skillsService.updateSkill(editingId, {
          name: formData.name,
          category: formData.category,
          percentage: formData.percentage,
          description: formData.description,
        });
        toast.success('Skill updated successfully!');
      } else {
        await skillsService.createSkill({
          name: formData.name,
          category: formData.category,
          percentage: formData.percentage,
          description: formData.description,
        });
        toast.success('Skill created successfully!');
      }
      await refetch();
      resetForm();
    } catch (error: any) {
      toast.error('Error saving skill');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillsService.deleteSkill(id);
      toast.success('Skill deleted successfully!');
      await refetch();
    } catch (error: any) {
      toast.error('Error deleting skill');
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'percentage' ? parseInt(value) : value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-[#111111]">Skills Management</h2>
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
          Add Skill
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
            className="bg-white border-4 border-primary p-8 max-w-md w-full"
            style={{ boxShadow: '12px 12px 0px 0px #111111' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black mb-6">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Skill Name *</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., React"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-primary bg-white"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">Proficiency Level (%)</label>
                <Input
                  type="number"
                  name="percentage"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-primary"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Saving...' : 'Save Skill'}
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills && skills.length > 0 ? (
          skills.map((skill: any) => (
            <Card key={skill.id} hover>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="bg-[#FFD93D] text-[#111111] px-2 py-1 rounded font-bold">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 size={18} className="text-[#4F46E5]" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 size={18} className="text-[#FF6B35]" />
                  </button>
                </div>
              </div>

              {/* Proficiency Bar */}
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">Proficiency</span>
                  <span className="text-sm font-bold text-[#4F46E5]">
                    {skill.percentage || skill.level || 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6B35]"
                    style={{ width: `${skill.percentage || skill.level || 0}%` }}
                  />
                </div>
              </div>

              {skill.description && (
                <p className="text-sm text-gray-600">{skill.description}</p>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No skills yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
