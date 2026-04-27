import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion } from 'motion/react';

interface RevenueChartProps {
  data: any[];
  origins: string[];
  colors: string[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, origins, colors }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Dinheiro Gerado ao Longo do Ano</h3>
          <p className="text-sm text-slate-400 font-medium">Receita fechada por origem (k R$)</p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
              tickFormatter={(value: string) => {
                const [year, month] = value.split('-');
                const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
              }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
              labelFormatter={(label) => {
                const [year, month] = label.split('-');
                const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                return `${months[parseInt(month) - 1]} de ${year}`;
              }}
              formatter={(value: number, name: string) => [
                `R$ ${value.toLocaleString('pt-BR')}k`, 
                name === 'total' ? 'Total Mensal' : name
              ]}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
            />
            {origins.map((origin, index) => (
              <Bar 
                key={origin}
                dataKey={origin} 
                stackId="a" 
                fill={colors[index % colors.length]} 
                radius={index === origins.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};

export default RevenueChart;
