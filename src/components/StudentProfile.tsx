import { motion } from 'motion/react';
import { ArrowLeft, Mail, Hash, Calendar, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  status: 'present' | 'absent';
  attendanceRate: number;
  lastSeen?: string;
}

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

// Mock attendance history for heatmap
const attendanceHistory = [
  { date: '2024-01-01', status: 'present' },
  { date: '2024-01-02', status: 'present' },
  { date: '2024-01-03', status: 'absent' },
  { date: '2024-01-04', status: 'present' },
  { date: '2024-01-05', status: 'present' },
  { date: '2024-01-08', status: 'present' },
  { date: '2024-01-09', status: 'present' },
  { date: '2024-01-10', status: 'present' },
  { date: '2024-01-11', status: 'present' },
  { date: '2024-01-12', status: 'absent' },
];

const recentHistory = [
  { date: 'Jan 10, 2024', time: '10:30 AM', status: 'present' },
  { date: 'Jan 9, 2024', time: '10:28 AM', status: 'present' },
  { date: 'Jan 8, 2024', time: '10:35 AM', status: 'present' },
  { date: 'Jan 5, 2024', time: '10:32 AM', status: 'present' },
  { date: 'Jan 4, 2024', time: '10:29 AM', status: 'present' },
  { date: 'Jan 3, 2024', time: '-', status: 'absent' },
  { date: 'Jan 2, 2024', time: '10:31 AM', status: 'present' },
  { date: 'Jan 1, 2024', time: '10:27 AM', status: 'present' },
];

export function StudentProfile({ student, onBack }: StudentProfileProps) {
  // Generate calendar days (simplified 5x7 grid)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const attendance = attendanceHistory[i % attendanceHistory.length];
    return attendance;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-6 pb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-4 -ml-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <span className="text-4xl font-semibold">
              {student.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-semibold mb-1">{student.name}</h1>
          <p className="text-white/80">{student.studentId}</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-4">
        {/* Stats Card */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                student.status === 'present' ? 'bg-secondary/10' : 'bg-destructive/10'
              }`}>
                {student.status === 'present' ? (
                  <CheckCircle className="w-8 h-8 text-secondary" />
                ) : (
                  <XCircle className="w-8 h-8 text-destructive" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">Today's Status</p>
              <p className={`font-semibold ${
                student.status === 'present' ? 'text-secondary' : 'text-destructive'
              }`}>
                {student.status === 'present' ? 'Present' : 'Absent'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
              <p className="font-semibold text-primary text-xl">{student.attendanceRate}%</p>
            </div>
          </div>

          {student.lastSeen && (
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last seen at {student.lastSeen}</span>
            </div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Hash className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Student ID</p>
                <p className="font-medium">{student.studentId}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attendance Heatmap */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Attendance Calendar</h3>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground font-medium">
                {day}
              </div>
            ))}
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg ${
                  day.status === 'present'
                    ? 'bg-secondary/20'
                    : day.status === 'absent'
                    ? 'bg-destructive/20'
                    : 'bg-muted'
                }`}
                title={day.status}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary/20" />
              <span className="text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20" />
              <span className="text-muted-foreground">Absent</span>
            </div>
          </div>
        </motion.div>

        {/* Recent History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4">Recent History</h3>
          <div className="space-y-3">
            {recentHistory.map((record, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    record.status === 'present' ? 'bg-secondary/10' : 'bg-destructive/10'
                  }`}>
                    {record.status === 'present' ? (
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-muted-foreground">{record.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-xl text-sm ${
                  record.status === 'present'
                    ? 'bg-secondary/10 text-secondary'
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {record.status === 'present' ? 'Present' : 'Absent'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
