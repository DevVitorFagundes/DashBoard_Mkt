import React from 'react';
import { motion } from 'framer-motion';

interface RegionalData {
  region: string;
  total: number;
  relacionamento: number;
}

interface RegionalPerformanceProps {
  data: RegionalData[];
}

export const RegionalPerformance: React.FC<RegionalPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Performance Regional por Envolvimento</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">Relação entre Propostas Totais e Envolvimento de Relacionamento</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-sc-turquoise/40" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-sc-green-dark" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Relacionamento</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((item, idx) => {
          const percentage = (item.relacionamento / item.total) * 100;
          return (
            <div key={item.region} className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{item.region}</span>
              </div>
              <div className="col-span-8">
                <div className="h-6 bg-sc-turquoise/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.total / Math.max(...data.map(d => d.total))) * 100}%` }}
                    className="absolute inset-0 bg-sc-turquoise/30 rounded-full"
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.relacionamento / Math.max(...data.map(d => d.total))) * 100}%` }}
                    className="absolute inset-0 bg-sc-green-dark rounded-full"
                  />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800">{item.relacionamento}/{item.total}</span>
                  <span className={cn(
                    "text-[10px] font-black",
                    percentage >= 50 ? "text-sc-green-dark" : "text-sc-blue"
                  )}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { cn } from '@/src/lib/utils';
