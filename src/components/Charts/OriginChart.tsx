import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Undo2 } from 'lucide-react';

interface ChartItem {
  name: string;
  value: number;
  count: number;
}

interface OriginChartProps {
  data: {
    main: ChartItem[];
    others: ChartItem[];
  };
  colors: string[];
}

export const OriginChart: React.FC<OriginChartProps> = ({ data, colors }) => {
  const [isDrilledDown, setIsDrilledDown] = React.useState(false);

  const currentData = isDrilledDown ? data.others : data.main;
  const title = isDrilledDown ? 'Outros' : 'Fontes de Leads';
  const subtitle = isDrilledDown ? null : 'Propostas por Origem';

  const handleSliceClick = (entry: any) => {
    if (entry && entry.name === 'Outros' && !isDrilledDown) {
      setIsDrilledDown(true);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="lg:col-span-2 bg-white p-8 rounded-[14px] shadow-sm border border-slate-100 flex flex-col min-h-[550px] relative"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <AnimatePresence>
          {isDrilledDown && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsDrilledDown(false)}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-sc-turquoise"
              title="Voltar"
            >
              <Undo2 size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {subtitle && <p className="text-sm text-slate-400 mb-8 font-medium">{subtitle}</p>}
      {!subtitle && <div className="mb-8" />}
      
      <div className="h-[280px] w-full relative shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              onClick={handleSliceClick}
              style={{ cursor: !isDrilledDown ? 'pointer' : 'default' }}
            >
              {currentData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={isDrilledDown ? '#004D40' : colors[index % colors.length]} 
                  style={{ 
                    opacity: isDrilledDown ? 1 - (index * 0.15) : 1,
                    outline: 'none'
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number, name: string, props: any) => {
                return [`${value}% (${props.payload.count} Propostas)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {currentData.map((item, index) => (
          <div 
            key={item.name} 
            className={`flex items-center justify-between gap-4 py-2 px-3 rounded-[14px] transition-all ${item.name === 'Outros' && !isDrilledDown ? 'cursor-pointer hover:bg-slate-50 ring-1 ring-transparent hover:ring-sc-turquoise/20' : 'hover:bg-slate-50/50'}`}
            onClick={() => item.name === 'Outros' && !isDrilledDown && setIsDrilledDown(true)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-3 h-3 rounded-full shrink-0 shadow-sm" 
                style={{ 
                  backgroundColor: isDrilledDown ? '#004D40' : colors[index % colors.length],
                  opacity: isDrilledDown ? 1 - (index * 0.12) : 1
                }} 
              />
              <span className={`text-sm font-semibold truncate ${item.name === 'Outros' && !isDrilledDown ? 'text-sc-turquoise' : 'text-slate-600'}`}>
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400">({item.value}%)</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
