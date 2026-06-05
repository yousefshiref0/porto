import React, { useState } from 'react';
import { AdminDashboardShell } from '../../components/AdminDashboardShell';
import { AdminProjects } from '../../components/AdminProjects';
import { AdminSkills } from '../../components/AdminSkills';
import { AdminExperience } from '../../components/AdminExperience';
import { AdminMessages } from '../../components/AdminMessages';
import { BarChart3 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminDashboardShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Dashboard Overview</h2>
            <div className="bg-[#111111] text-[#F8F5EC] p-8 rounded-lg border-2 border-[#4F46E5]/30">
              <p className="text-lg mb-4">Welcome to your admin dashboard!</p>
              <p className="text-[#F8F5EC]/70">
                Use the tabs above to manage your projects, skills, experience, and messages.
              </p>
              
              <div className="mt-8 p-6 bg-[#1a1a1a] rounded-lg border-2 border-[#FFD93D]/30">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Quick Stats
                </h3>
                <p className="text-[#F8F5EC]/70 text-sm">
                  All stats are dynamically loaded from your database. Visit each section to manage your portfolio content.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && <AdminProjects />}

      {activeTab === 'skills' && <AdminSkills />}

      {activeTab === 'experience' && <AdminExperience />}

      {activeTab === 'messages' && <AdminMessages />}
    </AdminDashboardShell>
  );
};

