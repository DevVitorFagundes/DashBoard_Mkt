import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Wallet, Clock, ArrowRight, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface PipelineHealthProps {
  proposedValue: number;
  paidValue: number;
  ticketMedio: number;
  conversionRate: number;
  avgCycleDays: number;
}

export const PipelineHealth: React.FC<PipelineHealthProps> = ({ 
  proposedValue, 
  paidValue,
  ticketMedio,
  conversionRate,
  avgCycleDays
}) => {
  const potentialValue = proposedValue - paidValue;

  const funnelStages = [
    { 
      label: 'Propostas Emitidas', 
      value: proposedValue, 
      color: 'bg-slate-200', 
      textColor: 'text-slate-600',
      width: 'w-full'
    },
    { 
      label: 'Negociações Ativas', 
      value: proposedValue * 0.7, // Mocked stage
      color: 'bg-sc-blue/40', 
      textColor: 'text-sc-blue',
      width: 'w-[85%]'
    },
    { 
      label: 'Faturamento Pago', 
      value: paidValue, 
      color: 'bg-sc-green-dark', 
      textColor: 'text-white',
      width: 'w-[70%]'
    }
  ];

  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sc-green-dark/10 rounded-lg">
            <Target size={20} className="text-sc-green-dark" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Saúde e Eficiência do Pipeline</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Análise de conversão e ciclo de vendas</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-sc-green-dark/5 rounded-full">
          <span className="text-[10px] font-bold text-sc-green-dark uppercase">Taxa de Conversão:</span>
          <span className="text-xs font-black text-sc-green-dark">{conversionRate.toFixed(1)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Funnel Visualization */}
        <div className="lg:col-span-7 p-8 border-r border-slate-50">
          <div className="flex flex-col items-center gap-2">
            {funnelStages.map((stage, idx) => (
              <React.Fragment key={stage.label}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "relative h-14 rounded-[14px] flex items-center justify-between px-6 shadow-sm",
                    stage.color,
                    stage.width
                  )}
                >
                  <span className={cn("text-xs font-bold uppercase tracking-wider", stage.textColor)}>
                    {stage.label}
                  </span>
                  <span className={cn("text-sm font-black", stage.textColor)}>
                    {formatCurrency(stage.value)}
                  </span>
                </motion.div>
                {idx < funnelStages.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <ArrowRight size={14} className="text-slate-300 rotate-90" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      {idx === 0 ? '70% Avanço' : `${((paidValue / (proposedValue * 0.7)) * 100).toFixed(0)}% Fechamento`}
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="lg:col-span-5 p-8 bg-slate-50/30 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <BarChart3 size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ticket Médio</span>
            </div>
            <p className="text-lg font-black text-slate-800">{formatCurrency(ticketMedio)}</p>
            <p className="text-[9px] text-slate-500 font-medium">Valor médio por proposta emitida</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ciclo Médio</span>
            </div>
            <p className="text-lg font-black text-slate-800">{avgCycleDays} Dias</p>
            <p className="text-[9px] text-slate-500 font-medium">Tempo médio para fechamento</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sc-blue">
              <TrendingUp size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Potencial Retido</span>
            </div>
            <p className="text-lg font-black text-sc-blue">{formatCurrency(potentialValue)}</p>
            <p className="text-[9px] text-slate-500 font-medium">Propostas em aberto no pipeline</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sc-green-dark">
              <Wallet size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Eficiência Real</span>
            </div>
            <p className="text-lg font-black text-sc-green-dark">{(conversionRate * 0.85).toFixed(1)}%</p>
            <p className="text-[9px] text-slate-500 font-medium">Aproveitamento líquido de oportunidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};
