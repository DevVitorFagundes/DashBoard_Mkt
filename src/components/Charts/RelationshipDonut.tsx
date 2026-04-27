import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DonutData {
  name: string;
  value: number;
  color: string;
}

interface RelationshipDonutProps {
  title: string;
  subtitle: string;
  totalLabel: string;
  totalValue: string;
  data: DonutData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-[12px] shadow-xl border border-slate-50 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
          <p className="text-[11px] font-black text-sc-green-dark uppercase tracking-wider">
            {data.name}
          </p>
        </div>
        <p className="text-sm font-black text-slate-800 ml-4">
          {data.value}
        </p>
      </div>
    );
  }
  return null;
};

export const RelationshipDonut: React.FC<RelationshipDonutProps> = ({ title, subtitle, totalLabel, totalValue, data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 flex flex-col h-full transition-all hover:bg-white hover:shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
        <button className="p-1 text-slate-300 hover:text-slate-500">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex items-center gap-8 flex-1">
        <div className="w-1/2 aspect-square relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                style={{ outline: 'none', cursor: 'pointer' }}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ 
                      outline: 'none',
                      transition: 'opacity 0.3s ease',
                      opacity: activeIndex !== null && activeIndex !== index ? 0.2 : 1
                    }} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-1/2 space-y-3">
          {data.map((item, idx) => (
            <div 
              key={item.name} 
              className={cn(
                "flex items-center justify-between group cursor-default transition-all duration-300",
                activeIndex !== null && activeIndex !== idx && "opacity-20 scale-[0.98]"
              )}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                <span className={cn(
                  "text-xs font-bold transition-colors",
                  activeIndex === idx ? "text-slate-900" : "text-slate-500"
                )}>
                  {item.name}
                </span>
              </div>
              <span className={cn(
                "text-xs font-black transition-colors",
                activeIndex === idx ? "text-sc-green-dark" : "text-slate-800"
              )}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
