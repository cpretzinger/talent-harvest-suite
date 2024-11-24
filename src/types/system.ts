import { SupabaseClient } from '@supabase/supabase-js';

export interface SystemConfig {
  realtime: boolean;
  updateInterval: number;
  batchSize: number;
  storageType: 'local' | 'session' | 'indexed';
}

export interface CachedData {
  data: any;
  timestamp: number;
}

export interface PendingUpdate {
  type: string;
  data: any;
  timestamp: number;
}

export interface FetchOptions {
  maxAge?: number;
  forceRefresh?: boolean;
}

export type EventHandler = (data: any) => void;

export interface Subscriber {
  id: string;
  callback: UpdateCallback;
}

export type UpdateCallback = (update: any) => void;

export interface StorageDriver {
  set(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
}