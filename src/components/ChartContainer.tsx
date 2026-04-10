import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
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
        "rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 bg-white p-5 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500",
        className
      )}
    >
      <div className="mb-5 sm:mb-6 md:mb-10">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1 sm:mt-2 tracking-wide">{subtitle}</p>}
      </div>
      <div className="h-full w-full relative">
        {children}
      </div>
    </motion.div>
  );
};
