import React from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  Target, 
  BarChart2,
  TrendingUp,
  Award
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { ImportButton } from './ImportButton';
import { LayoutGroup } from 'motion/react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onDataImported: (data: any[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onDataImported }) => {
  const comercialItems = [
    { id: 'visao-executiva', icon: LayoutDashboard, label: 'Visão Geral' },
    { id: 'relacionamento', icon: Target, label: 'Relacionamento' },
  ];

  const marketingItems = [
    { id: 'marketing', icon: BarChart2, label: 'Marketing' },
  ];

  return (
    <aside className="w-72 min-w-[288px] max-w-[288px] shrink-0 bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable] select-none">
      <div className="mb-10 flex flex-col items-center shrink-0 min-h-[100px]">
        <div className="w-[150px] h-[60px] mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src="https://www.jotform.com/uploads/safrasecifras/form_files/Logo%20Safras%20Cifras_Preto.670e4ddf67e528.20076362.png" 
            alt="Safra & Cifras" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-[11px] font-bold text-sc-brand-blue uppercase tracking-[0.15em] text-center font-poppins opacity-80 h-4">
          Inteligência de Mercado
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-8">
        {/* Section 1: COMERCIAL & LEADS */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 mb-2">
            <TrendingUp size={14} className="text-sc-turquoise" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comercial & Leads</p>
          </div>
          {comercialItems.map((item) => (
            <SidebarItem 
              key={item.id}
              icon={item.icon} 
              label={item.label} 
              active={currentView === item.id}
              onClick={() => onViewChange(item.id)}
            />
          ))}
        </div>

        {/* Section 2: MARKETING & MARCA */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 mb-2">
            <Award size={14} className="text-sc-blue" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marketing & Marca</p>
          </div>
          {marketingItems.map((item) => (
            <SidebarItem 
              key={item.id}
              icon={item.icon} 
              label={item.label} 
              active={currentView === item.id}
              onClick={() => onViewChange(item.id)}
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100 shrink-0">
        <ImportButton onDataImported={onDataImported} />
      </div>
    </aside>
  );
};
