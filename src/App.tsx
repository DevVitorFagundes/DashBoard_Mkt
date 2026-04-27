/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Wallet, 
  Phone,
  LayoutDashboard
} from 'lucide-react';
import mockData from './data/dados.json';

// Components
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Dashboard/Header';
import { MetricCard } from './components/Dashboard/MetricCard';
import { FilterSection } from './components/Filters/FilterSection';
import ConsultantChart from './components/Dashboard/ConsultantChart';
import DataGridChart from './components/Dashboard/DataGridChart';
import GeminiAnalysis from './components/Dashboard/GeminiAnalysis';
import { OriginChart } from './components/Charts/OriginChart';
import { ServiceChart } from './components/Charts/ServiceChart';
import { MarketingIndicators } from './components/Dashboard/MarketingIndicators';
import { RegionalSummary } from './components/Dashboard/RegionalSummary';
import { PipelineHealth } from './components/Dashboard/PipelineHealth';
import { RelationshipDonut } from './components/Charts/RelationshipDonut';
import { FunnelIndicator } from './components/Charts/FunnelIndicator';
import { RegionalPerformance } from './components/Charts/RegionalPerformance';
import { ConquistadasSection } from './components/Dashboard/ConquistadasSection';
import { VisaoGeral } from './components/Dashboard/VisaoGeral';
import { RelationshipDashboard } from './components/Relationship/RelationshipDashboard';

import { parseCurrency, formatCurrency } from './lib/utils';
import { MarketingIntelligence } from './components/Marketing/MarketingIntelligence';
import dataIndicadores from './data/indicadores.json';

// --- Mock Data & Constants ---

const COLORS = [
  '#004D40', // Dark Green (formerly Turquoise)
  '#003366', // Dark Blue
  '#005596', // Medium Blue
  '#40B4E5', // Light Blue
  '#00778B', // Teal
  '#002855', // Navy
];

export interface Lead {
  cliente: string;
  servico: string;
  equipe: string;
  pago: number;
  proposta: number;
  ano: string;
  mes: string;
  origem: string;
  isFirstContact: boolean;
  consultor: string;
  nivelParticipacao: string;
  status: string;
  dataCriacao: string;
}

const ALL_LEADS: Lead[] = ((mockData as any).Base_Geral_Clientes2 || []).map((item: any) => ({
  cliente: item.Clientes || '',
  servico: item.Serviço || '',
  equipe: item.Equipe || item["Equipe BA_DF_PR_RS_SP"] || '',
  pago: parseCurrency(item["Pago R$ (01/25)"]),
  proposta: parseCurrency(item["Total proposta (R$)"]),
  ano: String(item.Ano || ''),
  mes: item.Data || '',
  origem: item.Origem || '',
  isFirstContact: item["Primeiro contato com a S&C?"] === 'Sim',
  consultor: item["Consultor Relacionamento"] || '',
  nivelParticipacao: item["Nível de participação"] || '',
  status: '',
  dataCriacao: ''
}));

const FILTERS = ['Ano', 'Serviço', 'Origem', 'Equipe', 'Primeiro Contato'];

export default function App() {
  const [currentView, setCurrentView] = useState('visao-executiva');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerCategory, setActiveDrawerCategory] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [importedData, setImportedData] = useState<Lead[] | null>(null);
  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const allLeads = useMemo(() => {
    return importedData || ALL_LEADS;
  }, [importedData]);

  // Derived Filter Options
  const FILTER_OPTIONS = useMemo(() => {
    const options: Record<string, { label: string, count: number }[]> = {};
    
    FILTERS.forEach(filter => {
      const counts: Record<string, number> = {};
      allLeads.forEach(lead => {
        let value = '';
        if (filter === 'Ano') value = lead.ano;
        if (filter === 'Serviço') value = lead.servico;
        if (filter === 'Origem') value = lead.origem;
        if (filter === 'Equipe') value = lead.equipe;
        if (filter === 'Primeiro Contato') value = lead.isFirstContact ? 'SIM' : 'NÃO';
        
        counts[value] = (counts[value] || 0) + 1;
      });
      
      options[filter] = Object.entries(counts)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => {
          if (filter === 'Primeiro Contato') {
            return a.label === 'SIM' ? -1 : 1;
          }
          return b.count - a.count;
        });
    });
    
    return options;
  }, [allLeads]);

  // Filtered Data
  const filteredLeads = useMemo(() => {
    return allLeads.filter(lead => {
      for (const filter of FILTERS) {
        const selected = selectedFilters[filter];
        if (selected && selected.length > 0) {
          let value = '';
          if (filter === 'Ano') value = lead.ano;
          if (filter === 'Serviço') value = lead.servico;
          if (filter === 'Origem') value = lead.origem;
          if (filter === 'Equipe') value = lead.equipe;
          if (filter === 'Primeiro Contato') value = lead.isFirstContact ? 'SIM' : 'NÃO';
          
          if (!selected.includes(value)) return false;
        }
      }
      return true;
    });
  }, [selectedFilters, allLeads]);

  // Dynamic Metrics
  const metrics = useMemo(() => {
    const propostasFechadas = filteredLeads.length;
    const totalProposta = filteredLeads.reduce((acc, curr) => acc + curr.proposta, 0);
    const totalPago = filteredLeads.reduce((acc, curr) => acc + curr.pago, 0);
    const primeirosContatos = filteredLeads.filter(l => l.isFirstContact).length;

    const formatCurrency = (val: number) => {
      if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(2).replace('.', ',')} mi`;
      return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    };

    // Mock trend data
    const generateTrend = (base: number) => ({
      value: "+12.5%",
      isPositive: true,
      data: [
        { value: base * 0.8 },
        { value: base * 0.9 },
        { value: base * 0.85 },
        { value: base * 1.1 },
        { value: base * 1.05 },
        { value: base }
      ]
    });

    return {
      propostasFechadas,
      valorTotalPropostas: formatCurrency(totalProposta),
      valorTotalPago: formatCurrency(totalPago),
      primeirosContatos,
      totalPropostaRaw: totalProposta,
      totalPagoRaw: totalPago,
      // New metrics for Pipeline Health
      ticketMedio: propostasFechadas > 0 ? totalProposta / propostasFechadas : 0,
      taxaConversao: propostasFechadas > 0 ? (filteredLeads.filter(l => l.pago > 0).length / propostasFechadas) * 100 : 0,
      cicloMedioDias: 45, // Mocked average closing time
      trends: {
        propostas: generateTrend(propostasFechadas),
        valorProposta: generateTrend(totalProposta),
        valorPago: generateTrend(totalPago),
        contatos: generateTrend(primeirosContatos)
      }
    };
  }, [filteredLeads]);

  // Dynamic Chart Data
  const consultantData = useMemo(() => {
    const stats: Record<string, { count: number, paidCount: number }> = {};
    filteredLeads.forEach(lead => {
      if (!stats[lead.consultor]) stats[lead.consultor] = { count: 0, paidCount: 0 };
      stats[lead.consultor].count += 1;
      if (lead.pago > 0) stats[lead.consultor].paidCount += 1;
    });
    return Object.entries(stats)
      .map(([name, { count, paidCount }]) => ({ 
        name, 
        count, 
        conversionRate: (paidCount / count) * 100 
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredLeads]);

  const participationData = useMemo(() => {
    const stats: Record<string, { value: number, count: number }> = {};
    filteredLeads.forEach(lead => {
      if (!stats[lead.nivelParticipacao]) stats[lead.nivelParticipacao] = { value: 0, count: 0 };
      stats[lead.nivelParticipacao].value += lead.proposta;
      stats[lead.nivelParticipacao].count += 1;
    });
    return Object.entries(stats)
      .map(([label, { value, count }]) => ({ label, value, count }))
      .sort((a, b) => b.value - a.value);
  }, [filteredLeads]);

  const teamData = useMemo(() => {
    const stats: Record<string, { value: number, count: number }> = {};
    filteredLeads.forEach(lead => {
      if (!stats[lead.equipe]) stats[lead.equipe] = { value: 0, count: 0 };
      stats[lead.equipe].value += lead.proposta;
      stats[lead.equipe].count += 1;
    });
    return Object.entries(stats)
      .map(([label, { value, count }]) => ({ label, value, count }))
      .sort((a, b) => b.value - a.value);
  }, [filteredLeads]);

  const serviceData = useMemo(() => {
    const stats: Record<string, { value: number, count: number }> = {};
    filteredLeads.forEach(lead => {
      if (!stats[lead.servico]) stats[lead.servico] = { value: 0, count: 0 };
      stats[lead.servico].value += lead.proposta;
      stats[lead.servico].count += 1;
    });
    return Object.entries(stats)
      .map(([label, { value, count }]) => ({ label, value, count }))
      .sort((a, b) => b.value - a.value);
  }, [filteredLeads]);

  const originData = useMemo(() => {
    const stats: Record<string, { value: number, count: number }> = {};
    filteredLeads.forEach(lead => {
      if (!stats[lead.origem]) stats[lead.origem] = { value: 0, count: 0 };
      stats[lead.origem].value += lead.proposta;
      stats[lead.origem].count += 1;
    });
    return Object.entries(stats)
      .map(([label, { value, count }]) => ({ label, value, count }))
      .sort((a, b) => b.value - a.value);
  }, [filteredLeads]);

  // Original Chart Data (for Donut and Bar)
  const originChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLeads.forEach(lead => {
      counts[lead.origem] = (counts[lead.origem] || 0) + 1;
    });
    
    const sortedEntries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1]);
    
    const top5 = sortedEntries.slice(0, 5);
    const othersRaw = sortedEntries.slice(5);
    
    const total = filteredLeads.length || 1;
    
    const main = top5.map(([name, count]) => ({
      name,
      value: Number(((count / total) * 100).toFixed(1)),
      count
    }));
    
    let others: { name: string, value: number, count: number }[] = [];
    
    if (othersRaw.length > 0) {
      const othersCount = othersRaw.reduce((acc, [_, count]) => acc + count, 0);
      main.push({
        name: 'Outros',
        value: Number(((othersCount / total) * 100).toFixed(1)),
        count: othersCount
      });

      others = othersRaw.map(([name, count]) => ({
        name,
        value: Number(((count / othersCount) * 100).toFixed(1)),
        count
      }));
    }
    
    return { main, others };
  }, [filteredLeads]);

  const serviceChartData = useMemo(() => {
    const values: Record<string, number> = {};
    filteredLeads.forEach(lead => {
      values[lead.servico] = (values[lead.servico] || 0) + lead.proposta;
    });
    return Object.entries(values)
      .map(([name, value]) => ({ 
        name, 
        value: Number((value / 1000000).toFixed(2)) 
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredLeads]);

  useEffect(() => {
    const checkWidth = () => {
      setIsCompact(window.innerWidth < 1460);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleToggleFilter = (filter: string, label: string) => {
    setSelectedFilters(prev => {
      const current = prev[filter] || [];
      const next = current.includes(label) 
        ? current.filter(l => l !== label)
        : [...current, label];
      return { ...prev, [filter]: next };
    });
  };

  const handleClearFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const next = { ...prev };
      delete next[filter];
      return next;
    });
  };

  const totalActiveFilters: number = (Object.values(selectedFilters) as string[][]).reduce((acc: number, curr: string[]) => acc + (curr?.length || 0), 0);

  const clearAllFilters = () => {
    setSelectedFilters({});
    setActiveDrawerCategory(null);
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'visao-executiva':
        return 'Dashboard de Relacionamento';
      case 'relacionamento':
        return 'Dashboard de Relacionamento';
      case 'marketing':
        return 'Marketing Intelligence';
      default:
        return 'Painel de Controle';
    }
  };

  const getPageSubtitle = () => {
    switch (currentView) {
      case 'visao-executiva':
      case 'relacionamento':
        return 'Visão estratégica de conversão e prospecção ativa.';
      default:
        return '';
    }
  };

  const handleDataImported = (data: any[]) => {
    // Map raw imported data to Lead interface
    const mappedData: Lead[] = data.map(item => ({
      cliente: item.cliente || item.Clientes || '',
      servico: item.servico || item.Serviço || '',
      equipe: item.equipe || item.Equipe || item["Equipe BA_DF_PR_RS_SP"] || '',
      pago: typeof item.pago === 'number' ? item.pago : parseCurrency(item.pago || item["Pago R$ (01/25)"] || '0'),
      proposta: typeof item.proposta === 'number' ? item.proposta : parseCurrency(item.proposta || item["Total proposta (R$)"] || '0'),
      ano: String(item.ano || item.Ano || ''),
      mes: item.mes || item.Data || '',
      origem: item.origem || item.Origem || '',
      isFirstContact: item.isFirstContact === true || item["Primeiro contato com a S&C?"] === 'Sim',
      consultor: item.consultor || item["Consultor Relacionamento"] || '',
      nivelParticipacao: item.nivelParticipacao || item["Nível de participação"] || '',
      status: item.status || '',
      dataCriacao: item.dataCriacao || ''
    }));
    setImportedData(mappedData);
  };

  return (
    <div className="flex h-screen bg-sc-offwhite overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onDataImported={handleDataImported}
      />

      <main className="flex-1 overflow-y-auto outline-none">
        <div className="p-8 max-w-7xl mx-auto w-full">
          {currentView === 'visao-executiva' ? (
            <VisaoGeral />
          ) : currentView === 'relacionamento' ? (
            <RelationshipDashboard />
          ) : currentView === 'marketing' ? (
            <MarketingIntelligence />
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
              <Phone size={64} className="mb-4 opacity-20" />
              <p className="text-xl font-medium">Esta tela está em desenvolvimento.</p>
              <button 
                onClick={() => setCurrentView('visao-executiva')}
                className="mt-4 text-sc-blue font-bold hover:underline"
              >
                Voltar para Painel de Resultados
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
