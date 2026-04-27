import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RelationshipDonut } from '../Charts/RelationshipDonut';
import { VerticalBarChart } from '../Charts/VerticalBarChart';
import { RelationshipComparison } from './RelationshipComparison';
import { Header } from '../Dashboard/Header';
import { cn, formatCurrency, formatCurrencyMi } from '@/src/lib/utils';
import data from '../../data/indicadores.json';

const Tooltip: React.FC<{ text: string; align?: 'left' | 'right' | 'center' }> = ({ text, align = 'center' }) => {
  const [show, setShow] = useState(false);

  const alignClasses = {
    left: 'left-0 -translate-x-0',
    right: 'left-auto right-0 translate-x-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  const arrowClasses = {
    left: 'left-4 -translate-x-0',
    right: 'left-auto right-4 translate-x-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div className="relative inline-flex items-start pt-0.5" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Info size={11} className="text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className={cn(
              "absolute bottom-full mb-3 w-56 p-4 bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-medium rounded-[14px] shadow-2xl z-[100] pointer-events-none text-center leading-relaxed border border-white/10",
              alignClasses[align]
            )}
          >
            {text}
            <div className={cn(
              "absolute top-full border-8 border-transparent border-t-slate-900/95",
              arrowClasses[align]
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RelationshipDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visao-geral' | 'comparativo-mensal'>('visao-geral');
  const relData = data.indicadores2026.relacionamento;

  const sectionRefs = {
    agendamentos: useRef<HTMLElement>(null),
    enviadas: useRef<HTMLElement>(null),
    conquistadas: useRef<HTMLElement>(null)
  };

  const agendamentosProdutores = relData.agendamentos.produtores.porOrigem;
  const agendamentosParceiros = relData.agendamentos.parceiros.porOrigem;
  const regionalData = relData.propostasEnviadas.porRegional;

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <Header 
        title="Relacionamento"
        subtitle="Gestão estratégica e comparativo mensal de performance."
        hideFilters
        hideTopBar
        action={
          <div className="flex bg-white p-1 rounded-[14px] border border-slate-100 shadow-sm">
            <button 
              onClick={() => setActiveTab('visao-geral')}
              className={cn(
                "px-6 py-2 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all",
                activeTab === 'visao-geral' 
                  ? "bg-sc-green/10 text-sc-green-dark shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveTab('comparativo-mensal')}
              className={cn(
                "px-6 py-2 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all",
                activeTab === 'comparativo-mensal' 
                  ? "bg-sc-green/10 text-sc-green-dark shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              Comparativo Mensal
            </button>
          </div>
        }
      />

      <AnimatePresence mode="wait">
        {activeTab === 'visao-geral' ? (
          <motion.div
            key="visao-geral"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-10"
          >
            {/* Section: Agendamentos */}
            <section 
              ref={sectionRefs.agendamentos}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-turquoise flex items-center justify-center text-white shadow-lg shadow-sc-turquoise/20">
              <Calendar size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Agendamentos</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Gestão de reuniões e prospecções</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Agendamentos com Produtores</p>
              <h3 className="text-5xl font-black text-sc-green-dark">{relData.agendamentos.produtores.total.total}</h3>
            </div>
            <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Agendamentos com Parceiros</p>
              <h3 className="text-5xl font-black text-slate-800">{relData.agendamentos.parceiros.total.total}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RelationshipDonut 
              title="Agendamentos com Produtores Rurais"
              subtitle="Distribuição por canal de aquisição"
              totalLabel="Total Produtores"
              totalValue={String(relData.agendamentos.produtores.total.total)}
              data={agendamentosProdutores}
            />
            <RelationshipDonut 
              title="Agendamentos com Parceiros"
              subtitle="Performance por categoria estratégica"
              totalLabel="Volume Total"
              totalValue={String(relData.agendamentos.parceiros.total.total)}
              data={agendamentosParceiros}
            />
          </div>
        </div>
      </section>

      {/* Section: Propostas Enviadas */}
      <section 
        ref={sectionRefs.enviadas}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-turquoise flex items-center justify-center text-white shadow-lg shadow-sc-turquoise/20">
              <Send size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Propostas Enviadas</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Desempenho de envio e volume regional</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm">
              <div className="flex items-start gap-1 w-fit mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight text-left">Propostas com envolvimento<br />da equipe de relacionamento</span>
                <Tooltip text="O cálculo deste indicador considera todos os agendamentos que avançaram no funil de vendas até as etapas de Enviar Proposta, Analisando Proposta, Conquistado e Perdido." />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-sc-green-dark">{relData.propostasEnviadas.totalComEquipe.total}</span>
                <span className="text-2xl font-bold text-slate-300">/ {data.indicadores2026.marketing.leads.total.total}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm">
              <div className="flex items-start gap-1 w-fit mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight text-left">Taxa de envio de propostas<br />do relacionamento</span>
                <Tooltip text="Este indicador mostra, em percentual, quantas das propostas enviadas foram conquistadas." />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-sc-green-dark">{relData.propostasEnviadas.taxaEnvio.total}%</span>
                <TrendingUp className="text-sc-green" size={24} />
              </div>
            </div>
          </div>

          <VerticalBarChart 
            title="Propostas enviadas com o envolvimento da equipe de relacionamento"
            subtitle="Quantidade absoluta de propostas com apoio da equipe de relacionamento"
            data={regionalData}
          />
        </div>
      </section>

      {/* Section: Propostas Conquistadas */}
      <section 
        ref={sectionRefs.conquistadas}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-green flex items-center justify-center text-white shadow-lg shadow-sc-green/20">
              <CheckCircle2 size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Propostas Conquistadas</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Resultados de conversão e rankings</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] shadow-sm border border-slate-200 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
              <CheckCircle2 size={120} className="absolute -right-8 -bottom-8 text-slate-100 pointer-events-none group-hover:text-sc-green/10 transition-colors" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 relative z-10">Taxa de Conversão</p>
              <h3 className="text-6xl font-black mb-4 relative z-10 text-sc-green-dark">{relData.propostasConquistadas.taxaConversao.total}%</h3>
              <div className="space-y-1 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enviadas: {relData.propostasEnviadas.totalComEquipe.total}</p>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Conquistadas: {relData.propostasConquistadas.quantidade.total}</p>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Tipo de serviço conquistado</p>
              <div className="space-y-6">
                {relData.propostasConquistadas.porServico.map((servico) => (
                  <div key={servico.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{servico.name}</span>
                      <span className="text-sc-green-dark">{servico.value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sc-green-dark transition-all duration-1000" 
                        style={{ width: `${(servico.value / relData.propostasConquistadas.quantidade.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Volume de Negócios</p>
              <h3 className="text-5xl font-black text-sc-green-dark tracking-tighter">
                {formatCurrency(relData.propostasConquistadas.volumeNegocios.total)}
              </h3>
              <div className="mt-4 pt-4 border-t border-slate-200/50 flex justify-between items-center text-sc-green">
                <TrendingUp size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest invisible">Meta 2026: {formatCurrency(relData.propostasConquistadas.volumeNegocios.meta2026)}</span>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RankingCard 
              title="Conquistados por Consultor"
              items={relData.propostasConquistadas.porConsultor}
            />
            <RankingCard 
              title="Conquistados por Origem"
              items={relData.propostasConquistadas.porOrigem}
            />
            <RankingCard 
              title="Conquistados por Área"
              items={relData.propostasConquistadas.porArea}
            />
            <RankingCard 
              title="Conquistados por Regional"
              items={relData.propostasConquistadas.porRegional}
            />
          </div>
        </div>
      </section>
      </motion.div>
    ) : (
      <motion.div
        key="comparativo-mensal"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
      >
        <RelationshipComparison />
      </motion.div>
    )}
    </AnimatePresence>
    </div>
  );
};


const RankingCard: React.FC<{ title: string; items: { name: string; value: number; color?: string }[] }> = ({ title, items }) => {
  const maxValue = Math.max(...items.map(i => i.value), 1);
  return (
    <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-sm h-[400px] flex flex-col">
      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex-shrink-0">{title}</h4>
      <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar flex-grow">
        {items.map((item, idx) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">{item.name}</span>
              <span className="text-sm font-black text-slate-800">{item.value}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color || '#004D40' }}
                transition={{ delay: idx * 0.1, duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
