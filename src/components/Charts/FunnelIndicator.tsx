import React from 'react';
import { motion } from 'framer-motion';

interface FunnelIndicatorProps {
  leadsTotais: number;
  taxaFunil: number;
}

export const FunnelIndicator: React.FC<FunnelIndicatorProps> = ({ leadsTotais, taxaFunil }) => {
  return (
    <div className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100 flex flex-col items-center justify-center h-full text-center">
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="8"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#004D40"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 88}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - taxaFunil / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-800">{leadsTotais}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads Totais</span>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Taxa de Funil</h4>
        <p className="text-[10px] text-slate-400 font-medium leading-tight mb-4">
          Eficiência de envio vs reuniões
        </p>
        <p className="text-4xl font-black text-sc-green-dark">{taxaFunil}%</p>
      </div>
    </div>
  );
};
