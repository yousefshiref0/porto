import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, UserCheck, UserX, Users, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
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

const mockStudents: Student[] = [
  { id: '1', name: 'Emma Johnson', studentId: 'STU2024001', email: 'emma.j@school.edu', status: 'present', attendanceRate: 96, lastSeen: '10:30 AM' },
  { id: '2', name: 'Liam Smith', studentId: 'STU2024002', email: 'liam.s@school.edu', status: 'present', attendanceRate: 94, lastSeen: '10:32 AM' },
  { id: '3', name: 'Olivia Brown', studentId: 'STU2024003', email: 'olivia.b@school.edu', status: 'present', attendanceRate: 98, lastSeen: '10:28 AM' },
  { id: '4', name: 'Noah Davis', studentId: 'STU2024004', email: 'noah.d@school.edu', status: 'absent', attendanceRate: 88 },
  { id: '5', name: 'Ava Wilson', studentId: 'STU2024005', email: 'ava.w@school.edu', status: 'present', attendanceRate: 92, lastSeen: '10:35 AM' },
  { id: '6', name: 'Ethan Martinez', studentId: 'STU2024006', email: 'ethan.m@school.edu', status: 'present', attendanceRate: 90, lastSeen: '10:29 AM' },
  { id: '7', name: 'Sophia Garcia', studentId: 'STU2024007', email: 'sophia.g@school.edu', status: 'absent', attendanceRate: 85 },
  { id: '8', name: 'Mason Rodriguez', studentId: 'STU2024008', email: 'mason.r@school.edu', status: 'present', attendanceRate: 97, lastSeen: '10:31 AM' },
];

interface StudentsProps {
  onViewStudent: (student: Student) => void;
}

export function Students({ onViewStudent }: StudentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent'>('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const presentCount = mockStudents.filter(s => s.status === 'present').length;
  const absentCount = mockStudents.filter(s => s.status === 'absent').length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <h1 className="text-2xl font-semibold mb-1">Students</h1>
        <p className="text-sm text-muted-foreground">Manage student attendance</p>
      </div>

      <div className="px-6 py-6">
        {/* Stats Summary */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-semibold mb-1">{mockStudents.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center">
            <UserCheck className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-semibold mb-1">{presentCount}</p>
            <p className="text-xs text-muted-foreground">Present</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center">
            <UserX className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-semibold mb-1">{absentCount}</p>
            <p className="text-xs text-muted-foreground">Absent</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-card border border-border"
            />
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Filter className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Students
          </button>
          <button
            onClick={() => setFilterStatus('present')}
            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
              filterStatus === 'present'
                ? 'bg-secondary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Present
          </button>
          <button
            onClick={() => setFilterStatus('absent')}
            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
              filterStatus === 'absent'
                ? 'bg-destructive text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Absent
          </button>
        </motion.div>

        {/* Student List */}
        {filteredStudents.length > 0 ? (
          <div className="space-y-3">
            {filteredStudents.map((student, index) => (
              <motion.button
                key={student.id}
                onClick={() => onViewStudent(student)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    student.status === 'present' ? 'bg-secondary/10' : 'bg-destructive/10'
                  }`}>
                    {student.status === 'present' ? (
                      <UserCheck className="w-7 h-7 text-secondary" />
                    ) : (
                      <UserX className="w-7 h-7 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{student.studentId}</p>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs ${
                        student.status === 'present'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {student.status === 'present' ? 'Present' : 'Absent'}
                      </span>
                      {student.lastSeen && (
                        <span className="text-xs text-muted-foreground">{student.lastSeen}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <p className="text-xl font-semibold">{student.attendanceRate}%</p>
                      <p className="text-xs text-muted-foreground">Rate</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No Students Found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
