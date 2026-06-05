-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Yousef Shiref Alassal',
  title TEXT NOT NULL DEFAULT 'Hardware Engineer & Full Stack Developer',
  bio TEXT,
  avatar_url TEXT,
  email TEXT NOT NULL DEFAULT 'yousefshirefbusiness@gmail.com',
  phone TEXT NOT NULL DEFAULT '01555578913',
  github TEXT NOT NULL DEFAULT 'https://github.com/yousefshiref0',
  linkedin TEXT NOT NULL DEFAULT 'https://www.linkedin.com/feed/',
  whatsapp TEXT NOT NULL DEFAULT 'https://wa.me/201555578913',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Hardware', 'Software', 'Mobile', 'IoT')),
  percentage INTEGER NOT NULL DEFAULT 85,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  github_link TEXT,
  live_link TEXT,
  category TEXT DEFAULT 'Web',
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}',
  start_date TEXT NOT NULL,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'page_view',
  timestamp TIMESTAMP DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_order ON projects("order");
CREATE INDEX idx_experience_order ON experience("order");
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_analytics_page ON analytics(page);

-- Insert initial profile data
INSERT INTO profiles (name, title, bio, email, phone, github, linkedin, whatsapp)
VALUES (
  'Yousef Shiref Alassal',
  'Hardware Engineer & Full Stack Developer',
  'A multidisciplinary engineer with experience in hardware development, software engineering, and IoT systems',
  'yousefshirefbusiness@gmail.com',
  '01555578913',
  'https://github.com/yousefshiref0',
  'https://www.linkedin.com/feed/',
  'https://wa.me/201555578913'
) ON CONFLICT DO NOTHING;

-- Insert initial skills
INSERT INTO skills (name, category, percentage, description) VALUES
('Embedded Systems', 'Hardware', 90, 'Microcontroller programming and embedded development'),
('Microcontrollers', 'Hardware', 85, 'Arduino, STM32, PIC microcontroller development'),
('Electronics Prototyping', 'Hardware', 80, 'Circuit design and prototyping'),
('Hardware System Development', 'Hardware', 85, 'Full hardware system integration'),
('Full Stack Development', 'Software', 90, 'React, Node.js, TypeScript, Express'),
('Database Design', 'Software', 85, 'PostgreSQL, Supabase, Database Architecture'),
('System Architecture', 'Software', 80, 'Scalable system design and patterns'),
('React.js', 'Software', 92, 'Modern React with Hooks and Context'),
('Node.js', 'Software', 88, 'Backend development with Express'),
('TypeScript', 'Software', 85, 'Type-safe JavaScript development'),
('React Native', 'Mobile', 85, 'Cross-platform mobile applications'),
('Flutter', 'Mobile', 80, 'Mobile app development with Flutter'),
('iOS Development', 'Mobile', 75, 'Native iOS applications'),
('Android Development', 'Mobile', 75, 'Native Android applications'),
('IoT Solutions', 'IoT', 85, 'Connected devices and sensors'),
('MQTT Protocol', 'IoT', 80, 'Message Queuing Telemetry Transport'),
('Cloud Integration', 'IoT', 80, 'Cloud platform integration for IoT')
ON CONFLICT DO NOTHING;

-- Insert initial experience
INSERT INTO experience (role, company, description, technologies, start_date, end_date, is_current, "order") VALUES
('Senior Hardware Engineer', 'Self-Employed', 'Designing and developing complex hardware systems with microcontrollers and embedded systems', ARRAY['Arduino', 'STM32', 'PCB Design', 'Electronics'], '2022-01-01', NULL, true, 0),
('Full Stack Developer', 'Self-Employed', 'Building scalable web applications with modern tech stack', ARRAY['React', 'Node.js', 'TypeScript', 'Supabase'], '2020-01-01', NULL, true, 1),
('Mobile App Developer', 'Self-Employed', 'Developing cross-platform mobile applications', ARRAY['React Native', 'Flutter', 'Kotlin', 'Swift'], '2018-01-01', NULL, true, 2)
ON CONFLICT DO NOTHING;
