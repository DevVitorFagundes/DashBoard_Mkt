import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell,
  ComposedChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Lightbulb, TrendingUp } from 'lucide-react';
import { cn, formatCurrencyMi } from '../../lib/utils';
import data from '../../data/indicadores.json';

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

type SegmentType = 'area' | 'origem' | 'regional' | 'consultor';

export const RelationshipComparison: React.FC = () => {
  const [segment, setSegment] = useState<SegmentType>('area');
  const relData = data.indicadores2026.relacionamento;
  const conquistaData = relData.propostasConquistadas;

  // Process data for Agendamentos
  const agendamentosChartData = meses.map((mes, index) => {
    const mesFull = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][index];
    
    // Use real data from JSON for available months, else 0
    const produtores = relData.agendamentos.produtores.total[mesFull as keyof typeof relData.agendamentos.produtores.total] || 0;
    const parceiros = relData.agendamentos.parceiros.total[mesFull as keyof typeof relData.agendamentos.parceiros.total] || 0;

    return {
      name: mes,
      produtores,
      parceiros,
    };
  });

  // Process data for Propostas Enviadas (Mocking Gerências since JSON doesn't provide them per month)
  const propostasChartData = meses.map((mes, index) => {
    const mesFull = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][index];
    const total = relData.propostasEnviadas.totalComEquipe[mesFull as keyof typeof relData.propostasEnviadas.totalComEquipe] || 0;

    // Distribute total into 4 mock gerências if total > 0
    if (total > 0) {
      return {
        name: mes,
        gerencia1: Math.floor(total * 0.3),
        gerencia2: Math.floor(total * 0.25),
        gerencia3: Math.floor(total * 0.25),
        gerencia4: total - Math.floor(total * 0.3) - Math.floor(total * 0.25) - Math.floor(total * 0.25),
      };
    }

    return {
      name: mes,
      gerencia1: 0,
      gerencia2: 0,
      gerencia3: 0,
      gerencia4: 0,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isQuantity = payload[0].value < 1000;
      return (
        <div className="bg-white p-4 rounded-[14px] shadow-xl border border-slate-100 min-w-[200px]">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-50 pb-2">{label}</p>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-[11px] font-bold text-slate-600">{entry.name}</span>
                </div>
                <span className="text-[11px] font-black text-slate-900">
                  {!isQuantity && typeof entry.value === 'number' && entry.value > 1000 ? formatCurrencyMi(entry.value) : entry.value}
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Total</span>
              <span className="text-[11px] font-black text-slate-900">
                {isQuantity 
                  ? payload.reduce((acc: number, entry: any) => acc + (typeof entry.value === 'number' ? entry.value : 0), 0)
                  : formatCurrencyMi(payload.reduce((acc: number, entry: any) => acc + (typeof entry.value === 'number' ? entry.value : 0), 0))}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Segment configurations
  const segmentConfig = {
    area: [
      { key: 'v1', label: 'Patrimonial', color: '#004D40' },
      { key: 'v2', label: 'GEF', color: '#00796B' },
      { key: 'v3', label: 'Contábil', color: '#82BC00' },
      { key: 'v4', label: 'Governança', color: '#D4AF37' },
    ],
    origem: [
      { key: 'v1', label: 'Mkt Digital', color: '#004D40' },
      { key: 'v2', label: 'Eventos', color: '#82BC00' },
      { key: 'v3', label: 'Indicações', color: '#D4AF37' },
      { key: 'v4', label: 'Prospecção', color: '#334155' },
    ],
    regional: [
      { key: 'v1', label: 'Sul', color: '#004D40' },
      { key: 'v2', label: 'Centro-Oeste', color: '#82BC00' },
      { key: 'v3', label: 'Sudeste', color: '#D4AF37' },
      { key: 'v4', label: 'Norte/NE', color: '#334155' },
    ],
    consultor: [
      { key: 'v1', label: 'Djulio', color: '#004D40' },
      { key: 'v2', label: 'Nathalia', color: '#00796B' },
      { key: 'v3', label: 'Carolyne', color: '#82BC00' },
      { key: 'v4', label: 'Leiridiana', color: '#D4AF37' },
    ]
  };

  const conquistasChartData = meses.map((mes, index) => {
    // Totals derived from screenshot distributed Jan/Feb/Mar
    // Area: P:18, G:12, C:10, Gov:6
    const dataArea = [
      { v1: 3, v2: 2, v3: 2, v4: 1 }, // Jan (Total 8)
      { v1: 6, v2: 4, v3: 3, v4: 2 }, // Feb (Total 15)
      { v1: 9, v2: 6, v3: 5, v4: 3 }, // Mar (Total 23)
    ];

    // Origem: MD:7, E:3, P:0, I:6
    const dataOrigem = [
      { v1: 1, v2: 1, v3: 1, v4: 0 }, 
      { v1: 2, v2: 1, v3: 2, v4: 0 },
      { v1: 4, v2: 1, v3: 3, v4: 0 },
    ];

    // Regional: BA:3, DF:2, DFO:1, ES:1
    const dataRegional = [
      { v1: 0, v2: 0, v3: 0, v4: 0 },
      { v1: 1, v2: 1, v3: 0, v4: 0 },
      { v1: 2, v2: 1, v3: 1, v4: 1 },
    ];

    // Consultor: D:12, N:10, C:9, L:8
    const dataConsultor = [
      { v1: 2, v2: 2, v3: 2, v4: 1 },
      { v1: 4, v2: 3, v3: 3, v4: 3 },
      { v1: 6, v2: 5, v3: 4, v4: 4 },
    ];

    const currentMap: Record<string, number> = {
      area: dataArea[index] || { v1: 0, v2: 0, v3: 0, v4: 0 },
      origem: dataOrigem[index] || { v1: 0, v2: 0, v3: 0, v4: 0 },
      regional: dataRegional[index] || { v1: 0, v2: 0, v3: 0, v4: 0 },
      consultor: dataConsultor[index] || { v1: 0, v2: 0, v3: 0, v4: 0 },
    }[segment] as any;

    const totalQtd = Object.values(currentMap).reduce((a: number, b: number) => a + b, 0);

    return {
      name: mes,
      ...currentMap,
      total: totalQtd,
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 bg-slate-50/50 p-4 -m-4 rounded-[14px]">
      {/* Section 1: Agendamentos */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[14px] p-8 shadow-sm border border-slate-100 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase">
              Evolução de Agendamentos
              <span className="text-[11px] bg-sc-green/10 text-sc-green-dark px-3 py-1.5 rounded-full">{relData.agendamentos.total.total} Total</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Comparativo mensal entre produtores e parceiros estratégicos</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-sc-green-dark" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Produtores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-sc-green" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Parceiros</span>
            </div>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agendamentosChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar 
                dataKey="produtores" 
                name="Produtores" 
                stackId="a" 
                fill="#004D40" 
                radius={[0, 0, 0, 0]} 
                barSize={32}
              />
              <Bar 
                dataKey="parceiros" 
                name="Parceiros" 
                stackId="a" 
                fill="#82BC00" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Section 2: Propostas Enviadas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[14px] p-8 shadow-sm border border-slate-100 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase">
              Propostas Enviadas por Gerência
              <span className="text-[11px] bg-sc-green/10 text-sc-green-dark px-3 py-1.5 rounded-full">{relData.propostasEnviadas.totalComEquipe.total} Enviadas</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Distribuição de envios por unidades de gestão regional</p>
          </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#004D40]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Norte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#82BC00]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sul</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#D4AF37]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Centro-Oeste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#334155]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sudeste</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propostasChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="gerencia1" name="Norte" stackId="b" fill="#004D40" barSize={32} />
                <Bar dataKey="gerencia2" name="Sul" stackId="b" fill="#82BC00" barSize={32} />
                <Bar dataKey="gerencia3" name="Centro-Oeste" stackId="b" fill="#D4AF37" barSize={32} />
                <Bar dataKey="gerencia4" name="Sudeste" stackId="b" fill="#334155" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Section 3: Evolução de Conquistas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[14px] p-8 shadow-sm border border-slate-100 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-sc-green rounded-full" />
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase">
                Evolução de Conquistas
                <span className="text-[11px] bg-sc-green/10 text-sc-green-dark px-3 py-1.5 rounded-full">{relData.propostasConquistadas.quantidade.total} Conquistadas</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Qtd. de Propostas</p>
            </div>
          </div>
          
          <div className="flex bg-slate-50 p-1 rounded-[14px] border border-slate-100 shadow-inner">
            {(['area', 'origem', 'regional', 'consultor'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSegment(opt)}
                className={cn(
                  "px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all",
                  segment === opt 
                    ? "bg-sc-green text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {opt === 'area' ? 'Área' : opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Chart (Full Width) */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-2">
              {segmentConfig[segment].map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={conquistasChartData} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                  {segmentConfig[segment].map((s, idx) => (
                    <Bar 
                      key={`${segment}-${s.key}`}
                      dataKey={s.key} 
                      name={s.label} 
                      stackId="conquista" 
                      fill={s.color} 
                      radius={[0, 0, 0, 0]} 
                      barSize={32}
                      isAnimationActive={true}
                      animationDuration={1000}
                      animationEasing="ease-in-out"
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
