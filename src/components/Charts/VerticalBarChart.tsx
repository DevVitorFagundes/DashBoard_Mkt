import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface VerticalBarChartProps {
  data: { name: string; value: number }[];
  title: string;
  subtitle?: string;
}

export const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data, title, subtitle }) => {
  return (
    <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 h-full transition-all hover:bg-white hover:shadow-sm">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 font-medium mt-1">{subtitle}</p>}
      </div>

      <div className="h-[400px] w-full outline-none select-none">
        <ResponsiveContainer width="100%" height="100%" className="outline-none border-none">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }} 
              className="outline-none focus:outline-none focus:ring-0 border-none"
              style={{ outline: 'none', border: 'none' }}
              tabIndex={-1}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" pointerEvents="none" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                stroke="none"
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                stroke="none"
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc', stroke: 'none' }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none'
                }}
                itemStyle={{ color: '#1e293b' }}
                formatter={(value: any) => [value, "QTD"]}
                labelStyle={{ color: '#64748b', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="value" 
                name="QTD" 
                radius={[4, 4, 0, 0]} 
                barSize={12}
                activeBar={false}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index % 2 === 0 ? '#004D40' : '#82BC00'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};
