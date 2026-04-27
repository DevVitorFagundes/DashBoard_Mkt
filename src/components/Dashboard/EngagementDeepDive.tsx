import React from 'react';
import { 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users,
  Instagram,
  Youtube,
  Globe,
  Zap,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface EngagementDeepDiveProps {
  data: any;
}

const meses = [
  'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export const EngagementDeepDive: React.FC<EngagementDeepDiveProps> = ({ data }) => {
  const mkt = data.marketing;

  // Transform data for the chart
  const chartData = meses.map((mes, index) => {
    // Only show data for Jan, Feb, Mar
    const isDataAvailable = index < 3;

    if (!isDataAvailable) {
      return {
        name: mes.charAt(0).toUpperCase() + mes.slice(1, 3),
        fullName: mes,
      };
    }

    const metaTotal = mkt.engajamento.metaTotal[mes as keyof typeof mkt.engajamento.metaTotal] || 0;
    const leadsTotal = mkt.leads.total[mes as keyof typeof mkt.leads.total] || 0;
    const leadsMkt = mkt.leads.marketingDigital[mes as keyof typeof mkt.leads.marketingDigital] || 0;
    const representatividade = leadsTotal > 0 ? (leadsMkt / leadsTotal) * 100 : 0;

    return {
      name: mes.charAt(0).toUpperCase() + mes.slice(1, 3),
      fullName: mes,
      engajamento: metaTotal / 1000, // Left Axis (Thousands)
      representatividade: representatividade, // Right Axis (%)
      displayEngajamento: metaTotal
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (!data.displayEngajamento) return null;

      return (
        <div className="bg-white p-6 rounded-[14px] shadow-xl border border-slate-100 min-w-[280px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">
            {data.fullName}
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Engajamento Total</p>
              <p className="text-xl font-black text-sc-blue">{data.displayEngajamento.toLocaleString('pt-BR')}</p>
            </div>
            
            <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Repres. Mkt</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black text-[#D4AF37]">{data.representatividade.toFixed(1)}%</span>
                  <span className="text-[10px] text-slate-300">do total</span>
                </div>
              </div>
              <Zap size={24} className="text-sc-turquoise/20" />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12">
      {/* Header with Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engajamento Meta</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              {mkt.engajamento.metaTotal.total.toLocaleString('pt-BR')}
            </h3>
            <p className="text-[9px] font-bold text-sc-blue mt-2 uppercase tracking-tighter">Total Jan-Mar</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads Mkt</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              {mkt.leads.marketingDigital.total}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Captação Direta</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instagram</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              {mkt.redesSociais.instagram.total.toLocaleString('pt-BR')}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Interações</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Youtube</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              {mkt.redesSociais.youtube.total.toLocaleString('pt-BR')}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Ações Realizadas</p>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-10 rounded-[14px] border border-slate-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-sc-turquoise" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h4 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Visão detalhada do engajamento</h4>
            <p className="text-xs text-slate-400 font-medium tracking-tight">Performance de canais digitais e eficiência de conversão</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-3 rounded-sm bg-[#00838F]/20 border-t-2 border-[#00838F]" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Engajamento Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#D4AF37]" />
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Repres. Mkt (%)</span>
            </div>
          </div>
        </div>

        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEngajamento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00838F" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#00838F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                dy={15}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                tickFormatter={(val) => `${val}k`}
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                tickFormatter={(val) => `${val}%`}
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="engajamento" 
                stroke="#006064" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEngajamento)" 
                dot={{ r: 4, fill: '#006064', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#006064', stroke: '#fff', strokeWidth: 3 }}
                animationDuration={1500}
              />
              
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="representatividade" 
                stroke="#D4AF37" 
                strokeWidth={4} 
                dot={{ r: 5, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#D4AF37', stroke: '#fff', strokeWidth: 3 }}
                animationDuration={2000}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
