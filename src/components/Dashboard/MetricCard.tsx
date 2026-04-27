import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
  delay: number;
  trend?: {
    value: string;
    isPositive: boolean;
    data: { value: number }[];
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, colorClass, delay, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-[14px] shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow h-full"
  >
    {/* Background Decorative Shape */}
    <div className="absolute top-0 left-0 w-24 h-full bg-slate-50 -translate-x-12 skew-x-12 opacity-50 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-4xl font-black text-slate-800 tracking-tight">
          {value}
        </h3>
        {trend && (
          <div className={cn(
            "flex items-center gap-0.5 text-[11px] font-black",
            trend.isPositive ? "text-emerald-500" : "text-rose-500"
          )}>
            {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend.value}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);
