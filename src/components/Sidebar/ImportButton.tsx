import React, { useRef } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';

interface ImportButtonProps {
  onDataImported: (data: any[]) => void;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = React.useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        if (workbook.SheetNames.length < 2) {
          alert('A planilha deve conter pelo menos duas abas para o cruzamento de dados.');
          setIsImporting(false);
          return;
        }

        // Get data from the first two sheets
        const sheet1Name = workbook.SheetNames[0];
        const sheet2Name = workbook.SheetNames[1];
        
        const sheet1Data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet1Name]) as any[];
        const sheet2Data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet2Name]) as any[];

        // Cross-reference data using "ID Funil"
        const mergedData = sheet1Data.map(item1 => {
          const idFunil = item1['ID Funil'];
          if (idFunil) {
            const item2 = sheet2Data.find(i => i['ID Funil'] === idFunil);
            if (item2) {
              return { ...item1, ...item2 };
            }
          }
          return item1;
        });

        onDataImported(mergedData);
        alert('Dados importados e cruzados com sucesso!');
      } catch (error) {
        console.error('Erro ao importar planilha:', error);
        alert('Erro ao processar a planilha. Verifique o formato e os nomes das colunas.');
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls, .csv"
        className="hidden"
      />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="w-full flex items-center justify-center gap-2 py-3 bg-sc-green-dark hover:bg-sc-green-dark/90 text-white rounded-[14px] shadow-sm transition-all group cursor-pointer"
      >
        {isImporting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
        <span className="text-sm font-bold">Nova Planilha</span>
      </motion.button>
    </div>
  );
};
