import { motion } from 'motion/react';
import { Users, UserCheck, UserX, TrendingUp, Clock, Radio } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const attendanceData = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 95 },
  { day: 'Thu', rate: 91 },
  { day: 'Fri', rate: 94 },
  { day: 'Sat', rate: 87 },
  { day: 'Sun', rate: 89 },
];

const recentScans = [
  { id: 1, name: 'Emma Johnson', studentId: 'STU2024001', time: '2 min ago', status: 'present' },
  { id: 2, name: 'Liam Smith', studentId: 'STU2024002', time: '5 min ago', status: 'present' },
  { id: 3, name: 'Olivia Brown', studentId: 'STU2024003', time: '8 min ago', status: 'present' },
  { id: 4, name: 'Noah Davis', studentId: 'STU2024004', time: '12 min ago', status: 'duplicate' },
];

interface DashboardProps {
  userName: string;
}

export function Dashboard({ userName }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Greeting */}
      <motion.div
        className="bg-primary text-white px-6 pt-12 pb-8 rounded-b-[2rem]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">{greeting},</p>
            <h1 className="text-2xl font-semibold">{userName}</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="text-white/90 text-sm">
          <p>Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </motion.div>

      <div className="px-6 -mt-4">
        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-semibold mb-1">248</p>
            <p className="text-xs text-muted-foreground">Present</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center mb-3">
              <UserX className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-3xl font-semibold mb-1">12</p>
            <p className="text-xs text-muted-foreground">Absent</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-semibold mb-1">260</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </motion.div>

        {/* Attendance Trend Chart */}
        <motion.div
          className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold mb-1">Weekly Attendance</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary">+2.5% from last week</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">91.2%</p>
              <p className="text-xs text-muted-foreground">Average</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis hide domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '14px',
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#colorRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Scans</h3>
            <button className="text-sm text-primary hover:text-primary/80">View All</button>
          </div>

          <div className="space-y-3">
            {recentScans.map((scan, index) => (
              <motion.div
                key={scan.id}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  scan.status === 'present' ? 'bg-secondary/10' : 'bg-accent/10'
                }`}>
                  {scan.status === 'present' ? (
                    <UserCheck className="w-6 h-6 text-secondary" />
                  ) : (
                    <Radio className="w-6 h-6 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{scan.name}</p>
                  <p className="text-sm text-muted-foreground">{scan.studentId}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{scan.time}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs ${
                    scan.status === 'present'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {scan.status === 'present' ? 'Scanned' : 'Duplicate'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
