import { CachedData, FetchOptions } from '@/types/system';
import { supabase } from "@/integrations/supabase/client";
import { Database } from '@/integrations/supabase/types';

// Define more specific types for table names
type Tables = Database['public']['Tables']
type TableName = keyof Tables

export class DataManager {
  private static instance: DataManager;
  private cache: Map<string, CachedData>;
  private pendingUpdates: Map<string, any[]>;

  private constructor() {
    this.cache = new Map();
    this.pendingUpdates = new Map();
    this.initializeCache();
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private initializeCache() {
    // Initialize with empty cache
    this.cache = new Map();
  }

  async getData<T extends Tables[TableName]['Row']>(
    tableName: TableName, 
    options?: FetchOptions
  ): Promise<T> {
    const cachedData = this.cache.get(tableName);
    if (cachedData && !this.isStale(cachedData, options?.maxAge)) {
      return cachedData.data as T;
    }

    const data = await this.fetchFreshData<T>(tableName, options);
    this.updateCache(tableName, data);
    return data;
  }

  private isStale(cachedData: CachedData, maxAge?: number): boolean {
    if (!maxAge) return false;
    const age = Date.now() - cachedData.timestamp;
    return age > maxAge;
  }

  private async fetchFreshData<T>(
    tableName: TableName, 
    options?: FetchOptions
  ): Promise<T> {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    return data as T;
  }

  private updateCache(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}