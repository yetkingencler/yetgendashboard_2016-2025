import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: delay * 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-slate-200/60 bg-white/95 backdrop-blur-xl p-4 sm:p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5 h-full flex flex-col group",
        className
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 sm:mb-2.5">{title}</p>
          <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter tabular-nums font-display group-hover:text-blue-600 transition-colors">
            {value}
          </h3>
          {subValue && <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-semibold text-slate-400">{subValue}</p>}
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      

      
      {/* Subtle background glow */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-50/30 blur-3xl group-hover:bg-blue-100/40 transition-colors duration-700" />
      <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-indigo-50/20 blur-3xl group-hover:bg-indigo-100/30 transition-colors duration-700" />
    </motion.div>
  );
};
