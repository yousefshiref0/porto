-- Update profile with Yousef's information
UPDATE profiles SET
  email = 'yousefshirefbusiness@gmail.com',
  phone = '01555578913',
  github = 'https://github.com/yousefshiref0',
  linkedin = 'https://www.linkedin.com/feed/',
  whatsapp = 'https://wa.me/201555578913',
  bio = 'My name is Yousef Shiref Alassal, I am a 20-year-old engineering student at Pharos University in Alexandria (PUA), specializing in Computer Science & Artificial Intelligence.

I am a multidisciplinary engineer with experience in hardware development, software engineering (web & mobile applications), and IoT systems.

My work focuses on bridging the gap between physical systems and software solutions, from designing electronic circuits and PCB systems to building scalable full-stack web applications and mobile apps.

I am passionate about creating practical, efficient, and well-structured solutions that combine both hardware and software to solve real-world problems.',
  profile_image = NULL
WHERE id IS NOT NULL
LIMIT 1;

-- Delete existing skills to avoid duplicates
DELETE FROM skills WHERE id IS NOT NULL;

-- Insert Hardware Skills
INSERT INTO skills (name, category, percentage, description) VALUES
('Embedded Systems', 'Hardware', 90, 'Designing and programming embedded systems'),
('Microcontrollers', 'Hardware', 95, 'ARM, AVR, and other microcontroller architectures'),
('Electronics', 'Hardware', 88, 'Circuit design and prototyping'),
('Hardware System Development', 'Hardware', 90, 'Full hardware product development');

-- Insert Software Skills
INSERT INTO skills (name, category, percentage, description) VALUES
('React', 'Software', 95, 'Modern React with hooks and state management'),
('Node.js', 'Software', 90, 'Backend development with Node.js'),
('Python', 'Software', 88, 'Python programming and data processing'),
('TypeScript', 'Software', 92, 'Type-safe JavaScript development'),
('Full Stack', 'Software', 90, 'End-to-end web application development');

-- Insert Mobile Skills
INSERT INTO skills (name, category, percentage, description) VALUES
('React Native', 'Mobile', 85, 'Cross-platform mobile development'),
('Flutter', 'Mobile', 80, 'Flutter for iOS and Android'),
('iOS Development', 'Mobile', 75, 'Native iOS development'),
('Android Development', 'Mobile', 78, 'Native Android development');

-- Insert IoT Skills
INSERT INTO skills (name, category, percentage, description) VALUES
('MQTT', 'IoT', 90, 'MQTT protocol and broker setup'),
('Sensor Integration', 'IoT', 92, 'Integrating various sensors'),
('Edge Computing', 'IoT', 85, 'Edge computing architectures'),
('Cloud Integration', 'IoT', 88, 'Cloud platforms and IoT integration');

-- Delete existing experience to avoid duplicates
DELETE FROM experience WHERE id IS NOT NULL;

-- Insert Experience
INSERT INTO experience (role, company, description, technologies, start_date, end_date, is_current) VALUES
('Senior Hardware Engineer', 'Tech Company Inc.', 'Led the design and development of embedded systems for IoT devices. Managed a team of engineers and oversaw product lifecycle from concept to production.', '["Embedded Systems", "ARM", "C/C++", "MQTT", "IoT"]', '2022', 'Present', true),
('Full Stack Developer', 'Software Solutions Ltd.', 'Developed scalable web applications using modern frameworks. Implemented RESTful APIs and microservices architecture.', '["React", "Node.js", "PostgreSQL", "Docker", "AWS"]', '2020', 'Present', true),
('Mobile App Developer', 'App Studio', 'Created cross-platform mobile applications for iOS and Android. Focused on user experience and performance optimization.', '["React Native", "Flutter", "TypeScript", "Firebase"]', '2018', 'Present', true);
