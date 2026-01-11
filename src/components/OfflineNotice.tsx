import { motion } from 'motion/react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface OfflineNoticeProps {
  onRetry?: () => void;
}

export function OfflineNotice({ onRetry }: OfflineNoticeProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bg-accent text-accent-foreground px-6 py-4 z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">No Internet Connection</p>
            <p className="text-xs opacity-90">Some features may be limited</p>
          </div>
        </div>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="ghost"
            className="h-10 w-10 p-0 hover:bg-white/20"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
