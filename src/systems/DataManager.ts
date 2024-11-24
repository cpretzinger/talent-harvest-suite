import { CachedData, FetchOptions } from '@/types/system';
import { supabase } from '@/integrations/supabase/client';

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

  async getData<T>(key: string, options?: FetchOptions): Promise<T> {
    const cachedData = this.cache.get(key);
    if (cachedData && !this.isStale(cachedData, options?.maxAge)) {
      return cachedData.data as T;
    }

    const data = await this.fetchFreshData<T>(key, options);
    this.updateCache(key, data);
    return data;
  }

  private isStale(cachedData: CachedData, maxAge?: number): boolean {
    if (!maxAge) return false;
    const age = Date.now() - cachedData.timestamp;
    return age > maxAge;
  }

  private async fetchFreshData<T>(key: string, options?: FetchOptions): Promise<T> {
    // Implement fetching logic using Supabase
    const { data, error } = await supabase
      .from(key)
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