import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Auth
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Experience } from './pages/Experience';
import { Contact } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjects } from './pages/admin/AdminProjects';

// Utility Pages
import { NotFound } from './pages/NotFound';

// Layout wrapper for public pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Layout wrapper for admin pages (no navbar/footer)
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#F8F5EC',
              color: '#111111',
              border: '4px solid #111111',
              fontFamily: 'var(--font-accent)',
              fontWeight: 'bold',
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/skills"
            element={
              <PublicLayout>
                <Skills />
              </PublicLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicLayout>
                <Projects />
              </PublicLayout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PublicLayout>
                <ProjectDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/experience"
            element={
              <PublicLayout>
                <Experience />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout>
                  <AdminProjects />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
