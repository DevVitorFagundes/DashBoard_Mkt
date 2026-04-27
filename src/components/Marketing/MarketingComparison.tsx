import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

import data from '../../data/indicadores.json';

const mktData = data.indicadores2026.marketing;

const leadsChartData = [
  { 
    name: 'Jan', 
    marketing: mktData.leads.marketingDigital.janeiro, 
    eventos: mktData.leads.eventosPalestras.janeiro, 
    indicacoes: mktData.leads.indicacoesParceiros.janeiro, 
    driva: mktData.leads.drivaProspeccao.janeiro 
  },
  { 
    name: 'Fev', 
    marketing: mktData.leads.marketingDigital.fevereiro, 
    eventos: mktData.leads.eventosPalestras.fevereiro, 
    indicacoes: mktData.leads.indicacoesParceiros.fevereiro, 
    driva: mktData.leads.drivaProspeccao.fevereiro 
  },
  { 
    name: 'Mar', 
    marketing: mktData.leads.marketingDigital.marco, 
    eventos: mktData.leads.eventosPalestras.marco, 
    indicacoes: mktData.leads.indicacoesParceiros.marco, 
    driva: mktData.leads.drivaProspeccao.marco 
  },
  { name: 'Abr' },
  { name: 'Mai' },
  { name: 'Jun' },
  { name: 'Jul' },
  { name: 'Ago' },
  { name: 'Set' },
  { name: 'Out' },
  { name: 'Nov' },
  { name: 'Dez' },
];

const trafegoChartData = [
  { name: 'Jan', visitantes: mktData.googleTrafego.acessosUnicos.janeiro },
  { name: 'Fev', visitantes: mktData.googleTrafego.acessosUnicos.fevereiro },
  { name: 'Mar', visitantes: mktData.googleTrafego.acessosUnicos.marco },
  { name: 'Abr' },
  { name: 'Mai' },
  { name: 'Jun' },
  { name: 'Jul' },
  { name: 'Ago' },
  { name: 'Set' },
  { name: 'Out' },
  { name: 'Nov' },
  { name: 'Dez' },
];

export const MarketingComparison: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Card 1: Evolução de Entrada de Leads */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[14px] border border-slate-100 p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
              Evolução de Entrada de Leads
              <span className="text-[11px] bg-sc-green/10 text-sc-green-dark px-3 py-1.5 rounded-full">{mktData.leads.total.total} Leads</span>
            </h3>
            <p className="text-sm text-slate-400 font-semibold">Volume mensal por canal de prospecção</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#004D40]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Marketing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#15803D]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Eventos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#82BC00]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Indicações</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#94A3B8]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Driva</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
              />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
                labelStyle={{ fontWeight: 900, marginBottom: '4px', textTransform: 'uppercase', color: '#64748b' }}
              />
              <Bar dataKey="marketing" stackId="leads" fill="#004D40" barSize={40} />
              <Bar dataKey="eventos" stackId="leads" fill="#15803D" />
              <Bar dataKey="indicacoes" stackId="leads" fill="#82BC00" />
              <Bar dataKey="driva" stackId="leads" fill="#94A3B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Card 2: Evolução de Tráfego Web */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[14px] border border-slate-100 p-8 shadow-sm"
      >
        <div className="mb-8">
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
            Evolução de Tráfego Web
            <span className="text-[11px] bg-sc-green/10 text-sc-green-dark px-3 py-1.5 rounded-full">{mktData.googleTrafego.acessosUnicos.total.toLocaleString('pt-BR')} Visitas</span>
          </h3>
          <p className="text-sm text-slate-400 font-semibold">Visitantes únicos no site institucional</p>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafegoChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004D40" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#004D40" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
                labelStyle={{ fontWeight: 900, marginBottom: '4px', textTransform: 'uppercase', color: '#64748b' }}
              />
              <Area 
                type="monotone" 
                dataKey="visitantes" 
                stroke="#004D40" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVisitantes)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
