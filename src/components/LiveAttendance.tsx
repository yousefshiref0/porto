import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, UserCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface ScanResult {
  id: number;
  name: string;
  studentId: string;
  time: string;
  status: 'success' | 'duplicate' | 'error';
}

export function LiveAttendance() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [scanCount, setScanCount] = useState(0);

  const mockStudents = [
    { name: 'Emma Johnson', studentId: 'STU2024001' },
    { name: 'Liam Smith', studentId: 'STU2024002' },
    { name: 'Olivia Brown', studentId: 'STU2024003' },
    { name: 'Noah Davis', studentId: 'STU2024004' },
    { name: 'Ava Wilson', studentId: 'STU2024005' },
  ];

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        // Simulate random RFID scan
        const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
        const isDuplicate = scanHistory.some(s => s.studentId === randomStudent.studentId);
        
        const newScan: ScanResult = {
          id: Date.now(),
          ...randomStudent,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: isDuplicate ? 'duplicate' : 'success',
        };

        setLastScanned(newScan);
        if (!isDuplicate) {
          setScanHistory(prev => [newScan, ...prev].slice(0, 10));
          setScanCount(prev => prev + 1);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isScanning, scanHistory]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-secondary/10',
          text: 'text-secondary',
          icon: CheckCircle,
          label: 'Marked Present',
        };
      case 'duplicate':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          icon: AlertCircle,
          label: 'Already Scanned',
        };
      case 'error':
        return {
          bg: 'bg-destructive/10',
          text: 'text-destructive',
          icon: AlertCircle,
          label: 'Error',
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          icon: Radio,
          label: 'Unknown',
        };
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <h1 className="text-2xl font-semibold mb-1">Live Attendance</h1>
        <p className="text-sm text-muted-foreground">Real-time RFID scanning</p>
      </div>

      <div className="px-6 py-6">
        {/* Scan Control */}
        <motion.div
          className="bg-card rounded-3xl p-8 shadow-sm border border-border mb-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              className={`w-32 h-32 rounded-full flex items-center justify-center ${
                isScanning ? 'bg-primary' : 'bg-muted'
              } transition-colors duration-300`}
              whileTap={{ scale: 0.95 }}
            >
              <Radio className={`w-16 h-16 ${isScanning ? 'text-white' : 'text-muted-foreground'}`} />
            </motion.div>
            
            {isScanning && (
              <>
                <motion.div
                  className="absolute inset-0 w-32 h-32 rounded-full bg-primary/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-2">
            {isScanning ? 'Scanning Active' : 'Ready to Scan'}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {isScanning ? 'Hold RFID cards near the reader' : 'Tap to start scanning'}
          </p>

          <Button
            onClick={toggleScanning}
            className={`h-14 px-8 rounded-2xl ${
              isScanning
                ? 'bg-destructive hover:bg-destructive/90'
                : 'bg-primary hover:bg-primary/90'
            } text-white`}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>

          {scanCount > 0 && (
            <motion.div
              className="mt-6 pt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-secondary">{scanCount}</p>
                  <p className="text-muted-foreground">Scanned</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-semibold text-primary">{scanHistory.length}</p>
                  <p className="text-muted-foreground">Unique</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Last Scanned Spotlight */}
        <AnimatePresence mode="wait">
          {lastScanned && (
            <motion.div
              key={lastScanned.id}
              className={`rounded-3xl p-6 mb-6 border-2 ${
                lastScanned.status === 'success'
                  ? 'bg-secondary/5 border-secondary/20'
                  : lastScanned.status === 'duplicate'
                  ? 'bg-accent/5 border-accent/20'
                  : 'bg-destructive/5 border-destructive/20'
              }`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                {(() => {
                  const config = getStatusConfig(lastScanned.status);
                  const StatusIcon = config.icon;
                  return (
                    <>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${config.bg}`}>
                        <StatusIcon className={`w-8 h-8 ${config.text}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">{lastScanned.name}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lastScanned.studentId}</p>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-xl text-sm ${config.bg} ${config.text}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lastScanned.time}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Recent Scans</h3>
            <div className="space-y-3">
              {scanHistory.map((scan, index) => {
                const config = getStatusConfig(scan.status);
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={scan.id}
                    className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.bg}`}>
                      <StatusIcon className={`w-6 h-6 ${config.text}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{scan.name}</p>
                      <p className="text-sm text-muted-foreground">{scan.studentId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">{scan.time}</p>
                      <span className={`inline-flex px-2 py-1 rounded-lg text-xs ${config.bg} ${config.text}`}>
                        {scan.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {!isScanning && scanHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Radio className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No Scans Yet</h3>
            <p className="text-sm text-muted-foreground">Start scanning to track attendance</p>
          </div>
        )}
      </div>
    </div>
  );
}
