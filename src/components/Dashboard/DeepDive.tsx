import React from 'react';
import { motion } from 'motion/react';
import { PivotTable } from '../Charts/PivotTable';
import { StackedBarChart } from '../Charts/StackedBarChart';
import { Info } from 'lucide-react';

interface DeepDiveProps {
  leads: any[];
  colors: string[];
}

export const DeepDive: React.FC<DeepDiveProps> = ({ leads, colors }) => {
  return (
    <div className="space-y-8">
      {/* Pivot Table Section */}
      <PivotTable 
        data={leads} 
        rowDimension="servico" 
        colDimension="origemLimpa" 
        metric="proposta" 
      />

      {/* Stacked Bar Chart Section */}
      <StackedBarChart 
        data={leads} 
        dimension="origemLimpa" 
        breakdown="nivelParticipacao" 
        metric="count" 
        colors={colors} 
      />

      {/* Insight Text Box (Action 4) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-sc-blue/5 border border-sc-blue/10 p-6 rounded-[14px] flex gap-4 items-start"
      >
        <div className="p-2 bg-sc-blue/10 rounded-lg text-sc-blue">
          <Info size={24} />
        </div>
        <div>
          <h4 className="font-bold text-sc-blue mb-2">Insights do Arquiteto de Dados</h4>
          <p className="text-slate-600 leading-relaxed">
            Insight: Os leads têm se envolvido principalmente via Cursos/Palestras, WhatsApp e indicações. 
            Os padrões de interesse focam fortemente nos serviços de GEF e Patrimonial.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
