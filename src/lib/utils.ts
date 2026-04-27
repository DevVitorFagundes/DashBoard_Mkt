import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseCurrency = (val: string | number | undefined): number => {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const cleaned = val.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
  return parseFloat(cleaned) || 0;
};

export const formatCurrency = (val: number) => {
  if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(2).replace('.', ',')} mi`;
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatCurrencyMi = (val: number) => {
  return `R$ ${(val / 1000000).toFixed(2).replace('.', ',')} mi`;
};
