import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================================================
// Authentication Middleware
// ============================================================================

const requireAuth = async (c: any, next: any) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Authentication error:', error);
    return c.json({ error: 'Unauthorized - Authentication failed' }, 401);
  }
};

// ============================================================================
// Health Check
// ============================================================================

app.get("/make-server-235c99c9/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================================
// Authentication Routes
// ============================================================================

// Sign up new admin user
app.post("/make-server-235c99c9/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    console.error('Sign up error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Get current user session
app.get("/make-server-235c99c9/auth/me", requireAuth, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// ============================================================================
// Projects Routes
// ============================================================================

// Get all projects (public)
app.get("/make-server-235c99c9/projects", async (c) => {
  try {
    const category = c.req.query('category');
    const featured = c.req.query('featured');

    const projects = await kv.getByPrefix('project:');
    let filteredProjects = projects.map((p: any) => p.value);

    if (category) {
      filteredProjects = filteredProjects.filter((p: any) => p.category === category);
    }

    if (featured === 'true') {
      filteredProjects = filteredProjects.filter((p: any) => p.featured === true);
    }

    // Sort by date (newest first)
    filteredProjects.sort((a: any, b: any) =>
      new Date(b.completionDate || b.createdAt).getTime() -
      new Date(a.completionDate || a.createdAt).getTime()
    );

    return c.json({ projects: filteredProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Get single project by ID (public)
app.get("/make-server-235c99c9/projects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const project = await kv.get(`project:${id}`);

    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    // Track project view
    await trackPageView(`/projects/${id}`, c);

    return c.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});

// Create project (protected)
app.post("/make-server-235c99c9/projects", requireAuth, async (c) => {
  try {
    const projectData = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const project = {
      id,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${id}`, project);
    return c.json({ project, message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

// Update project (protected)
app.put("/make-server-235c99c9/projects/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const existing = await kv.get(`project:${id}`);
    if (!existing) {
      return c.json({ error: 'Project not found' }, 404);
    }

    const project = {
      ...existing,
      ...updates,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${id}`, project);
    return c.json({ project, message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

// Delete project (protected)
app.delete("/make-server-235c99c9/projects/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`project:${id}`);
    return c.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// ============================================================================
// Skills Routes
// ============================================================================

// Get all skills (public)
app.get("/make-server-235c99c9/skills", async (c) => {
  try {
    const skills = await kv.getByPrefix('skill:');
    const skillsData = skills.map((s: any) => s.value);

    // Group by category
    const grouped = skillsData.reduce((acc: any, skill: any) => {
      const category = skill.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    return c.json({ skills: skillsData, grouped });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return c.json({ error: 'Failed to fetch skills' }, 500);
  }
});

// Create skill (protected)
app.post("/make-server-235c99c9/skills", requireAuth, async (c) => {
  try {
    const skillData = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const skill = {
      id,
      ...skillData,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`skill:${id}`, skill);
    return c.json({ skill, message: 'Skill created successfully' });
  } catch (error) {
    console.error('Error creating skill:', error);
    return c.json({ error: 'Failed to create skill' }, 500);
  }
});

// Update skill (protected)
app.put("/make-server-235c99c9/skills/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const existing = await kv.get(`skill:${id}`);
    if (!existing) {
      return c.json({ error: 'Skill not found' }, 404);
    }

    const skill = { ...existing, ...updates, id };
    await kv.set(`skill:${id}`, skill);
    return c.json({ skill, message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error);
    return c.json({ error: 'Failed to update skill' }, 500);
  }
});

// Delete skill (protected)
app.delete("/make-server-235c99c9/skills/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`skill:${id}`);
    return c.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return c.json({ error: 'Failed to delete skill' }, 500);
  }
});

// ============================================================================
// Experience Routes
// ============================================================================

// Get all experience entries (public)
app.get("/make-server-235c99c9/experience", async (c) => {
  try {
    const experiences = await kv.getByPrefix('experience:');
    const experienceData = experiences.map((e: any) => e.value);

    // Sort by start date (newest first)
    experienceData.sort((a: any, b: any) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return c.json({ experience: experienceData });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return c.json({ error: 'Failed to fetch experience' }, 500);
  }
});

// Create experience entry (protected)
app.post("/make-server-235c99c9/experience", requireAuth, async (c) => {
  try {
    const experienceData = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const experience = {
      id,
      ...experienceData,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`experience:${id}`, experience);
    return c.json({ experience, message: 'Experience created successfully' });
  } catch (error) {
    console.error('Error creating experience:', error);
    return c.json({ error: 'Failed to create experience' }, 500);
  }
});

// Update experience entry (protected)
app.put("/make-server-235c99c9/experience/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const existing = await kv.get(`experience:${id}`);
    if (!existing) {
      return c.json({ error: 'Experience not found' }, 404);
    }

    const experience = { ...existing, ...updates, id };
    await kv.set(`experience:${id}`, experience);
    return c.json({ experience, message: 'Experience updated successfully' });
  } catch (error) {
    console.error('Error updating experience:', error);
    return c.json({ error: 'Failed to update experience' }, 500);
  }
});

// Delete experience entry (protected)
app.delete("/make-server-235c99c9/experience/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`experience:${id}`);
    return c.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return c.json({ error: 'Failed to delete experience' }, 500);
  }
});

// ============================================================================
// Certifications Routes
// ============================================================================

// Get all certifications (public)
app.get("/make-server-235c99c9/certifications", async (c) => {
  try {
    const certifications = await kv.getByPrefix('certification:');
    const certificationsData = certifications.map((cert: any) => cert.value);

    // Sort by date (newest first)
    certificationsData.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return c.json({ certifications: certificationsData });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return c.json({ error: 'Failed to fetch certifications' }, 500);
  }
});

// Create certification (protected)
app.post("/make-server-235c99c9/certifications", requireAuth, async (c) => {
  try {
    const certificationData = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const certification = {
      id,
      ...certificationData,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`certification:${id}`, certification);
    return c.json({ certification, message: 'Certification created successfully' });
  } catch (error) {
    console.error('Error creating certification:', error);
    return c.json({ error: 'Failed to create certification' }, 500);
  }
});

// Update certification (protected)
app.put("/make-server-235c99c9/certifications/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const existing = await kv.get(`certification:${id}`);
    if (!existing) {
      return c.json({ error: 'Certification not found' }, 404);
    }

    const certification = { ...existing, ...updates, id };
    await kv.set(`certification:${id}`, certification);
    return c.json({ certification, message: 'Certification updated successfully' });
  } catch (error) {
    console.error('Error updating certification:', error);
    return c.json({ error: 'Failed to update certification' }, 500);
  }
});

// Delete certification (protected)
app.delete("/make-server-235c99c9/certifications/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`certification:${id}`);
    return c.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return c.json({ error: 'Failed to delete certification' }, 500);
  }
});

// ============================================================================
// Achievements Routes
// ============================================================================

// Get all achievements (public)
app.get("/make-server-235c99c9/achievements", async (c) => {
  try {
    const achievements = await kv.getByPrefix('achievement:');
    const achievementsData = achievements.map((a: any) => a.value);

    // Sort by date (newest first)
    achievementsData.sort((a: any, b: any) =>
      new Date(b.date || b.createdAt).getTime() -
      new Date(a.date || a.createdAt).getTime()
    );

    return c.json({ achievements: achievementsData });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return c.json({ error: 'Failed to fetch achievements' }, 500);
  }
});

// Create achievement (protected)
app.post("/make-server-235c99c9/achievements", requireAuth, async (c) => {
  try {
    const achievementData = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const achievement = {
      id,
      ...achievementData,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`achievement:${id}`, achievement);
    return c.json({ achievement, message: 'Achievement created successfully' });
  } catch (error) {
    console.error('Error creating achievement:', error);
    return c.json({ error: 'Failed to create achievement' }, 500);
  }
});

// Update achievement (protected)
app.put("/make-server-235c99c9/achievements/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const existing = await kv.get(`achievement:${id}`);
    if (!existing) {
      return c.json({ error: 'Achievement not found' }, 404);
    }

    const achievement = { ...existing, ...updates, id };
    await kv.set(`achievement:${id}`, achievement);
    return c.json({ achievement, message: 'Achievement updated successfully' });
  } catch (error) {
    console.error('Error updating achievement:', error);
    return c.json({ error: 'Failed to update achievement' }, 500);
  }
});

// Delete achievement (protected)
app.delete("/make-server-235c99c9/achievements/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`achievement:${id}`);
    return c.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return c.json({ error: 'Failed to delete achievement' }, 500);
  }
});

// ============================================================================
// Contact Messages Routes
// ============================================================================

// Submit contact form (public, with anti-spam)
app.post("/make-server-235c99c9/contact", async (c) => {
  try {
    const messageData = await c.req.json();
    const { name, email, subject, message, honeypot } = messageData;

    // Anti-spam: honeypot field should be empty
    if (honeypot) {
      return c.json({ message: 'Message received' }); // Fake success
    }

    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400);
    }

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const contactMessage = {
      id,
      name,
      email,
      subject: subject || 'No subject',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`message:${id}`, contactMessage);
    return c.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Get all contact messages (protected)
app.get("/make-server-235c99c9/contact/messages", requireAuth, async (c) => {
  try {
    const messages = await kv.getByPrefix('message:');
    const messagesData = messages.map((m: any) => m.value);

    // Sort by date (newest first)
    messagesData.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ messages: messagesData });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

// Update message status (protected)
app.put("/make-server-235c99c9/contact/messages/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const { status } = await c.req.json();

    const existing = await kv.get(`message:${id}`);
    if (!existing) {
      return c.json({ error: 'Message not found' }, 404);
    }

    const message = { ...existing, status, updatedAt: new Date().toISOString() };
    await kv.set(`message:${id}`, message);
    return c.json({ message, message: 'Message status updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    return c.json({ error: 'Failed to update message' }, 500);
  }
});

// Delete message (protected)
app.delete("/make-server-235c99c9/contact/messages/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`message:${id}`);
    return c.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return c.json({ error: 'Failed to delete message' }, 500);
  }
});

// ============================================================================
// Analytics Routes
// ============================================================================

// Helper function to track page views
async function trackPageView(path: string, c: any) {
  try {
    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0];
    const userAgent = c.req.header('User-Agent') || 'Unknown';

    // Track daily page views
    const dailyKey = `analytics:daily:${date}`;
    const dailyData = await kv.get(dailyKey) || { date, views: 0, paths: {} };
    dailyData.views = (dailyData.views || 0) + 1;
    dailyData.paths = dailyData.paths || {};
    dailyData.paths[path] = (dailyData.paths[path] || 0) + 1;
    await kv.set(dailyKey, dailyData);

    // Track device type
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : 'desktop';
    const deviceKey = `analytics:devices:${date}`;
    const deviceData = await kv.get(deviceKey) || { date, mobile: 0, desktop: 0 };
    deviceData[deviceType] = (deviceData[deviceType] || 0) + 1;
    await kv.set(deviceKey, deviceData);

  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Track page view (public)
app.post("/make-server-235c99c9/analytics/track", async (c) => {
  try {
    const { path } = await c.req.json();
    await trackPageView(path, c);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking:', error);
    return c.json({ error: 'Failed to track' }, 500);
  }
});

// Get analytics data (protected)
app.get("/make-server-235c99c9/analytics", requireAuth, async (c) => {
  try {
    const days = parseInt(c.req.query('days') || '30');
    const allAnalytics = await kv.getByPrefix('analytics:daily:');
    const allDevices = await kv.getByPrefix('analytics:devices:');

    // Get data for the last N days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const dailyData = allAnalytics
      .map((a: any) => a.value)
      .filter((d: any) => new Date(d.date) >= cutoffDate)
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const deviceData = allDevices
      .map((d: any) => d.value)
      .filter((d: any) => new Date(d.date) >= cutoffDate);

    // Calculate totals
    const totalViews = dailyData.reduce((sum: number, d: any) => sum + (d.views || 0), 0);
    const totalMobile = deviceData.reduce((sum: number, d: any) => sum + (d.mobile || 0), 0);
    const totalDesktop = deviceData.reduce((sum: number, d: any) => sum + (d.desktop || 0), 0);

    // Get all projects count
    const projects = await kv.getByPrefix('project:');
    const messages = await kv.getByPrefix('message:');

    return c.json({
      summary: {
        totalViews,
        totalMobile,
        totalDesktop,
        projectsCount: projects.length,
        messagesCount: messages.length,
      },
      dailyViews: dailyData,
      devices: { mobile: totalMobile, desktop: totalDesktop },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// ============================================================================
// Site Settings Routes
// ============================================================================

// Get site settings (public)
app.get("/make-server-235c99c9/settings", async (c) => {
  try {
    const settings = await kv.get('settings:site') || {
      siteName: 'Portfolio',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      whatsapp: '',
      about: '',
      resumeUrl: '',
    };

    return c.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

// Update site settings (protected)
app.put("/make-server-235c99c9/settings", requireAuth, async (c) => {
  try {
    const settingsData = await c.req.json();
    await kv.set('settings:site', settingsData);
    return c.json({ settings: settingsData, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// ============================================================================
// SEO Routes
// ============================================================================

// Get SEO data for a page (public)
app.get("/make-server-235c99c9/seo/:page", async (c) => {
  try {
    const page = c.req.param('page');
    const seoData = await kv.get(`seo:${page}`) || {
      title: 'Portfolio',
      description: '',
      keywords: '',
      ogImage: '',
    };

    return c.json({ seo: seoData });
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return c.json({ error: 'Failed to fetch SEO data' }, 500);
  }
});

// Update SEO data for a page (protected)
app.put("/make-server-235c99c9/seo/:page", requireAuth, async (c) => {
  try {
    const page = c.req.param('page');
    const seoData = await c.req.json();
    await kv.set(`seo:${page}`, seoData);
    return c.json({ seo: seoData, message: 'SEO data updated successfully' });
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return c.json({ error: 'Failed to update SEO data' }, 500);
  }
});

// Generate sitemap (public)
app.get("/make-server-235c99c9/sitemap.xml", async (c) => {
  try {
    const baseUrl = c.req.header('origin') || 'https://example.com';
    const projects = await kv.getByPrefix('project:');

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const pages = ['/', '/about', '/skills', '/projects', '/experience', '/certifications', '/achievements', '/contact'];
    pages.forEach(page => {
      sitemap += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Project pages
    projects.forEach((p: any) => {
      sitemap += `  <url>\n    <loc>${baseUrl}/projects/${p.value.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    sitemap += '</urlset>';

    return c.text(sitemap, 200, { 'Content-Type': 'application/xml' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return c.text('Error generating sitemap', 500);
  }
});

// Generate robots.txt (public)
app.get("/make-server-235c99c9/robots.txt", async (c) => {
  const baseUrl = c.req.header('origin') || 'https://example.com';
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
  return c.text(robotsTxt, 200, { 'Content-Type': 'text/plain' });
});

// ============================================================================
// File Upload Routes (using Supabase Storage)
// ============================================================================

// Initialize storage bucket
async function initStorageBucket() {
  const bucketName = 'make-235c99c9-portfolio';

  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      });
      console.log(`Created storage bucket: ${bucketName}`);
    }
  } catch (error) {
    console.error('Error initializing storage bucket:', error);
  }
}

// Initialize bucket on startup
await initStorageBucket();

// Upload file (protected)
app.post("/make-server-235c99c9/upload", requireAuth, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const fileName = `${Date.now()}-${file.name}`;
    const bucketName = 'make-235c99c9-portfolio';

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    // Get signed URL (valid for 1 year)
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    // Store file metadata in KV
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fileMetadata = {
      id: fileId,
      fileName: file.name,
      storagePath: fileName,
      url: signedUrlData?.signedUrl,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    await kv.set(`file:${fileId}`, fileMetadata);

    return c.json({ file: fileMetadata, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Get all uploaded files (protected)
app.get("/make-server-235c99c9/media", requireAuth, async (c) => {
  try {
    const files = await kv.getByPrefix('file:');
    const filesData = files.map((f: any) => f.value);

    // Sort by upload date (newest first)
    filesData.sort((a: any, b: any) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return c.json({ files: filesData });
  } catch (error) {
    console.error('Error fetching files:', error);
    return c.json({ error: 'Failed to fetch files' }, 500);
  }
});

// Delete file (protected)
app.delete("/make-server-235c99c9/media/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param('id');
    const fileMetadata = await kv.get(`file:${id}`);

    if (!fileMetadata) {
      return c.json({ error: 'File not found' }, 404);
    }

    // Delete from Supabase Storage
    const bucketName = 'make-235c99c9-portfolio';
    await supabase.storage.from(bucketName).remove([fileMetadata.storagePath]);

    // Delete metadata
    await kv.del(`file:${id}`);

    return c.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return c.json({ error: 'Failed to delete file' }, 500);
  }
});

// ============================================================================
// Start Server
// ============================================================================

Deno.serve(app.fetch);
