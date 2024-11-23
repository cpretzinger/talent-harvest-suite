import { describe, it, expect, beforeEach } from 'vitest';
import { ComplianceMonitor } from '@/components/producer/ComplianceMonitor';

describe('ComplianceMonitor', () => {
  let monitor: ComplianceMonitor;

  beforeEach(() => {
    monitor = new ComplianceMonitor();
  });

  describe('monitorCompliance', () => {
    it('should monitor producer compliance status', async () => {
      const producerId = 'test-producer';

      const status = await monitor.monitorCompliance(producerId);

      expect(status).toHaveProperty('licensingStatus');
      expect(status).toHaveProperty('salesPractices');
      expect(status).toHaveProperty('regulatoryCompliance');
      expect(status).toHaveProperty('alerts');
      expect(status).toHaveProperty('action_items');
    });

    it('should identify urgent compliance issues', async () => {
      const producerId = 'test-producer';

      const status = await monitor.monitorCompliance(producerId);

      expect(status.alerts.urgent).toBeInstanceOf(Array);
      expect(status.alerts.upcoming).toBeInstanceOf(Array);
      expect(status.alerts.resolved).toBeInstanceOf(Array);
    });
  });
});