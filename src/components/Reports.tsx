import { motion } from 'motion/react';
import { BarChart3, Download, Calendar, TrendingUp, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Button } from './ui/button';

const attendanceDonutData = [
  { name: 'Present', value: 248, color: 'hsl(var(--secondary))' },
  { name: 'Absent', value: 12, color: 'hsl(var(--destructive))' },
];

const weeklyData = [
  { week: 'Week 1', present: 240, absent: 20 },
  { week: 'Week 2', present: 245, absent: 15 },
  { week: 'Week 3', present: 252, absent: 8 },
  { week: 'Week 4', present: 248, absent: 12 },
];

const monthlyData = [
  { month: 'Sep', rate: 89 },
  { month: 'Oct', rate: 91 },
  { month: 'Nov', rate: 93 },
  { month: 'Dec', rate: 92 },
  { month: 'Jan', rate: 95 },
];

export function Reports() {
  const totalStudents = 260;
  const presentToday = 248;
  const attendanceRate = Math.round((presentToday / totalStudents) * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <h1 className="text-2xl font-semibold mb-1">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Comprehensive attendance insights</p>
      </div>

      <div className="px-6 py-6">
        {/* Summary Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rate</p>
                <p className="text-2xl font-semibold">{attendanceRate}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attendance Donut Chart */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Today's Overview</h3>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={attendanceDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-3xl font-semibold">{attendanceRate}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-secondary/5 rounded-2xl">
              <p className="text-2xl font-semibold text-secondary">{presentToday}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </div>
            <div className="text-center p-3 bg-destructive/5 rounded-2xl">
              <p className="text-2xl font-semibold text-destructive">{totalStudents - presentToday}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Comparison */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-6">Weekly Comparison</h3>
          
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '14px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '14px' }}
                iconType="circle"
              />
              <Bar dataKey="present" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-4">Monthly Trend</h3>
          
          <div className="space-y-3">
            {monthlyData.map((month, index) => (
              <div key={month.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{month.month}</span>
                  <span className="text-sm font-semibold">{month.rate}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${month.rate}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Export Actions */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white">
            <Download className="w-5 h-5 mr-2" />
            Export Monthly Report (PDF)
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl border-2"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Custom Date Range
          </Button>
        </motion.div>

        {/* Report Summary */}
        <motion.div
          className="mt-6 bg-muted/50 rounded-2xl p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground text-center">
            Report generated on {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
