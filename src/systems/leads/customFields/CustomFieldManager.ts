import { supabase } from '@/integrations/supabase/client';
import { ValidationRule, SelectOption, CustomField } from '@/types/leads';

interface CustomFieldConfig {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  validation?: ValidationRule[];
  defaultValue?: any;
  options?: SelectOption[];
}

export class CustomFieldManager {
  private readonly MAX_FIELDS_PER_AGENCY = 5;

  async addCustomField(
    agencyId: string,
    config: CustomFieldConfig
  ): Promise<CustomField> {
    const currentFields = await this.getAgencyCustomFields(agencyId);
    
    if (currentFields.length >= this.MAX_FIELDS_PER_AGENCY) {
      throw new Error('Maximum custom fields limit reached');
    }

    await this.validateFieldConfig(config);
    return this.createCustomField(agencyId, config);
  }

  private async getAgencyCustomFields(agencyId: string): Promise<CustomField[]> {
    const { data, error } = await supabase
      .from('custom_fields')
      .select('*')
      .eq('agency_id', agencyId);

    if (error) throw error;
    return data as CustomField[];
  }

  private async validateFieldConfig(config: CustomFieldConfig): Promise<void> {
    if (!config.name || !config.type) {
      throw new Error('Name and type are required');
    }
  }

  private async createCustomField(
    agencyId: string,
    config: CustomFieldConfig
  ): Promise<CustomField> {
    const { data, error } = await supabase
      .from('custom_fields')
      .insert({
        agency_id: agencyId,
        name: config.name,
        type: config.type,
        validation_rules: config.validation,
        default_value: config.defaultValue,
        options: config.options
      })
      .select()
      .single();

    if (error) throw error;
    return data as CustomField;
  }
}