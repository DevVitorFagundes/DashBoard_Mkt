import React from 'react';
import { Filter, ChevronDown, X, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { FilterDropdown } from './FilterDropdown';

interface FilterSectionProps {
  isCompact: boolean;
  totalActiveFilters: number;
  filters: string[];
  filterOptions: Record<string, { label: string, count: number }[]>;
  selectedFilters: Record<string, string[]>;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeDrawerCategory: string | null;
  setActiveDrawerCategory: (category: string | null) => void;
  handleToggleFilter: (filter: string, label: string) => void;
  handleClearFilter: (filter: string) => void;
  clearAllFilters: () => void;
  filterRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  isCompact,
  totalActiveFilters,
  filters,
  filterOptions,
  selectedFilters,
  activeFilter,
  setActiveFilter,
  isDrawerOpen,
  setIsDrawerOpen,
  activeDrawerCategory,
  setActiveDrawerCategory,
  handleToggleFilter,
  handleClearFilter,
  clearAllFilters,
  filterRefs
}) => {
  return (
    <>
      <section className="bg-white p-1.5 rounded-[14px] shadow-sm border border-slate-100 mb-8 flex items-center flex-wrap gap-1.5 relative z-[100] overflow-visible">
        <div className="flex items-center gap-2 px-3 py-1.5 border-r border-slate-100 mr-1">
          <Filter size={14} className="text-sc-green-dark" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Filtros</span>
        </div>
        
        {isCompact ? (
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-[14px] text-xs font-bold transition-all border",
              totalActiveFilters > 0 
                ? "bg-sc-green-dark text-white border-sc-green-dark shadow-md shadow-sc-green-dark/20" 
                : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
            )}
          >
            <Filter size={12} />
            Filtros Avançados
            {totalActiveFilters > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white text-sc-green-dark text-[10px] rounded-full font-black">
                {totalActiveFilters}
              </span>
            )}
          </button>
        ) : (
          filters.map((filter) => (
            <div key={filter} className="relative">
              <button 
                ref={el => { filterRefs.current[filter] = el; }}
                onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-[14px] text-xs font-bold transition-all whitespace-nowrap border border-transparent min-w-[90px] justify-between",
                  activeFilter === filter 
                    ? "bg-sc-green-dark text-white shadow-md shadow-sc-green-dark/20" 
                    : (selectedFilters[filter]?.length > 0 
                        ? "bg-sc-green-dark/10 text-sc-green-dark border-sc-green-dark/20" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100")
                )}
              >
                <div className="flex items-center gap-2">
                  {filter}
                </div>
                <ChevronDown size={12} className={cn("transition-transform shrink-0 ml-1", activeFilter === filter && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {activeFilter === filter && (
                  <FilterDropdown 
                    filter={filter}
                    options={filterOptions[filter]}
                    selected={selectedFilters[filter] || []}
                    onToggle={(label) => handleToggleFilter(filter, label)}
                    onClear={() => handleClearFilter(filter)}
                    onClose={() => setActiveFilter(null)}
                    triggerRef={{ current: filterRefs.current[filter] }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </section>

      {/* Filter Drawer (Mobile/Compact) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sc-green-dark/10 rounded-lg text-sc-green-dark">
                    <Filter size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Filtros</h3>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {filters.map((filter) => (
                  <div key={filter} className="border border-slate-100 rounded-[14px] overflow-hidden">
                    <button 
                      onClick={() => setActiveDrawerCategory(activeDrawerCategory === filter ? null : filter)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 transition-colors",
                        activeDrawerCategory === filter ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "font-bold transition-colors",
                          selectedFilters[filter]?.length > 0 ? "text-sc-green-dark" : "text-slate-700"
                        )}>
                          {filter}
                        </span>
                      </div>
                      <ChevronRight 
                        size={18} 
                        className={cn("text-slate-400 transition-transform", activeDrawerCategory === filter && "rotate-90")} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeDrawerCategory === filter && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white border-t border-slate-50"
                        >
                          <div className="p-4 h-[350px]">
                            <FilterDropdown 
                              filter={filter}
                              options={filterOptions[filter]}
                              selected={selectedFilters[filter] || []}
                              onToggle={(label) => handleToggleFilter(filter, label)}
                              onClear={() => handleClearFilter(filter)}
                              onClose={() => {}}
                              isDrawer
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <button 
                  onClick={clearAllFilters}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-[14px] text-slate-600 font-bold hover:bg-slate-50 transition-all"
                >
                  <RotateCcw size={16} />
                  Limpar Tudo
                </button>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-3 px-4 bg-sc-green-dark text-white rounded-[14px] font-bold shadow-lg shadow-sc-green-dark/20 hover:bg-sc-green-dark/90 transition-all"
                >
                  Aplicar Filtros
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
