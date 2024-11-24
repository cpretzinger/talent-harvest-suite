import { createClient } from '@supabase/supabase-js';
import { DailyMetrics, LeadProfile, LeadScore, LeadRecommendation } from '@/types/producer/metrics';
import { supabase } from '@/integrations/supabase/client';

export const updateMetricsEmbeddings = async (metrics: DailyMetrics) => {
  try {
    const response = await fetch('/api/metrics/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      throw new Error('Failed to update embeddings');
    }

    const { embedding } = await response.json();

    await supabase
      .from('metric_embeddings')
      .insert({
        metric_id: metrics.id,
        embedding,
        metadata: {
          conversion_rate: metrics.metrics.leads.conversionRate,
          talk_time: metrics.metrics.calls.talkTime,
          households_quoted: metrics.metrics.quotes.households
        }
      });

  } catch (error) {
    console.error('Error updating embeddings:', error);
    throw error;
  }
};

export const scoreLead = async (lead: LeadProfile): Promise<LeadScore> => {
  try {
    const response = await fetch('/api/leads/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error('Failed to score lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error scoring lead:', error);
    throw error;
  }
};

export const generateLeadRecommendations = async (
  lead: LeadProfile
): Promise<LeadRecommendation[]> => {
  try {
    const response = await fetch('/api/leads/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error('Failed to generate recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};