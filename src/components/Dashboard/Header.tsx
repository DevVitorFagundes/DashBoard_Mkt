import React from 'react';

import { Search, Bell, ChevronDown, Share2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  hideFilters?: boolean;
  hideTopBar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, action, hideFilters, hideTopBar }) => {
  return (
    <div className="flex flex-col gap-8 mb-8">
      {/* Top Bar */}
      {!hideTopBar && (
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-[14px] text-sm focus:outline-none focus:ring-2 focus:ring-sc-green-dark/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-sm font-bold text-sc-green-dark hover:underline flex items-center gap-1">
                Filtros Ativos
                <div className="w-1.5 h-1.5 rounded-full bg-sc-green-dark" />
              </button>
              <button className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2">
                Exportar Relatório
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                <Bell size={20} />
                <div className="absolute top-2 right-2 w-2 h-2 bg-sc-blue rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm group-hover:border-sc-green-dark transition-all">
                  <img 
                    src="https://picsum.photos/seed/user/100/100" 
                    alt="User" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 font-medium mt-1 text-lg">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {action}
          {!hideFilters && (
            <div className="bg-white px-4 py-2 rounded-[14px] shadow-sm border border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtro:</span>
              <span className="text-sm font-bold text-slate-700">Comparar mês a mês</span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
