import { StorageDriver } from '@/types/system';

class LocalStorageDriver implements StorageDriver {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

class SessionStorageDriver implements StorageDriver {
  async set(key: string, value: any): Promise<void> {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async remove(key: string): Promise<void> {
    sessionStorage.removeItem(key);
  }
}

class IndexedDBDriver implements StorageDriver {
  private dbName = 'appStorage';
  private storeName = 'keyValueStore';

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName);
      };
    });
  }

  async set(key: string, value: any): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async remove(key: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export class StorageSystem {
  private driver: StorageDriver;

  constructor(type: 'local' | 'session' | 'indexed') {
    this.driver = this.initializeDriver(type);
  }

  private initializeDriver(type: string): StorageDriver {
    switch (type) {
      case 'local':
        return new LocalStorageDriver();
      case 'session':
        return new SessionStorageDriver();
      case 'indexed':
        return new IndexedDBDriver();
      default:
        throw new Error(`Unsupported storage type: ${type}`);
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await this.driver.set(key, value);
    } catch (error) {
      console.error('Storage error:', error);
      throw new Error('Failed to store data');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      return await this.driver.get<T>(key);
    } catch (error) {
      console.error('Retrieval error:', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.driver.remove(key);
    } catch (error) {
      console.error('Removal error:', error);
      throw new Error('Failed to remove data');
    }
  }
}