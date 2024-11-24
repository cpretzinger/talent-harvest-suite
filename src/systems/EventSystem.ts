import { EventHandler } from '@/types/system';

export class EventSystem {
  private handlers: Map<string, Set<EventHandler>>;
  private oneTimeHandlers: Map<string, Set<EventHandler>>;

  constructor() {
    this.handlers = new Map();
    this.oneTimeHandlers = new Map();
  }

  on(event: string, handler: EventHandler): void {
    const handlers = this.handlers.get(event) || new Set();
    handlers.add(handler);
    this.handlers.set(event, handlers);
  }

  once(event: string, handler: EventHandler): void {
    const handlers = this.oneTimeHandlers.get(event) || new Set();
    handlers.add(handler);
    this.oneTimeHandlers.set(event, handlers);
  }

  emit(event: string, data?: any): void {
    // Regular handlers
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }

    // One-time handlers
    const oneTimeHandlers = this.oneTimeHandlers.get(event);
    if (oneTimeHandlers) {
      oneTimeHandlers.forEach(handler => handler(data));
      this.oneTimeHandlers.delete(event);
    }
  }

  off(event: string, handler: EventHandler): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }
}