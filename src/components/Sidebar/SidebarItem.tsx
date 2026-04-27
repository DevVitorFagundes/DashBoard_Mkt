import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-[14px] cursor-pointer group relative transition-colors duration-200",
      active ? "bg-sc-turquoise/10 text-sc-turquoise" : "text-slate-500 hover:bg-slate-50"
    )}
  >
    <Icon size={20} className={cn(active ? "text-sc-turquoise" : "group-hover:text-sc-turquoise")} />
    <span className={cn("font-bold text-sm", active ? "text-sc-turquoise" : "text-slate-600")}>{label}</span>
    <AnimatePresence mode="wait">
      {active && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute right-0 top-2 bottom-2 w-1 bg-sc-turquoise rounded-l-full" 
          transition={{ duration: 0.15 }}
        />
      )}
    </AnimatePresence>
  </div>
);
