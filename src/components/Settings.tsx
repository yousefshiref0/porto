import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Building, Moon, Sun, LogOut, ChevronRight, Shield, Bell, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface SettingsProps {
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Settings({ onLogout, isDarkMode, onToggleDarkMode }: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <User className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-semibold mb-1">Prof. Sarah Anderson</h1>
          <p className="text-white/80">Department of Computer Science</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-4">
        {/* Profile Card */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium">sarah.anderson@university.edu</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <Building className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Organization</p>
                <p className="font-medium">State University</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Role</p>
                <p className="font-medium">Teacher / Administrator</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          className="bg-card rounded-3xl shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold">Preferences</h3>
          </div>

          <div className="divide-y divide-border">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                  {isDarkMode ? (
                    <Moon className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Sun className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle theme appearance</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
              />
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Push notifications</p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-card rounded-3xl shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold">Support</h3>
          </div>

          <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium">Help & Support</p>
                <p className="text-sm text-muted-foreground">Get assistance</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium">Privacy & Security</p>
                <p className="text-sm text-muted-foreground">Manage your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleLogout}
            className="w-full h-14 rounded-2xl bg-destructive hover:bg-destructive/90 text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-1">SmartAttend v1.0.0</p>
          <p className="text-xs text-muted-foreground">© 2024 Enterprise Edition</p>
        </motion.div>
      </div>
    </div>
  );
}
