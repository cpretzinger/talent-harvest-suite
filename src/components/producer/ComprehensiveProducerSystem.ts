import { ProducerEvaluation } from '@/types/producer/carrier';
import { CarrierSpecificAnalyzer } from './CarrierSpecificAnalyzer';
import { ProducerSuccessMetrics } from './ProducerSuccessMetrics';
import { ProducerDevelopmentTracker } from './ProducerDevelopmentTracker';
import { MarketAnalyzer } from './MarketAnalyzer';
import { ComplianceMonitor } from './ComplianceMonitor';

export class ComprehensiveProducerSystem {
  private carrierAnalyzer = new CarrierSpecificAnalyzer();
  private successMetrics = new ProducerSuccessMetrics();
  private developmentTracker = new ProducerDevelopmentTracker();
  private marketAnalyzer = new MarketAnalyzer();
  private complianceMonitor = new ComplianceMonitor();

  async evaluateProducer(producerId: string): Promise<ProducerEvaluation> {
    if (!producerId) {
      throw new Error('Producer not found');
    }

    const [carrierFit, metrics, development, market, compliance] = await Promise.all([
      this.carrierAnalyzer.analyzeCarrierFit(producerId, 'carrier_a'),
      this.successMetrics.trackProducerMetrics(producerId, { start: new Date(), end: new Date() }),
      this.developmentTracker.trackDevelopment(producerId),
      this.marketAnalyzer.analyzeMarket('default-location', producerId),
      this.complianceMonitor.monitorCompliance(producerId)
    ]);

    return {
      carrierFit,
      metrics,
      development,
      market,
      compliance,
      recommendations: []
    };
  }
}