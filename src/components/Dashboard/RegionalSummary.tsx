import React from 'react';
import { motion } from 'framer-motion';

interface RegionalData {
  Regionais?: string;
  Clientes: string;
  Serviços: string;
  'Valor TT': string;
  Cidades: string;
  'Área TT': string;
  'Faixa de área': string;
  'Macro Regional': string;
  'Abaixo de 500': string;
  'Acima de 5000': string;
  'Entre 1500 e 2500': string;
  'Entre 2500 e 5000': string;
  'Entre 500 e 1500': string;
  'Sem Info': string;
  'Total Geral': string;
}

interface RegionalSummaryProps {
  data: RegionalData[];
}

export const RegionalSummary: React.FC<RegionalSummaryProps> = ({ data }) => {
  // Filter out the "Total Geral" row if needed, or handle it specially
  const mainData = data.filter(item => item['Macro Regional'] !== 'Total Geral' && item['Faixa de área'] !== 'Sem Info');
  const totalRow = data.find(item => item['Macro Regional'] === 'Total Geral');

  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/30">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Resumo Regional (Base Geral)</h3>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Macro Regional</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Clientes</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Serviços</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Valor Total</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Área TT</th>
            </tr>
          </thead>
          <tbody>
            {mainData.map((item, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0"
              >
                <td className="p-4 text-xs font-bold text-slate-700">{item['Macro Regional']}</td>
                <td className="p-4 text-xs font-medium text-slate-600 text-right">{item.Clientes}</td>
                <td className="p-4 text-xs font-medium text-slate-600 text-right">{item.Serviços}</td>
                <td className="p-4 text-xs font-bold text-sc-turquoise text-right">{item['Valor TT']}</td>
                <td className="p-4 text-xs font-medium text-slate-500 text-right">{item['Área TT']}</td>
              </motion.tr>
            ))}
            {totalRow && (
              <tr className="bg-slate-50 font-bold">
                <td className="p-4 text-xs text-slate-800 uppercase tracking-wider">Total Geral</td>
                <td className="p-4 text-xs text-slate-800 text-right">{totalRow.Clientes || totalRow['Total Geral']}</td>
                <td className="p-4 text-xs text-slate-800 text-right">{totalRow.Serviços || '-'}</td>
                <td className="p-4 text-xs text-sc-turquoise text-right">{totalRow['Valor TT'] || '-'}</td>
                <td className="p-4 text-xs text-slate-800 text-right">{totalRow['Área TT'] || '-'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
