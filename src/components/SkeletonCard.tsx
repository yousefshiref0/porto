import { motion } from 'motion/react';

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-muted rounded-2xl animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded-lg w-3/4 animate-pulse" />
          <div className="h-3 bg-muted rounded-lg w-1/2 animate-pulse" />
        </div>
        <div className="w-16 h-8 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="w-10 h-10 bg-muted rounded-xl mb-3 animate-pulse" />
          <div className="h-8 bg-muted rounded-lg w-16 mb-1 animate-pulse" />
          <div className="h-3 bg-muted rounded-lg w-12 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-muted rounded-lg w-32 animate-pulse" />
        <div className="h-5 bg-muted rounded-lg w-16 animate-pulse" />
      </div>
      <div className="h-40 bg-muted rounded-xl animate-pulse" />
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
}

export function SkeletonList({ count = 5 }: SkeletonListProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}
