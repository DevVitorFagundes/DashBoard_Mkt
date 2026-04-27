import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { motion } from 'motion/react';

interface ServiceChartProps {
  data: { name: string, value: number }[];
}

export const ServiceChart: React.FC<ServiceChartProps> = ({ data }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="lg:col-span-3 bg-white p-8 rounded-[14px] shadow-sm border border-slate-100"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Leads por Serviço</h3>
          <p className="text-sm text-slate-400 font-medium">Total proposta (R$)</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-sc-turquoise/10 rounded-full">
          <div className="w-2 h-2 rounded-full bg-sc-turquoise" />
          <span className="text-[10px] font-bold text-sc-turquoise uppercase tracking-widest">Valor Total</span>
        </div>
      </div>

      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fontWeight: 500, fill: '#64748b' }}
              width={120}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)} mi`, 'Valor']}
            />
            <Bar 
              dataKey="value" 
              fill="#004D40" 
              radius={[0, 8, 8, 0]} 
              barSize={24}
            >
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value: number) => `R$ ${value.toFixed(2)} mi`}
                style={{ fontSize: '10px', fontWeight: 600, fill: '#64748b' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};
