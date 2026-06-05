// User & Admin Types
export interface AdminUser {
  id: string;
  email: string;
  password_hash?: string;
  created_at?: string;
  updated_at?: string;
}

// Profile/About Section
export interface ProfileData {
  id?: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  created_at?: string;
  updated_at?: string;
}

// Skills
export interface Skill {
  id?: string;
  name: string;
  category: 'Hardware' | 'Software' | 'Mobile' | 'IoT';
  percentage: number;
  icon?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Projects
export interface Project {
  id?: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  technologies: string[];
  github_link?: string;
  live_link?: string;
  category: string;
  featured: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

// Experience
export interface Experience {
  id?: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  start_date: string;
  end_date?: string;
  is_current: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

// Contact Messages
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

// Analytics
export interface AnalyticsEvent {
  id?: string;
  page: string;
  event_type: string;
  timestamp?: string;
}

// Dashboard Stats
export interface DashboardStats {
  total_views: number;
  total_projects: number;
  total_messages: number;
  total_visitors: number;
}
