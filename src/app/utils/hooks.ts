import { useState, useEffect } from 'react';
import {
  profileService,
  skillsService,
  projectsService,
  experienceService,
  messagesService,
  analyticsService,
} from './supabaseClient';

// Profile Hook
export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

// Skills Hook
export const useSkills = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillsService.getSkills();
        setSkills(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch skills');
        console.error('Skills error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};

// Skills by Category Hook
export const useSkillsByCategory = (category: string) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      setSkills([]);
      setLoading(false);
      return;
    }

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillsService.getSkillsByCategory(category);
        setSkills(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch skills');
        console.error('Skills error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [category]);

  return { skills, loading, error };
};

// Projects Hook
export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getProjects();
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch projects');
        console.error('Projects error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Featured Projects Hook
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getFeaturedProjects();
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch projects');
        console.error('Projects error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Project by ID Hook
export const useProject = (id: string | undefined) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProject(null);
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getProjectById(id);
        setProject(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch project');
        console.error('Project error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};

// Experience Hook
export const useExperience = () => {
  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getExperience();
        setExperience(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch experience');
        console.error('Experience error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
};

// Messages Hook
export const useMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messagesService.getMessages();
      setMessages(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch messages');
      console.error('Messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, loading, error, refetch: fetchMessages };
};

// Stats Hook
export const useStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch stats');
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
