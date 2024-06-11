import { type ThemeColorType } from '@/hooks/use-theme-color';

export type ThemeColor = {
  color: string;
  name: ThemeColorType;
};

export const THEME_COLORS: ThemeColor[] = [
  {
    name: 'default',
    color: '#4040F2',
  },
  {
    name: 'rose',
    color: '#f43f5e',
  },
  {
    name: 'indigo',
    color: '#6366f1',
  },
  {
    name: 'emerald',
    color: '#10b981',
  },
  {
    name: 'blue',
    color: '#3461ff',
  },
  {
    name: 'orange',
    color: '#f97316',
  },
];
