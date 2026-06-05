import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error);
  return error?.message || 'An error occurred';
};

// Profile Operations
export const profileService = {
  async getProfile() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(profileData: any) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([profileData], { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async uploadAvatar(file: File) {
    const fileName = `profile-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  },
};

// Skills Operations
export const skillsService = {
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category')
      .order('name');
    if (error) throw error;
    return data;
  },

  async getSkillsByCategory(category: string) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('name');
    if (error) throw error;
    return data;
  },

  async createSkill(skill: any) {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateSkill(id: string, skill: any) {
    const { data, error } = await supabase
      .from('skills')
      .update(skill)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSkill(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Projects Operations
export const projectsService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getFeaturedProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order')
      .limit(6);
    if (error) throw error;
    return data;
  },

  async getProjectById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateProject(id: string, project: any) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async uploadImage(file: File) {
    const fileName = `projects/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, file, { upsert: false });
    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('projects')
      .getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  },
};

// Experience Operations
export const experienceService = {
  async getExperience() {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('order')
      .order('start_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createExperience(exp: any) {
    const { data, error } = await supabase
      .from('experience')
      .insert([exp])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateExperience(id: string, exp: any) {
    const { data, error } = await supabase
      .from('experience')
      .update(exp)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteExperience(id: string) {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Messages Operations
export const messagesService = {
  async getMessages(limit = 100) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async createMessage(message: any) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateMessage(id: string, message: any) {
    const { data, error } = await supabase
      .from('messages')
      .update(message)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteMessage(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async markAsRead(id: string) {
    return this.updateMessage(id, { is_read: true });
  },
};

// Analytics Operations
export const analyticsService = {
  async trackPageView(page: string) {
    try {
      // Silently track, don't throw errors
      await supabase
        .from('analytics')
        .insert([{ page, event_type: 'page_view' }]);
    } catch (error) {
      console.log('Analytics tracking error (non-critical):', error);
    }
  },

  async getStats() {
    try {
      const [projects, messages, profiles] = await Promise.all([
        supabase.from('projects').select('count', { count: 'exact' }),
        supabase.from('messages').select('count', { count: 'exact' }),
        supabase.from('analytics').select('count', { count: 'exact' }),
      ]);

      return {
        total_projects: projects.count || 0,
        total_messages: messages.count || 0,
        total_views: profiles.count || 0,
        total_visitors: 0,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        total_projects: 0,
        total_messages: 0,
        total_views: 0,
        total_visitors: 0,
      };
    }
  },
};

// Auth Operations
export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async isAdmin() {
    try {
      const user = await this.getCurrentUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', user.id)
        .single();

      return !!data && !error;
    } catch {
      return false;
    }
  },
};
