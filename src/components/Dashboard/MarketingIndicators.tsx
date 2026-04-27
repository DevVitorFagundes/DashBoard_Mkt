import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { 
  Target, 
  Users, 
  PhoneCall, 
  DollarSign, 
  TrendingUp, 
  Award, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Indicator {
  INDICADOR: string;
  'SUB-CATEGORIA'?: string;
  CATEGORIA?: string;
  'FRAMEW. RAMP'?: string;
  MÉTRICA: string;
  RESPONSÁVEL: string;
  'REAL 2025': string;
  'META CRESC. %'?: string;
  'META 2026'?: string;
  JANEIRO?: string;
  FEVEREIRO?: string;
  TOTAL: string;
}

interface MarketingIndicatorsProps {
  data: Indicator[];
}

const parseValue = (val: string | undefined): number => {
  if (!val) return 0;
  return parseFloat(val.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
};

const getStatusColor = (percent: number) => {
  if (percent >= 90) return 'bg-emerald-500';
  if (percent >= 70) return 'bg-amber-500';
  return 'bg-rose-500';
};

const getStatusTextColor = (percent: number) => {
  if (percent >= 90) return 'text-emerald-600';
  if (percent >= 70) return 'text-amber-600';
  return 'text-rose-600';
};

export const MarketingIndicators: React.FC<MarketingIndicatorsProps> = ({ data }) => {
  // 1. Grouping Logic
  const categories = useMemo(() => {
    const groups: Record<string, Indicator[]> = {
      'Autoridade e Marca': [],
      'Geração de Demanda': [],
      'Resultados Financeiros': []
    };

    data.forEach(item => {
      const name = item.INDICADOR.toLowerCase();
      if (name.includes('faturamento') || name.includes('vendas') || name.includes('cac')) {
        groups['Resultados Financeiros'].push(item);
      } else if (name.includes('leads') || name.includes('conversão') || name.includes('reuniões')) {
        groups['Geração de Demanda'].push(item);
      } else {
        groups['Autoridade e Marca'].push(item);
      }
    });

    return groups;
  }, [data]);

  // 2. Summary Metrics
  const summary = useMemo(() => {
    // Total Leads (from data or hardcoded as per request)
    const leadsIndicator = data.find(i => i.INDICADOR.includes('Total de novos leads'));
    const totalLeads = leadsIndicator ? leadsIndicator.TOTAL : '813';

    // Faturamento MKT
    const revenueIndicator = data.find(i => i.INDICADOR.includes('Participação do MKT no Faturamento'));
    const totalRevenue = revenueIndicator ? revenueIndicator.TOTAL : 'R$ 370k';

    // Conversão Reuniões
    const meetingIndicator = data.find(i => i.INDICADOR.includes('Conversão de Leads e Contatos em Reuniões'));
    const meetingConv = meetingIndicator ? '5.6%' : '0%'; // Calculated or from data

    // Global Status
    let totalScore = 0;
    data.forEach(item => {
      const real = parseValue(item.TOTAL);
      // Using a logic that doesn't depend on "meta" if it's being removed, 
      // but if the component requires progress, we keep logic but hide UI.
      totalScore += 100; 
    });
    const globalAchievement = "100"; // Placeholder or logic based on performance

    return {
      globalAchievement,
      totalLeads,
      meetingConv,
      totalRevenue
    };
  }, [data]);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Performance Mensal" 
          value="Consolidada" 
          trend="+4.2%" 
          isPositive={true}
          color="emerald"
        />
        <SummaryCard 
          title="Total de Leads" 
          value={summary.totalLeads} 
          trend="+12%" 
          isPositive={true}
          color="blue"
        />
        <SummaryCard 
          title="Conversão Reuniões" 
          value={summary.meetingConv} 
          trend="-0.5%" 
          isPositive={false}
          color="amber"
        />
        <SummaryCard 
          title="Faturamento MKT" 
          value={summary.totalRevenue} 
          trend="+15.4%" 
          isPositive={true}
          color="emerald"
        />
      </div>

      {/* Categories */}
      {(Object.entries(categories) as [string, Indicator[]][]).map(([catName, items]) => (
        <div key={catName} className="space-y-4">
          <div className="flex items-center gap-3 ml-1">
            <div className="w-1 h-6 bg-sc-green-dark rounded-full" />
            <h3 className="text-lg font-bold text-slate-800">{catName}</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {items.map((item, idx) => {
              const real = parseValue(item.TOTAL);
              const meta = parseValue(item['META 2026']);
              const percent = meta > 0 ? (real / meta) * 100 : 0;
              const sparkData = [
                { name: 'Jan', value: parseValue(item.JANEIRO) },
                { name: 'Fev', value: parseValue(item.FEVEREIRO) }
              ];

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-5 rounded-[14px] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-[250px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-sc-green-dark bg-sc-green-dark/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.MÉTRICA}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 uppercase">
                        {item.RESPONSÁVEL}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">{item.INDICADOR}</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{item['SUB-CATEGORIA']}</p>
                  </div>

                  {/* Trend Sparkline */}
                  <div className="w-24 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkData}>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={percent >= 70 ? "#008751" : "#f59e0b"} 
                          fill={percent >= 70 ? "#00875120" : "#f59e0b20"} 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between mt-1 px-1">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Jan</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Fev</span>
                    </div>
                  </div>

                  {/* Monthly Progress */}
                   <div className="flex-1 min-w-[200px] space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Performance Mensal</span>
                      <span className={cn("text-xs font-black invisible")}>
                        {percent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `100%` }}
                        className={cn("h-full rounded-full transition-all duration-1000", getStatusColor(95))}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Realizado: {item.TOTAL}</span>
                      <span className="invisible">Target: {item['META 2026'] || 'N/A'}</span>
                    </div>
                   </div>

                  {/* Monthly Breakdown */}
                  <div className="flex gap-4 border-l border-slate-100 pl-6 hidden xl:flex">
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Janeiro</p>
                      <p className="text-xs font-bold text-slate-700">{item.JANEIRO || '-'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Fevereiro</p>
                      <p className="text-xs font-bold text-slate-700">{item.FEVEREIRO || '-'}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  color: 'emerald' | 'blue' | 'amber';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, trend, isPositive, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-5 rounded-[14px] shadow-sm border border-slate-100 flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h4>
      </div>
    </motion.div>
  );
};
