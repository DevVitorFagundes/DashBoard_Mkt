import React from 'react';
import { Sparkles } from 'lucide-react';

const GeminiAnalysis: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-[#0097A7]" />
        <h3 className="text-xl font-bold text-gray-800">Análise do Gemini sobre Envolvimento da Equipe</h3>
      </div>
      
      <div className="space-y-6 text-sm leading-relaxed text-gray-600">
        <p>
          1. Os leads têm se envolvido principalmente baixando e-books, participando de webinars, palestras e eventos (online e presenciais), entrando em contato ativamente via WhatsApp, Fale Conosco ou por indicação de clientes/parceiros, e retomando contato após períodos de inatividade no funil. Os padrões de interesse incluem serviços específicos (GEF, Patrimonial, Governança, Mapeamento Contábil, Planejamento Tributário) e curiosidade sobre os serviços da S\&C.
        </p>
        
        <p>
          2. A equipe de relacionamento tem atuado realizando o primeiro contato de forma proativa após a captação do lead, apresentando a S\&C e seus serviços, mapeando as necessidades dos leads, agendando reuniões para atendimento com consultores e fazendo o acompanhamento de leads parados no funil para reengajamento. Também auxiliam na comunicação e negociação em processos mais longos e realizam prospecção ativa.
        </p>
        
        <div className="pt-4 border-t border-gray-50">
          <p className="font-bold text-gray-800 mb-3">As formas mais comuns em que os leads acessam ou entram em contato com a Safras são:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>Eventos (Cursos/palestras, Webinars, CNMA, Evento S\&C, Evento Bayer)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>WhatsApp</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>Fale Conosco</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>E-book</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>Indicação (Clientes/Parceiros como Aegro, Syngenta)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]" />
              <span>Prospecção Ativa</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalysis;
