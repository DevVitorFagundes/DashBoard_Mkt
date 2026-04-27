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
  CheckCircle2,
  FileText,
  Target,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface FunnelDeepDiveProps {
  data: any;
}

const meses = [
  'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export const FunnelDeepDive: React.FC<FunnelDeepDiveProps> = ({ data }) => {
  const propostasConquistadas = data.relacionamento.propostasConquistadas;
  const propostasEnviadas = data.relacionamento.propostasEnviadas;

  // Transform data for the chart
  const chartData = meses.map((mes, index) => {
    // Only show data for Jan, Feb, Mar (index 0, 1, 2)
    const isDataAvailable = index < 3;
    
    if (!isDataAvailable) {
      return {
        name: mes.charAt(0).toUpperCase() + mes.slice(1, 3),
        fullName: mes,
      };
    }

    const volume = propostasConquistadas.volumeNegocios[mes as keyof typeof propostasConquistadas.volumeNegocios] || 0;
    const enviadas = propostasEnviadas.totalComEquipe[mes as keyof typeof propostasEnviadas.totalComEquipe] || 0;
    const conquistadas = propostasConquistadas.quantidade[mes as keyof typeof propostasConquistadas.quantidade] || 0;

    return {
      name: mes.charAt(0).toUpperCase() + mes.slice(1, 3),
      fullName: mes,
      volume: volume / 1000, // Left Axis (Financial)
      conquistadas: conquistadas, // Right Axis (Quantity)
      displayVolume: volume,
      ticketMedio: conquistadas > 0 ? (volume / conquistadas) / 1000 : 0, // Left Axis (Financial)
      enviadas: enviadas
    };
  });

  const avgTicketTotal = propostasConquistadas.quantidade.total > 0 
    ? propostasConquistadas.volumeNegocios.total / propostasConquistadas.quantidade.total 
    : 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (!data.displayVolume) return null;
      
      return (
        <div className="bg-white p-6 rounded-[14px] shadow-xl border border-slate-100 min-w-[280px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">
            {data.fullName}
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Volume de Negócios</p>
              <p className="text-xl font-black text-sc-green-dark">{formatCurrency(data.displayVolume)}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Ticket Médio</p>
              <p className="text-lg font-black text-[#D4AF37]">{formatCurrency(data.ticketMedio * 1000)}</p>
            </div>
            
            <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Quantidade Conquistada</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black text-sc-turquoise">{data.conquistadas}</span>
                  <span className="text-[10px] text-slate-300">propostas</span>
                </div>
              </div>
              <CheckCircle2 size={24} className="text-sc-turquoise/20" />
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume de Negócios</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-sc-green-dark">
              {formatCurrency(propostasConquistadas.volumeNegocios.total)}
            </h3>
            <p className="text-[9px] font-bold text-sc-green mt-2 uppercase tracking-tighter">Acumulado Jan-Mar</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Médio</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#D4AF37]">
              {formatCurrency(avgTicketTotal)}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Performance Estável</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enviadas</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              {propostasEnviadas.totalComEquipe.total}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Emissão Total</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[14px] border border-slate-100 transition-all hover:shadow-md h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-sc-turquoise">
              {propostasConquistadas.quantidade.total}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Conquistadas</p>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-10 rounded-[14px] border border-slate-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-sc-green-dark" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h4 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Visão detalhada do funil de vendas</h4>
            <p className="text-xs text-slate-400 font-medium tracking-tight">Evolução financeira e volumétrica de performance</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-sc-turquoise" />
              <div className="w-2 h-2 rounded-full bg-sc-turquoise" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Quantidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-sc-green-dark" />
              <div className="w-2 h-2 rounded-full bg-sc-green-dark" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Volume (k)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[#D4AF37]" />
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ticket Médio (k)</span>
            </div>
          </div>
        </div>

        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004D40" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#004D40" stopOpacity={0}/>
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
                tickFormatter={(value) => `R$ ${value}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }} />
              
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="conquistadas" 
                name="Quantidade"
                stroke="#82BC00" 
                strokeWidth={4} 
                dot={{ r: 5, fill: '#82BC00', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#82BC00', stroke: '#fff', strokeWidth: 3 }}
                animationDuration={1000}
              />

              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="volume" 
                name="Volume"
                stroke="#004D40" 
                strokeWidth={4} 
                dot={{ r: 5, fill: '#004D40', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#004D40', stroke: '#fff', strokeWidth: 3 }}
                animationDuration={1500}
              />

              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="ticketMedio"
                name="Ticket Médio"
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
