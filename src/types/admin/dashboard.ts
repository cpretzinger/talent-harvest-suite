import { ReactNode } from 'react';

export interface KPIData {
  value: number;
  trend: number;
  target: number;
}

export interface ActivityItem {
  id: string;
  type: 'user' | 'system' | 'content' | 'security';
  action: string;
  description: string;
  user_id?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'doughnut';
  options: Record<string, any>;
}

export interface KPICardProps {
  title: string;
  value: number;
  trend: number;
  icon: ReactNode;
  color: string;
  formatter?: (value: number) => string;
}