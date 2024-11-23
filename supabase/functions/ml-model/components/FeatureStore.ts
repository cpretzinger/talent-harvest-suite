import { supabase } from '../client';
import { ProducerFeatures } from '../types';

export class ProducerFeatureStore {
  private readonly featureCategories = {
    background: [
      'education',
      'previous_experience',
      'licenses_certifications'
    ],
    assessment: [
      'sales_aptitude',
      'product_knowledge',
      'personality_profile'
    ],
    performance: [
      'production_metrics',
      'client_retention',
      'compliance_record'
    ]
  };

  async storeProducerFeatures(
    producerId: string,
    features: ProducerFeatures
  ): Promise<void> {
    await supabase.from('producer_features').insert({
      producer_id: producerId,
      background_features: features.background,
      assessment_features: features.assessment,
      performance_features: features.performance,
      computed_at: new Date(),
      valid_until: this.calculateValidityPeriod(features)
    });
  }

  private calculateValidityPeriod(features: ProducerFeatures): Date {
    const validityPeriod = new Date();
    validityPeriod.setMonth(validityPeriod.getMonth() + 3);
    return validityPeriod;
  }

  async retrieveProducerFeatures(producerId: string): Promise<ProducerFeatures | null> {
    const { data, error } = await supabase
      .from('producer_features')
      .select('*')
      .eq('producer_id', producerId)
      .order('computed_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;

    return {
      background: data.background_features,
      assessment: data.assessment_features,
      performance: data.performance_features,
      licensing: data.licensing_features,
      compliance: data.compliance_features
    };
  }

  async updateFeatures(
    producerId: string,
    features: Partial<ProducerFeatures>
  ): Promise<void> {
    const { error } = await supabase
      .from('producer_features')
      .update({
        ...features,
        updated_at: new Date()
      })
      .eq('producer_id', producerId);

    if (error) throw new Error(`Failed to update features: ${error.message}`);
  }

  async deleteFeatures(producerId: string): Promise<void> {
    const { error } = await supabase
      .from('producer_features')
      .delete()
      .eq('producer_id', producerId);

    if (error) throw new Error(`Failed to delete features: ${error.message}`);
  }

  async listFeatureHistory(
    producerId: string,
    limit: number = 10
  ): Promise<ProducerFeatures[]> {
    const { data, error } = await supabase
      .from('producer_features')
      .select('*')
      .eq('producer_id', producerId)
      .order('computed_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to retrieve feature history: ${error.message}`);

    return data.map(record => ({
      background: record.background_features,
      assessment: record.assessment_features,
      performance: record.performance_features,
      licensing: record.licensing_features,
      compliance: record.compliance_features
    }));
  }

  async validateFeatures(features: ProducerFeatures): Promise<boolean> {
    const requiredCategories = Object.keys(this.featureCategories);
    return requiredCategories.every(category => 
      features[category as keyof ProducerFeatures] !== undefined
    );
  }

  async archiveFeatures(producerId: string): Promise<void> {
    const features = await this.retrieveProducerFeatures(producerId);
    if (!features) return;

    await supabase.from('producer_features_archive').insert({
      producer_id: producerId,
      features,
      archived_at: new Date()
    });

    await this.deleteFeatures(producerId);
  }
}