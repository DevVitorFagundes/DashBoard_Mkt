import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Users, 
  Search, 
  Newspaper, 
  Award, 
  Calendar,
  MessageSquare,
  Handshake,
  Info,
  X,
  ArrowUpRight,
  Check,
  Zap
} from 'lucide-react';
import { Header } from '../Dashboard/Header';
import { cn, formatCurrency, formatCurrencyMi } from '@/src/lib/utils';
import data from '../../data/indicadores.json';
import { FunnelDeepDive } from './FunnelDeepDive';
import { EngagementDeepDive } from './EngagementDeepDive';

const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 300;
  const height = 40;
  const padding = 5;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 2 * padding) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="opacity-40 overflow-visible">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${points}`}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 2 * padding) - padding}
        r="3"
        fill={color}
      />
    </svg>
  );
};

const Tooltip: React.FC<{ text: string; align?: 'left' | 'right' | 'center'; light?: boolean }> = ({ text, align = 'center', light = false }) => {
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
      <Info size={11} className={cn(
        "cursor-help transition-colors",
        light ? "text-white/40 hover:text-white" : "text-slate-300 hover:text-slate-500"
      )} />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className={cn(
              "absolute bottom-full mb-3 w-56 p-4 text-[11px] font-medium rounded-[14px] shadow-2xl z-[100] pointer-events-none text-center leading-relaxed border",
              light ? "bg-white text-slate-800 border-slate-100" : "bg-slate-900/95 backdrop-blur-md text-white border-white/10",
              alignClasses[align]
            )}
          >
            {text}
            <div className={cn(
              "absolute top-full border-8 border-transparent",
              light ? "border-t-white" : "border-t-slate-900/95",
              arrowClasses[align]
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const VisaoGeral: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inteligencia' | 'comparativo-mensal'>('inteligencia');
  const indicators = data.indicadores2026;

  const sectionRefs = {
    funil: useRef<HTMLElement>(null),
    engajamento: useRef<HTMLElement>(null)
  };

  return (
    <div className="space-y-12 pb-20">
      <Header 
        title="Visão Geral"
        subtitle="Consolidado de performance estratégica 2026."
        hideFilters
        hideTopBar
        action={
          <div className="flex bg-white p-1 rounded-[14px] border border-slate-100 shadow-sm">
            <button 
              onClick={() => setActiveTab('inteligencia')}
              className={cn(
                "px-6 py-2 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all",
                activeTab === 'inteligencia' 
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
        {activeTab === 'inteligencia' ? (
          <motion.div
            key="inteligencia"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-12"
          >

      {/* Section: Funil de vendas */}
      <section 
        ref={sectionRefs.funil}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-green-dark flex items-center justify-center text-white shadow-lg shadow-sc-green-dark/20">
              <Handshake size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Funil de vendas</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Conversão, Prospecção e Satisfação</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {/* 1. Propostas Conquistadas | R$ Total */}
          <div className="bg-gradient-to-br from-sc-green-dark to-sc-green p-6 rounded-[14px] shadow-lg shadow-sc-green/10 border border-sc-green/20 flex flex-col justify-between h-48 group hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            <div>
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] leading-tight">Propostas Conquistadas | R$ Total</span>
                <Tooltip text="Representa o valor total em Volume de Negócios fechados." align="left" light={true} />
              </div>
              <h3 className="text-5xl font-black mt-2 text-white tracking-tight">{formatCurrency(indicators.relacionamento.propostasConquistadas.volumeNegocios.total)}</h3>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <TrendingUp size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Destaque Performance</span>
            </div>
          </div>

          {/* 2. Propostas Enviadas (Qtd) */}
          <div className="bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-blue/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left leading-tight">Propostas<br />Enviadas</span>
                <Tooltip text="Contagem de todas as propostas enviadas, com origem relacionada ao setor de Marketing e Inteligência de Mercado." align="center" />
              </div>
              <div className="p-2 bg-sc-blue/10 rounded-xl text-sc-blue">
                <Target size={18} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-6xl font-black text-slate-800">{indicators.relacionamento.propostasEnviadas.totalComEquipe.total}</h3>
            </div>
          </div>

          {/* 3. Propostas Conquistadas (Qtd) */}
          <div className="bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-green/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left leading-tight">Propostas<br />Conquistadas</span>
                <Tooltip text="Quantidade de Propostas Conquistadas no período." align="center" />
              </div>
              <div className="p-2 bg-sc-green/10 rounded-xl text-sc-green">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-6xl font-black text-slate-800">{indicators.relacionamento.propostasConquistadas.quantidade.total}</h3>
            </div>
          </div>

          {/* 4. Agendamentos Parceiros */}
          <div className="bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-turquoise/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left leading-tight">Agendamentos<br />Parceiros</span>
                <Tooltip text="Entende-se como Parceiros: empresas do setor Agro, Cooperativas, Sindicatos, profissionais, entre outros, que podem nos abrir portas e nos colocar em contato com produtores rurais." align="center" />
              </div>
              <div className="p-2 bg-sc-turquoise/10 rounded-xl text-sc-turquoise">
                <Handshake size={18} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-6xl font-black text-slate-800">{indicators.relacionamento.agendamentos.parceiros.total.total}</h3>
            </div>
          </div>

          {/* 5. Agendamentos Produtores */}
          <div className="bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-green/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left leading-tight">Agendamentos<br />Produtores</span>
                <Tooltip text="Neste indicador considere somente os agendamentos realizado exclusivamente com produtores rurais." align="center" />
              </div>
              <div className="p-2 bg-sc-green/10 rounded-xl text-sc-green">
                <Users size={18} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-6xl font-black text-slate-800">{indicators.relacionamento.agendamentos.produtores.total.total}</h3>
            </div>
          </div>

          {/* 6. Eventos Captados */}
          <div className="bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-1 w-fit">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">Eventos<br />Captados</p>
                <Tooltip text="Refere-se a oportunidades de eventos e parcerias identificadas ativamente pelo time de campo para expansão da marca." align="center" />
              </div>
              <div className="p-2 bg-slate-200/50 rounded-xl text-slate-400">
                <Calendar size={18} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <h3 className="text-6xl font-black text-slate-300">0</h3>
            </div>
          </div>
        </div>

      </section>

      {/* Section: Engajamento */}
      <section 
        ref={sectionRefs.engajamento}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-turquoise flex items-center justify-center text-white shadow-lg shadow-sc-turquoise/20">
              <Target size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Engajamento</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Visibilidade, Leads e Engajamento</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Impressões Google */}
          <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-blue/30 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-1 w-fit">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">Impressões Google</span>
                <Tooltip text="Contabiliza quantas vezes a marca Safras & Cifras foi visualizada por usuários em pesquisas ou anúncios na rede Google." align="left" />
              </div>
              <div className="p-3 bg-sc-blue/10 rounded-[14px] text-sc-blue">
                <Search size={24} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
              <h3 className="text-4xl font-black text-slate-800">{indicators.marketing.googleTrafego.impressoes.total.toLocaleString('pt-BR')}</h3>
            </div>
          </div>

          {/* Novos Leads | Total vs Marketing */}
          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 group hover:bg-white hover:shadow-md hover:border-sc-green/30 transition-all">
            <div className="flex items-start gap-1 mb-2 w-fit">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">Total Leads x Origem Marketing</span>
              <Tooltip text="Comparativo entre o volume total de novos leads captados e aqueles provenientes especificamente de estratégias de Marketing." align="left" />
            </div>
            <div className="flex items-center justify-between gap-4 flex-1">
              <div className="text-center flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Leads</p>
                <p className="text-2xl font-black text-slate-800">{indicators.marketing.leads.total.total}</p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-center flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Marketing</p>
                <p className="text-2xl font-black text-sc-green-dark">{indicators.marketing.leads.marketingDigital.total}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(indicators.marketing.leads.marketingDigital.total / indicators.marketing.leads.total.total) * 100}%` }}
                  className="h-full bg-sc-green rounded-full"
                />
              </div>
              <p className="text-[10px] font-black text-sc-green text-center mt-2">
                {Math.round((indicators.marketing.leads.marketingDigital.total / indicators.marketing.leads.total.total) * 100)}% de Representatividade
              </p>
            </div>
          </div>

          {/* Engajamento Meta Total */}
          <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] shadow-sm border border-slate-200 flex flex-col h-48 relative group hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-start gap-1 mb-2 w-fit">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Engajamento Meta Total</span>
              <Tooltip text="Engajamento Total = Interações orgânicas + interações de tráfego pago, como cliques no perfil, clique em saiba mais, visualizações, alcance, impressões." align="left" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
              <h3 className="text-4xl font-black text-sc-blue">{indicators.marketing.engajamento.metaTotal.total.toLocaleString('pt-BR')}</h3>
              <p className="text-[9px] font-medium text-slate-400 mt-4 italic">
                (Instagram + Facebook + Impulsionamento Pago)
              </p>
            </div>
          </div>

          {/* Participação Marca na Mídia */}
          <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] border border-slate-200 shadow-sm flex flex-col h-48 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-start gap-1 mb-2 w-fit">
              <span className="text-[10px] font-black text-sc-green-dark uppercase tracking-[0.2em] leading-tight">Participação da Marca<br />na Mídia</span>
              <Tooltip text="Este indicador refere-se a todo tipo de citação e/ou aparição da marca S&C em espaços relevantes de mídia, tais como veículos de comunicação, TV, rádio, jornal, revista digital, blogs e sites especializados, podcasts e perfis relevantes de redes sociais." align="left" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
              <h3 className="text-6xl font-black text-slate-800">{indicators.marketing.participacaoMidia.marcaMidia.total}</h3>
            </div>
          </div>

          {/* Ações/Conteúdos de Alto Impacto */}
          <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] border border-slate-200 shadow-sm flex flex-col h-48 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-start gap-1 mb-2 w-fit">
              <span className="text-[10px] font-black text-sc-turquoise uppercase tracking-[0.2em] leading-tight">Ações/Conteúdos de<br />alto impacto</span>
              <Tooltip text="Entende-se por conteúdo ou ação de alto impacto, aqueles que preencheram pelo menos 2 destes 4 parâmetros estabelecidos: &#10;• Engajamento expressivo no canal &#10;• Alcance ou visibilidade relevante &#10;• Geração de efeito “imediato” mensurável &#10;• Reutilização ou repercussão externa" align="left" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
              <h3 className="text-6xl font-black text-slate-800">{indicators.marketing.participacaoMidia.acoesAltoImpacto.total}</h3>
            </div>
          </div>

          {/* Eventos com envolvimento da comunicação */}
          <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[14px] border border-slate-200 shadow-sm flex flex-col h-48 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-start gap-1 mb-2 w-fit">
              <span className="text-[10px] font-black text-sc-blue uppercase tracking-[0.2em] leading-tight block">
                Eventos com envolvimento<br />da comunicação
              </span>
              <Tooltip text="Quantidade de eventos presenciais ou híbridos que receberam suporte, materiais ou presença física da equipe dedicada de comunicação." align="left" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
              <h3 className="text-6xl font-black text-slate-800">{indicators.marketing.participacaoMidia.eventosComunicacao.total}</h3>
            </div>
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
            className="space-y-12"
          >
            <FunnelDeepDive data={indicators} />
            <EngagementDeepDive data={indicators} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

