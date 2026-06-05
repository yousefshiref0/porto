# Premium Portfolio Website

A world-class portfolio website for professional engineers and programmers, featuring a unique hybrid design combining **Brutalism (60%)**, **Hand-Drawn Style (25%)**, and **Modern 3D Elements (15%)**.

## Design Philosophy

This portfolio showcases expertise in:
- Hardware Engineering
- Software Engineering
- Full-Stack Development
- Mobile Application Development
- IoT (Internet of Things)

The design is **premium, unique, creative, and memorable** - not a generic template.

## Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling with custom design tokens
- **Motion (Framer Motion)** - Animations and 3D effects
- **React Router** - Client-side routing
- **Sonner** - Toast notifications

### Backend
- **Supabase Edge Functions** - Serverless API
- **Hono** - Web framework for edge functions
- **Supabase Auth** - Admin authentication
- **Supabase Storage** - File uploads (images, PDFs, videos)
- **KV Store** - Database for all content

### Typography
- **Space Grotesk** - Primary font
- **Archivo Black** - Display headlines
- **Bricolage Grotesque** - Accent font
- **Caveat & Patrick Hand** - Hand-drawn annotations

### Color Palette
- Background: `#F8F5EC`
- Primary: `#111111`
- Accent 1 (Orange): `#FF6B35`
- Accent 2 (Yellow): `#FFD93D`
- Accent 3 (Purple): `#4F46E5`

## Features

### Public Pages
1. **Home** - Hero section with 3D floating elements, stats, and expertise overview
2. **About** - Personal story, education, and core values
3. **Skills** - Interactive skill cards organized by category (Hardware, Software, Mobile, IoT)
4. **Projects** - Filterable project grid with categories (Hardware, Software, IoT)
5. **Project Details** - Full project pages with galleries, tech stack, challenges, and solutions
6. **Experience** - Interactive timeline of professional journey
7. **Contact** - Contact form with anti-spam protection and social links

### Admin Dashboard (CMS)
1. **Login** - Secure authentication via Supabase Auth
2. **Dashboard** - Analytics overview with stats
3. **Projects Management** - Full CRUD operations for projects
4. **Analytics** - Page views, visitor statistics, device tracking
5. **Messages** - Contact form inbox with status management

### Design Features
- **Brutalist Elements**: Bold typography, thick 4px borders, strong shadows (8px-12px)
- **Hand-Drawn Elements**: Animated SVG arrows, sketch annotations, organic decorations
- **3D Elements**: Floating cards with depth, smooth micro-interactions, hover effects
- **Responsive**: Mobile-first design, fully responsive across all devices
- **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── HandDrawnArrow.tsx
│   │   ├── FloatingCard3D.tsx
│   │   ├── SkillCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       └── AdminProjects.tsx
│   ├── utils/
│   │   └── api.ts        # API client utilities
│   └── App.tsx           # Main app with routing
├── styles/
│   ├── fonts.css         # Font imports
│   └── theme.css         # Design tokens and base styles
└── supabase/
    └── functions/
        └── server/
            ├── index.tsx      # Edge function API
            └── kv_store.tsx   # Database utilities

```

## API Endpoints

### Public Endpoints
- `GET /projects` - Get all projects (with optional category filter)
- `GET /projects/:id` - Get single project
- `GET /skills` - Get all skills grouped by category
- `GET /experience` - Get all experience entries
- `GET /certifications` - Get all certifications
- `GET /achievements` - Get all achievements
- `GET /settings` - Get site settings
- `POST /contact` - Submit contact form (with anti-spam)
- `POST /analytics/track` - Track page view
- `GET /sitemap.xml` - Generate sitemap
- `GET /robots.txt` - Generate robots.txt

### Protected Endpoints (Require Admin Token)
- `POST /auth/signup` - Create admin user
- `GET /auth/me` - Get current user
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `POST /skills` - Create skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill
- `GET /contact/messages` - Get all contact messages
- `PUT /contact/messages/:id` - Update message status
- `GET /analytics` - Get analytics data
- `POST /upload` - Upload file to Supabase Storage
- `GET /media` - Get all uploaded files
- `DELETE /media/:id` - Delete file

## Getting Started

### 1. Deploy the Supabase Edge Function

**IMPORTANT**: You must deploy the Supabase edge function from the Make settings page for the backend API to work.

Go to **Make Settings → Supabase** and click **Deploy Function**.

### 2. Create an Admin User

Since no admin users exist by default, you need to create one. You can use a tool like Postman or curl:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-235c99c9/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-secure-password",
    "name": "Admin Name"
  }'
```

Replace `YOUR_PROJECT_ID` with your actual Supabase project ID.

### 3. Login to Admin Dashboard

Navigate to `/admin/login` and use the credentials you just created.

### 4. Add Content

Use the admin dashboard to add:
- Projects (with images, descriptions, tech stack)
- Skills (organized by category)
- Experience entries
- Certifications and achievements
- Site settings (contact info, social links)

## Customization

### Update Colors

Edit `/src/styles/theme.css` and modify the CSS custom properties:

```css
--background: #F8F5EC;
--primary: #111111;
--accent-orange: #FF6B35;
--accent-yellow: #FFD93D;
--accent-purple: #4F46E5;
```

### Update Typography

Edit `/src/styles/fonts.css` to change font imports, then update the font family variables in `theme.css`:

```css
--font-primary: 'Space Grotesk', sans-serif;
--font-display: 'Archivo Black', sans-serif;
--font-accent: 'Bricolage Grotesque', sans-serif;
```

### Update Site Branding

1. Navigate to `/admin/dashboard`
2. Go to Settings (when implemented)
3. Update site name, tagline, contact info, and social links

## Database Schema

All data is stored in the Supabase KV store with the following prefixes:

- `project:{id}` - Project data
- `skill:{id}` - Skill data
- `experience:{id}` - Experience entries
- `certification:{id}` - Certifications
- `achievement:{id}` - Achievements
- `message:{id}` - Contact messages
- `file:{id}` - Uploaded file metadata
- `analytics:daily:{date}` - Daily analytics
- `analytics:devices:{date}` - Device tracking
- `settings:site` - Site settings
- `seo:{page}` - SEO data per page

## File Uploads

Files are stored in Supabase Storage in the bucket `make-235c99c9-portfolio`. Supported file types:
- Images: JPG, PNG, GIF, WebP
- Documents: PDF
- Videos: MP4, WebM

Max file size: 50MB

## Performance Optimizations

- **Lazy loading** - Images load on demand
- **Code splitting** - React Router handles route-based splitting
- **Optimized animations** - Motion uses GPU acceleration
- **Minimal dependencies** - Only essential packages included
- **Edge functions** - Low-latency serverless API

## Security Features

- **Authentication** - Supabase Auth with JWT tokens
- **Anti-spam** - Honeypot field in contact form
- **Input validation** - All forms validate input
- **Private storage** - Files require signed URLs
- **CORS protection** - API has proper CORS headers

## Analytics

The portfolio tracks:
- Page views (per page and total)
- Visitor statistics
- Device types (mobile vs desktop)
- Project views
- Contact messages

Access analytics from the admin dashboard.

## SEO Features

- **Dynamic meta tags** - Configurable per page
- **Auto-generated sitemap** - Available at `/sitemap.xml`
- **Robots.txt** - Available at `/robots.txt`
- **Semantic HTML** - Proper heading hierarchy
- **Open Graph support** - Ready for social sharing

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This portfolio is a custom-built project. All rights reserved.

## Support

For issues with the Make/Figma Make integration, refer to the Make documentation.
For Supabase-related issues, check the Supabase docs.

---

Built with ❤️ using React, Tailwind CSS, and Supabase
