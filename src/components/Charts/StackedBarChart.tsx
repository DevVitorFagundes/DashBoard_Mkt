import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

interface StackedBarChartProps {
  data: any[];
  dimension: string;
  breakdown: string;
  metric: string;
  colors: string[];
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, dimension, breakdown, metric, colors }) => {
  // Extract unique dimensions and breakdowns
  const dimensions = Array.from(new Set(data.map(item => String(item[dimension])))).sort();
  const breakdowns = Array.from(new Set(data.map(item => String(item[breakdown])))).sort();

  // Calculate values for the stacked bar chart
  const chartData = dimensions.map((dim: string) => {
    const entry: Record<string, string | number> = { name: dim };
    breakdowns.forEach((brk: string) => {
      entry[brk] = data.filter(item => String(item[dimension]) === dim && String(item[breakdown]) === brk).length;
    });
    return entry;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-[14px] shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-sc-blue mb-6">Qualidade do Lead por Origem</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px' }}
            />
            {breakdowns.map((brk: string, index: number) => (
              <Bar 
                key={brk} 
                dataKey={brk} 
                stackId="a" 
                fill={colors[index % colors.length]} 
                radius={index === breakdowns.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
