import React, { useState, useRef, useEffect } from 'react';
import { Search, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface FilterDropdownProps {
  filter: string;
  options: { label: string, count: number }[];
  selected: string[];
  onToggle: (label: string) => void;
  onClear: () => void;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  isDrawer?: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  filter, 
  options, 
  selected, 
  onToggle, 
  onClear,
  onClose,
  triggerRef,
  isDrawer = false
}) => {
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDrawer) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef?.current && triggerRef.current.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef, isDrawer]);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  if (isDrawer) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:border-sc-green-dark transition-all"
            />
          </div>
          {selected.length > 0 && (
            <button 
              onClick={onClear}
              className="ml-3 text-xs font-bold text-sc-green-dark hover:text-sc-green-dark/80 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-1">
          {filteredOptions.map((opt, idx) => (
            <div 
              key={`${opt.label}-${idx}`}
              onClick={() => onToggle(opt.label)}
              className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-[14px] cursor-pointer group transition-colors"
            >
              <div className={cn(
                "w-5 h-5 rounded border transition-all flex items-center justify-center shrink-0",
                selected.includes(opt.label) 
                  ? "bg-sc-green-dark border-sc-green-dark" 
                  : "bg-white border-slate-200 group-hover:border-sc-green-dark/50"
              )}>
                {selected.includes(opt.label) && <Check size={12} className="text-white" />}
              </div>
              <span className={cn(
                "text-sm transition-colors",
                selected.includes(opt.label) ? "text-slate-900 font-bold" : "text-slate-600 font-medium"
              )}>
                {opt.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      ref={dropdownRef}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-[14px] shadow-2xl border border-slate-200 z-[100] overflow-hidden flex flex-col"
      style={{ transformOrigin: 'top left' }}
    >
      <div className="p-3 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Digite para pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:border-sc-green-dark transition-all placeholder:text-slate-400"
              autoFocus
            />
          </div>
          {selected.length > 0 && (
            <button 
              onClick={onClear}
              className="ml-3 text-xs font-bold text-sc-green-dark hover:text-sc-green-dark/80 transition-colors whitespace-nowrap"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="max-h-64 overflow-y-auto custom-scrollbar pr-1 flex-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div 
                key={`${opt.label}-${idx}`}
                onClick={() => onToggle(opt.label)}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer group transition-colors"
              >
                <div className={cn(
                  "w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0",
                  selected.includes(opt.label) 
                    ? "bg-sc-green-dark border-sc-green-dark" 
                    : "bg-white border-slate-200 group-hover:border-sc-green-dark/50"
                )}>
                  {selected.includes(opt.label) && <Check size={10} className="text-white" />}
                </div>
                <span className={cn(
                  "text-sm transition-colors truncate",
                  selected.includes(opt.label) ? "text-slate-900 font-medium" : "text-slate-600"
                )}>
                  {opt.label}
                </span>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-slate-400">Nenhum resultado encontrado</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
