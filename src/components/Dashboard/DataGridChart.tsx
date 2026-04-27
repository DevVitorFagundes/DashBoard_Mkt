import React from 'react';
import { motion } from 'framer-motion';

interface DataGridItem {
  label: string;
  value: number;
  count: number;
}

interface DataGridChartProps {
  title: string;
  data: DataGridItem[];
  valueLabel?: string;
  countLabel?: string;
  color?: string;
}

const DataGridChart: React.FC<DataGridChartProps> = ({
  title,
  data,
  valueLabel = "Proposta (R$)",
  countLabel = "Quantidade",
  color = "#0097A7"
}) => {
  const maxValue = Math.max(...data.map(item => item.value), 1);
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const totalCount = data.reduce((acc, item) => acc + item.count, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">{title}</h3>
        <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="w-[150px] text-left hidden lg:block"></span> {/* Spacer for label */}
          <span className="flex-1 hidden lg:block"></span> {/* Spacer for bar */}
          <span className="w-[120px] text-right pr-4">{valueLabel}</span>
          <span className="w-[80px] text-right">{countLabel}</span>
        </div>
      </div>
      
      <div className="overflow-y-auto custom-scrollbar flex-1 min-h-[300px] max-h-[400px]">
        {data.map((item, index) => (
          <div key={index} className="flex items-center px-5 py-3 hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
            <div className="w-[150px] shrink-0 text-xs font-medium text-slate-600 truncate pr-4" title={item.label}>
              {item.label}
            </div>
            
            <div className="flex-1 h-5 bg-slate-50 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full flex items-center justify-end px-2"
                style={{ backgroundColor: color }}
              >
                <span className="text-[8px] font-black text-white opacity-80">
                  {((item.value / totalValue) * 100).toFixed(0)}%
                </span>
              </motion.div>
            </div>
            
            <div className="w-[120px] shrink-0 text-right pr-4 text-xs font-bold text-slate-500">
              {formatCurrency(item.value)}
            </div>
            
            <div className="w-[80px] shrink-0 text-right text-xs font-bold text-slate-400">
              {item.count}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center mt-auto">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total geral</span>
        <div className="flex items-center">
          <span className="w-[150px] hidden lg:block"></span>
          <span className="flex-1 hidden lg:block"></span>
          <span className="w-[120px] text-right pr-4 text-xs font-extrabold text-slate-700">{formatCurrency(totalValue)}</span>
          <span className="w-[80px] text-right text-xs font-extrabold text-slate-700">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default DataGridChart;
