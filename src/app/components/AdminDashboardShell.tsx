import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useStats } from '../utils/hooks';
import { LogOut, Settings, MessageSquare, Briefcase, BookMarked, Zap } from 'lucide-react';
import { Button } from './Button';

interface AdminDashboardShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminDashboardShell: React.FC<AdminDashboardShellProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const { logout, user } = useAuth();
  const { stats } = useStats();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Settings className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Zap className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EC]">
      {/* Header */}
      <header className="bg-[#111111] text-[#F8F5EC] border-b-4 border-[#4F46E5]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
              <p className="text-sm text-[#F8F5EC]/70 mt-1">Welcome, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#FF5A1E] rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      {activeTab === 'overview' && stats && (
        <div className="bg-[#111111] text-[#F8F5EC] border-b-2 border-[#4F46E5]/30">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg border-2 border-[#4F46E5]/30">
                <p className="text-sm text-[#F8F5EC]/70">Total Projects</p>
                <p className="text-3xl font-bold text-[#4F46E5]">{stats.total_projects || 0}</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border-2 border-[#FF6B35]/30">
                <p className="text-sm text-[#F8F5EC]/70">Messages</p>
                <p className="text-3xl font-bold text-[#FF6B35]">{stats.total_messages || 0}</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border-2 border-[#FFD93D]/30">
                <p className="text-sm text-[#F8F5EC]/70">Total Views</p>
                <p className="text-3xl font-bold text-[#FFD93D]">{stats.total_views || 0}</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border-2 border-[#6BCB77]/30">
                <p className="text-sm text-[#F8F5EC]/70">Visitors</p>
                <p className="text-3xl font-bold text-[#6BCB77]">{stats.total_visitors || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-[#111111] border-b-2 border-[#4F46E5]/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-4 font-bold text-sm flex items-center gap-2 transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'bg-[#1a1a1a] border-b-4 border-[#4F46E5] text-[#F8F5EC]'
                    : 'border-b-4 border-transparent text-[#F8F5EC]/60 hover:bg-[#1a1a1a]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};
