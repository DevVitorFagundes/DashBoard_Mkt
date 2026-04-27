import React from 'react';
import { motion } from 'framer-motion';

interface ConsultantItem {
  name: string;
  count: number;
  conversionRate?: number;
}

interface ConsultantChartProps {
  data: ConsultantItem[];
}

const ConsultantChart: React.FC<ConsultantChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(item => item.count), 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6">Propostas por Consultor</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center group">
            <div className="w-32 text-xs text-slate-600 font-bold truncate pr-4 text-right">
              {item.name}
            </div>
            
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / maxCount) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full bg-sc-turquoise flex items-center justify-end px-3 group-hover:bg-sc-blue transition-colors"
                >
                  <span className="text-[10px] font-black text-white drop-shadow-sm">
                    {item.count}
                  </span>
                </motion.div>
              </div>
              {item.conversionRate !== undefined && (
                <div className="w-16 text-right">
                  <span className="text-[10px] font-black text-sc-green-dark">
                    {item.conversionRate.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        <div className="flex gap-8">
          {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26].map(tick => (
            <span key={tick} className="w-4 text-center">{tick}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantChart;
