import React from 'react';
import { motion } from 'motion/react';

interface PivotTableProps {
  data: any[];
  rowDimension: string;
  colDimension: string;
  metric: string;
}

export const PivotTable: React.FC<PivotTableProps> = ({ data, rowDimension, colDimension, metric }) => {
  // Extract unique rows and columns
  const rows = Array.from(new Set(data.map(item => String(item[rowDimension])))).sort();
  const cols = Array.from(new Set(data.map(item => String(item[colDimension])))).sort();

  // Calculate values for the pivot table
  const pivotData: Record<string, Record<string, number>> = {};
  let maxVal = 0;

  data.forEach(item => {
    const row = String(item[rowDimension]);
    const col = String(item[colDimension]);
    const val = Number(item[metric]) || 0;

    if (!pivotData[row]) pivotData[row] = {};
    pivotData[row][col] = (pivotData[row][col] || 0) + val;
    
    if (pivotData[row][col] > maxVal) maxVal = pivotData[row][col];
  });

  const getHeatmapColor = (value: number) => {
    if (!value) return 'bg-gray-50';
    const intensity = Math.min(Math.floor((value / maxVal) * 900), 900);
    // Using green tones as requested
    if (intensity < 100) return 'bg-green-50';
    if (intensity < 200) return 'bg-green-100';
    if (intensity < 300) return 'bg-green-200';
    if (intensity < 400) return 'bg-green-300';
    if (intensity < 500) return 'bg-green-400';
    if (intensity < 600) return 'bg-green-500';
    if (intensity < 700) return 'bg-green-600';
    if (intensity < 800) return 'bg-green-700';
    return 'bg-green-800';
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-[14px] shadow-sm border border-gray-100 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-sc-blue mb-6">Heatmap: Valor por Serviço e Origem</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr>
            <th className="p-3 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-wider">Serviço</th>
            {cols.map(col => (
              <th key={col} className="p-3 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-wider text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string) => (
            <tr key={row}>
              <td className="p-3 border-b border-gray-50 font-medium text-gray-700">{row}</td>
              {cols.map((col: string) => {
                const val = pivotData[row]?.[col] || 0;
                return (
                  <td 
                    key={`${row}-${col}`} 
                    className={`p-3 border border-white text-center transition-colors duration-300 ${getHeatmapColor(val)} ${val > maxVal / 2 ? 'text-white' : 'text-gray-800'}`}
                  >
                    {val > 0 ? formatCurrency(val) : '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
