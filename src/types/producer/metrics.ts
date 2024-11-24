export interface DailyMetrics {
  id: string;
  producerId: string;
  date: Date;
  metrics: {
    leads: {
      taken: number;
      converted: number;
      conversionRate: number;
    };
    calls: {
      dials: number;
      talkTime: number;
      averageCallDuration: number;
    };
    quotes: {
      households: number;
      totalQuotes: number;
      quoteToLeadRatio: number;
    };
  };
  metadata: {
    startTime: Date;
    endTime: Date;
    breaks: number;
    productivityScore: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

export interface LeadScore {
  score: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

export interface LeadProfile {
  id: string;
  metrics: DailyMetrics;
  characteristics: Record<string, any>;
  outcome?: 'converted' | 'lost' | 'pending';
}

export interface LeadRecommendation {
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}