import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Users, 
  MousePointer2, 
  Eye, 
  UserPlus,
  Newspaper,
  Radio,
  Handshake,
  Search,
  Globe,
  TrendingUp,
  Target,
  Calendar,
  Send,
  Info,
  X,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { Header } from '../Dashboard/Header';
import { cn } from '@/src/lib/utils';
import data from '../../data/indicadores.json';

import { MarketingComparison } from './MarketingComparison';

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
    <div className="relative inline-flex items-start pt-[1px]" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Info size={12} className="text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
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

export const MarketingIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inteligencia' | 'comparativo-mensal'>('inteligencia');
  const mktData = data.indicadores2026.marketing;

  const sectionRefs = {
    participacao: useRef<HTMLElement>(null),
    engajamento: useRef<HTMLElement>(null),
    google: useRef<HTMLElement>(null),
    leads: useRef<HTMLElement>(null)
  };

  return (
    <div className="space-y-10 pb-20">
      <Header 
        title="Marketing Intelligence"
        subtitle="Visão geral de marketing, engajamento e tráfego."
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
            className="space-y-10"
          >

      {/* Section: Participação da Marca */}
      <section 
        ref={sectionRefs.participacao}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-green-dark flex items-center justify-center text-white shadow-lg shadow-sc-green-dark/20">
              <Newspaper size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Participação da Marca</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Visibilidade em veículos e eventos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <MediaCard 
            title={<>Participação da Marca<br />na Mídia</>}
            value={mktData.participacaoMidia.marcaMidia.total}
            color="bg-sc-turquoise"
            tooltip="Este indicador refere-se a todo tipo de citação e/ou aparição da marca S&C em espaços relevantes de mídia, tais como veículos de comunicação, TV, rádio, jornal, revista digital, blogs e sites especializados, podcasts e perfis relevantes de redes sociais."
          />
          <MediaCard 
            title={<>Ações/Conteúdos de<br />alto impacto</>}
            value={mktData.participacaoMidia.acoesAltoImpacto.total}
            color="bg-sc-blue"
            tooltip="Entende-se por conteúdo ou ação de alto impacto, aqueles que preencheram pelo menos 2 destes 4 parâmetros estabelecidos: &#10;• Engajamento expressivo no canal &#10;• Alcance ou visibilidade relevante &#10;• Geração de efeito “imediato” mensurável &#10;• Reutilização ou repercussão externa"
          />
          <MediaCard 
            title={<>Eventos com envolvimento<br />da comunicação</>}
            value={mktData.participacaoMidia.eventosComunicacao.total}
            color="bg-sc-green"
            tooltip="Quantidade de eventos presenciais ou híbridos que receberam suporte, materiais ou presença física da equipe dedicada de comunicação."
            tooltipAlign="right"
          />
          <MediaCard 
            title={<>Parcerias com veículos de<br />comunicação e influenciadores</>}
            value={mktData.participacaoMidia.parceriasVeiculos.total}
            color="bg-slate-200"
            tooltip="Colaborações estratégicas com formadores de opinião e veículos especializados do agronegócio."
            tooltipAlign="right"
          />
        </div>
      </section>

      {/* Section: Engajamento */}
      <section 
        ref={sectionRefs.engajamento}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-blue flex items-center justify-center text-white shadow-lg shadow-sc-blue/20">
              <TrendingUp size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Engajamento</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Performance nas redes sociais e canais</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          <SocialCard 
            icon={<Instagram size={18} className="text-sc-blue" />}
            label={<>Seguidores<br/>Instagram</>}
            value={mktData.redesSociais.instagram.total.toLocaleString('pt-BR')}
          />
          <SocialCard 
            icon={<Linkedin size={18} className="text-sc-blue" />}
            label={<>Seguidores<br/>LinkedIn</>}
            value={mktData.redesSociais.linkedin.total.toLocaleString('pt-BR')}
          />
          <SocialCard 
            icon={<Youtube size={18} className="text-sc-blue" />}
            label={<>Inscritos<br/>YouTube</>}
            value={mktData.redesSociais.youtube.total.toLocaleString('pt-BR')}
          />
          <SocialCard 
            icon={<Users size={18} className="text-sc-blue" />}
            label={<>Engajamento<br/>Meta Total</>}
            value={mktData.engajamento.metaTotal.total.toLocaleString('pt-BR')}
          />
          <SocialCard 
            icon={<Mail size={18} className="text-sc-blue" />}
            label={<>Taxa de<br/>E-mails</>}
            value={`${mktData.engajamento.taxaEmail.total}%`}
          />
        </div>
      </section>

      {/* Section: Google & Tráfego */}
      <section 
        ref={sectionRefs.google}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-turquoise flex items-center justify-center text-white shadow-lg shadow-sc-turquoise/20">
              <Search size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Impressões Google & Tráfego</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Visibilidade digital e fluxo de visitas</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 shadow-sm hover:bg-white hover:shadow-md transition-all group/card">
            <div className="flex items-start gap-1 mb-4 w-fit">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Impressões Google</p>
              <Tooltip text="Frequência com que os anúncios ou o site foram exibidos em páginas de busca e rede Google." />
            </div>
            <h3 className="text-5xl font-black text-sc-green-dark group-hover/card:text-sc-green transition-colors">{mktData.googleTrafego.impressoes.total.toLocaleString('pt-BR')}</h3>
          </div>
          <TrafficCard 
            label="Taxa de Cliques Google"
            value={`${mktData.googleTrafego.ctr.total}%`}
            subtext="Desempenho consolidado"
            subtextColor="text-sc-green"
            tooltip="Efetividade dos anúncios medindo quantos usuários clicaram após visualizarem (CTR)."
          />
          <TrafficCard 
            label="Volume de Visitação ao Site"
            value={mktData.googleTrafego.volumeVisitas.total.toLocaleString('pt-BR')}
            subtext="Páginas vistas"
            icon={<Globe size={14} />}
            tooltip="Quantidade total de visualizações de página registradas dentro do site no período."
          />
          <TrafficCard 
            label="Acessos Únicos ao Site"
            value={mktData.googleTrafego.acessosUnicos.total.toLocaleString('pt-BR')}
            subtext="Visitantes novos"
            icon={<UserPlus size={14} />}
            tooltip="Quantidade de usuários distintos que visitaram o site pelo menos uma vez no período."
            tooltipAlign="right"
          />
        </div>

      </section>

      {/* Section: Leads Funnel */}
      <section 
        ref={sectionRefs.leads}
        className="bg-white rounded-[14px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group/section transition-all duration-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-sc-green flex items-center justify-center text-white shadow-lg shadow-sc-green/20">
              <Target size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight font-display">Entrada no Funil</h2>
              <p className="text-sm text-slate-400 font-semibold tracking-wide">Novos leads por canal de prospecção</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-4 h-full">
            <div className="bg-slate-50 border border-slate-200 rounded-[14px] p-10 text-center space-y-6 relative transition-all hover:bg-white hover:shadow-xl h-full flex flex-col justify-center overflow-hidden group/total">
              <div className="absolute inset-0 bg-gradient-to-br from-sc-green/5 to-transparent opacity-0 group-hover/total:opacity-100 transition-opacity" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">Entrada Total de Leads</p>
              
              <div className="relative z-10">
                <h3 className="text-7xl font-black text-sc-green-dark tracking-tighter leading-none mb-2">
                  {mktData.leads.total.total.toLocaleString('pt-BR')}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-slate-200" />
                  <span className="text-[11px] font-black text-sc-green text-center uppercase tracking-widest leading-tight">
                    {mktData.leads.origensMkt.total} do Setor de Mkt
                  </span>
                  <div className="h-px w-8 bg-slate-200" />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 relative z-10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Taxa de Atração Mkt</p>
                <p className="text-2xl font-black text-slate-800">
                  {((mktData.leads.origensMkt.total / mktData.leads.total.total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8 p-10 bg-slate-50 rounded-[14px] border border-slate-200 transition-colors hover:bg-white hover:shadow-md">
            <LeadProgress 
              label="Setor de Marketing" 
              value={mktData.leads.origensMkt.total} 
              total={mktData.leads.total.total}
              color="bg-sc-green-dark"
              tooltip="Leads captados via inbound marketing, landing pages e anúncios pagos."
            />
            <LeadProgress 
              label="Indicações" 
              value={mktData.leads.indicacoesParceiros.total} 
              total={mktData.leads.total.total}
              color="bg-sc-green"
              tooltip="Prospectos oriundos de recomendações e parcerias com terceiros."
            />
            <LeadProgress 
              label="Eventos & Palestras" 
              value={mktData.leads.eventosPalestras.total} 
              total={mktData.leads.total.total}
              color="bg-sc-turquoise"
              tooltip="Captura de contatos durante palestras, feiras e encontros do setor."
            />
            <LeadProgress 
              label="Driva & Prospecções" 
              value={mktData.leads.drivaProspeccao.total} 
              total={mktData.leads.total.total}
              color="bg-slate-400"
              tooltip="Leads gerados por prospecção ativa via lista de mercado (Driva)."
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
            <MarketingComparison />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const MediaCard: React.FC<{ title: React.ReactNode; value: number; color: string; tooltip?: string; tooltipAlign?: 'left' | 'right' | 'center' }> = ({ title, value, tooltip, tooltipAlign }) => (
  <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 flex flex-col justify-center h-48 transition-all hover:bg-white hover:shadow-md group/card text-left">
    <div className="flex items-start gap-1 mb-4 w-fit">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">
        {title}
      </span>
      {tooltip && <Tooltip text={tooltip} align={tooltipAlign} />}
    </div>
    <h3 className="text-6xl font-black text-sc-green-dark group-hover/card:text-sc-green transition-colors">{value}</h3>
  </div>
);

const SocialCard: React.FC<{ icon: React.ReactNode; label: React.ReactNode; value: string; meta?: number; tooltip?: string; tooltipAlign?: 'left' | 'right' | 'center' }> = ({ icon, label, value, meta, tooltip, tooltipAlign }) => (
  <div className="bg-slate-50 p-6 rounded-[14px] border border-slate-200 space-y-4 transition-all hover:bg-white hover:shadow-md group/card">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-1 flex-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{label}</span>
        {tooltip && <Tooltip text={tooltip} align={tooltipAlign} />}
      </div>
      <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0">
        {icon}
      </div>
    </div>
    <div className="space-y-3">
      <h4 className="text-3xl font-black text-slate-800 tracking-tighter group-hover/card:text-sc-blue transition-colors">{value}</h4>
      {meta && (
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sc-blue/40 rounded-full" 
            style={{ width: `${Math.min((parseInt(value.replace(/\./g, '')) / meta) * 100, 100)}%` }} 
          />
        </div>
      )}
    </div>
  </div>
);

const TrafficCard: React.FC<{ label: React.ReactNode; value: string; subtext: string; subtextColor?: string; icon?: React.ReactNode; tooltip?: string; tooltipAlign?: 'left' | 'right' | 'center' }> = ({ label, value, subtext, subtextColor, icon, tooltip, tooltipAlign }) => (
  <div className="bg-slate-50 p-8 rounded-[14px] border border-slate-200 space-y-3 transition-all hover:bg-white hover:shadow-md group/card">
    <div className="flex items-start gap-1 w-fit">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">{label}</span>
      {tooltip && <Tooltip text={tooltip} align={tooltipAlign} />}
    </div>
    <h3 className="text-5xl font-black text-slate-800 tracking-tighter group-hover/card:text-sc-green-dark transition-colors">{value}</h3>
    <div className={cn("flex items-center gap-1.5 text-xs font-bold", subtextColor || "text-slate-400")}>
      {icon}
      {subtext}
    </div>
  </div>
);

const LeadProgress: React.FC<{ label: string; value: number; total: number; color: string; tooltip?: string }> = ({ label, value, total, color, tooltip }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end mb-1">
      <div className="flex items-start gap-1 w-fit">
        <span className="text-base font-bold text-slate-700">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span className="text-2xl font-black text-sc-green-dark">{value.toLocaleString('pt-BR')}</span>
    </div>
    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${(value / total) * 100}%` }}
        className={cn("h-full rounded-full", color)}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);
