import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/src/lib/utils';

interface RankingItem {
  name: string;
  value: number;
}

interface ConquistadasSectionProps {
  totalConquistadas: number;
  taxaConversao: number;
  volumeNegocios: number;
  rankingConsultor: RankingItem[];
  rankingArea: RankingItem[];
  rankingRegional: RankingItem[];
}

export const ConquistadasSection: React.FC<ConquistadasSectionProps> = ({
  totalConquistadas,
  taxaConversao,
  volumeNegocios,
  rankingConsultor,
  rankingArea,
  rankingRegional
}) => {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-sc-green-dark p-8 rounded-[14px] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-y-16 translate-x-16 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
          <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-4">Total Conquistadas</p>
          <div className="flex items-baseline gap-4">
            <h3 className="text-6xl font-black text-white tracking-tighter">{totalConquistadas}</h3>
            <span className="text-lg font-bold text-sc-green tracking-tight">{taxaConversao}% Conversão</span>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-[14px] shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-full bg-slate-50 -translate-x-12 skew-x-12 opacity-50" />
           <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Volume de Negócios</p>
            <h3 className="text-5xl font-black text-slate-800 tracking-tighter">
              R$ {(volumeNegocios / 1000000).toFixed(1)} mi
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-sc-green" />
              <span className="text-xs font-black text-sc-green uppercase tracking-widest">Meta Batida</span>
            </div>
           </div>
        </div>
      </div>

      {/* Rankings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RankingList title="Conquistados por Consultor" items={rankingConsultor} />
        <RankingList title="Conquistados por Área" items={rankingArea} />
        <RankingList title="Conquistados por Regional" items={rankingRegional} />
      </div>
    </div>
  );
};

const RankingList: React.FC<{ title: string; items: RankingItem[] }> = ({ title, items }) => {
  const maxValue = Math.max(...items.map(i => i.value), 1);
  
  return (
    <div className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100 h-[400px] flex flex-col">
      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex-shrink-0">{title}</h4>
      <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar flex-grow">
        {items.map((item, idx) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">{item.name}</span>
              <span className="text-sm font-black text-slate-800">{item.value}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                className="h-full bg-sc-green-dark rounded-full"
                transition={{ delay: idx * 0.1, duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
