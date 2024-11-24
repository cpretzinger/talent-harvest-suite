import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SystemConfig } from '@/types/system';
import { EventSystem } from './EventSystem';
import { StorageSystem } from './StorageSystem';
import { supabase } from '@/integrations/supabase/client';

export class CoreImplementationSystem {
  private config: SystemConfig;
  private eventBus: EventSystem;
  private storage: StorageSystem;

  constructor(config: SystemConfig) {
    this.config = config;
    this.eventBus = new EventSystem();
    this.storage = new StorageSystem(config.storageType);
    this.initializeSystems();
  }

  private async initializeSystems() {
    await this.initializeRealtime();
    await this.initializeEventSystem();
  }

  private async initializeRealtime() {
    if (this.config.realtime) {
      // Subscribe to relevant channels
      const channel = supabase.channel('system_updates');
      channel
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState();
          this.eventBus.emit('presenceSync', state);
        })
        .subscribe();
    }
  }

  private async initializeEventSystem() {
    // Set up core system events
    this.eventBus.on('systemError', (error) => {
      console.error('System error:', error);
    });
  }

  public getEventBus(): EventSystem {
    return this.eventBus;
  }

  public getStorage(): StorageSystem {
    return this.storage;
  }
}