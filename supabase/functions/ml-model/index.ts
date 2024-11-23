import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import * as tf from 'https://esm.sh/@tensorflow/tfjs';

interface ModelArchitecture {
  layers: tf.layers.Layer[];
  optimizer: string;
  loss: string;
  metrics: string[];
}

interface PredictionResult {
  success_probability: number;
  expected_performance: number;
  retention_likelihood: number;
  confidence: number;
  explanation: PredictionExplanation;
}

interface PredictionExplanation {
  overall_assessment: string;
  feature_importance: FeatureImportance[];
  improvement_areas: string[];
  confidence_factors: string[];
}

interface FeatureImportance {
  feature: string;
  importance: number;
  contribution: 'positive' | 'negative';
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

class InsuranceProducerModel {
  private model: tf.Sequential;
  private readonly modelConfig = {
    inputFeatures: [
      // Experience Features
      'years_experience',
      'insurance_experience',
      'sales_experience',
      
      // Skills Assessment
      'product_knowledge',
      'sales_technique',
      'client_relationship',
      'negotiation',
      
      // Personality Metrics
      'disc_dominance',
      'disc_influence',
      'disc_steadiness',
      'disc_conscientiousness',
      
      // Performance Indicators
      'lead_conversion_rate',
      'client_retention',
      'average_policy_value',
      
      // Assessment Scores
      'technical_assessment',
      'personality_assessment',
      'sales_simulation'
    ],
    
    outputFeatures: [
      'success_probability',
      'expected_performance',
      'retention_likelihood'
    ]
  };

  constructor(
    private supabase: any,
    private modelVersion: string
  ) {
    this.model = this.buildModel();
  }

  private buildModel(): tf.Sequential {
    const model = tf.sequential();

    // Input Layer
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [this.modelConfig.inputFeatures.length],
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

    // Hidden Layers
    model.add(tf.layers.dropout({ rate: 0.3 }));
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu',
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

    // Output Layer
    model.add(tf.layers.dense({
      units: this.modelConfig.outputFeatures.length,
      activation: 'sigmoid'
    }));

    // Compile Model
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy', 'precision', 'recall']
    });

    return model;
  }

  async train(trainingData: any[]): Promise<tf.History> {
    // Prepare training data
    const { xs, ys } = this.prepareTrainingData(trainingData);

    // Training configuration
    const trainConfig = {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: async (epoch: number, logs: any) => {
          await this.logTrainingProgress(epoch, logs);
        }
      }
    };

    // Train model
    const history = await this.model.fit(xs, ys, trainConfig);

    // Save model
    await this.saveModel();

    return history;
  }

  private prepareTrainingData(data: any[]): { xs: tf.Tensor; ys: tf.Tensor } {
    const xs = data.map(record => 
      this.modelConfig.inputFeatures.map(feature => 
        this.normalizeFeature(feature, record[feature])
      )
    );

    const ys = data.map(record =>
      this.modelConfig.outputFeatures.map(feature =>
        record[feature]
      )
    );

    return {
      xs: tf.tensor2d(xs),
      ys: tf.tensor2d(ys)
    };
  }

  private normalizeFeature(feature: string, value: number): number {
    const normalizationRules = {
      years_experience: { min: 0, max: 30 },
      product_knowledge: { min: 0, max: 100 },
      sales_technique: { min: 0, max: 100 },
      disc_dominance: { min: 0, max: 1 },
      technical_assessment: { min: 0, max: 100 }
      // Add rules for other features
    };

    const rule = normalizationRules[feature];
    if (!rule) return value;

    return (value - rule.min) / (rule.max - rule.min);
  }

  async predict(input: any): Promise<PredictionResult> {
    // Prepare input data
    const inputTensor = tf.tensor2d([
      this.modelConfig.inputFeatures.map(feature =>
        this.normalizeFeature(feature, input[feature])
      )
    ]);

    // Make prediction
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const predictionData = await prediction.data();

    // Calculate confidence
    const confidence = this.calculateConfidence(predictionData);

    // Generate explanation
    const explanation = await this.generateExplanation(input, predictionData);

    return {
      success_probability: predictionData[0],
      expected_performance: predictionData[1],
      retention_likelihood: predictionData[2],
      confidence,
      explanation
    };
  }

  private calculateConfidence(prediction: Float32Array): number {
    // Calculate confidence based on prediction distribution
    const meanPrediction = Array.from(prediction).reduce((a, b) => a + b, 0) / prediction.length;
    const variance = Array.from(prediction)
      .reduce((acc, val) => acc + Math.pow(val - meanPrediction, 2), 0) / prediction.length;
    
    // Higher variance = lower confidence
    return 1 - Math.min(variance, 1);
  }

  private async generateExplanation(
    input: any,
    prediction: Float32Array
  ): Promise<PredictionExplanation> {
    // SHAP-like feature importance calculation
    const featureImportance = await this.calculateFeatureImportance(input);
    
    // Generate natural language explanation
    const explanation = this.generateNaturalLanguageExplanation(
      prediction,
      featureImportance
    );

    return {
      overall_assessment: explanation,
      feature_importance: featureImportance,
      improvement_areas: this.identifyImprovementAreas(input, featureImportance),
      confidence_factors: this.explainConfidenceFactors(input)
    };
  }

  private async calculateFeatureImportance(input: any): Promise<FeatureImportance[]> {
    const baselinePrediction = await this.predict(input);
    
    return this.modelConfig.inputFeatures.map(feature => {
      const modifiedInput = { ...input };
      modifiedInput[feature] *= 0.9; // Reduce feature value by 10%
      
      const modifiedPrediction = this.predict(modifiedInput);
      const importance = Math.abs(baselinePrediction.success_probability - 
                                modifiedPrediction.success_probability);
      
      return {
        feature,
        importance,
        contribution: importance > 0 ? 'positive' : 'negative'
      };
    });
  }

  private async saveModel(): Promise<void> {
    const modelArtifacts = await this.model.save('localstorage://insurance-producer-model');
    
    await this.supabase.from('ml_models').insert({
      version: this.modelVersion,
      artifacts: modelArtifacts,
      config: this.modelConfig,
      metadata: {
        created_at: new Date().toISOString(),
        input_features: this.modelConfig.inputFeatures,
        output_features: this.modelConfig.outputFeatures
      }
    });
  }

  private async logTrainingProgress(epoch: number, logs: any): Promise<void> {
    await this.supabase.from('ml_training_logs').insert({
      model_version: this.modelVersion,
      epoch,
      metrics: logs,
      timestamp: new Date().toISOString()
    });
  }
}

// Edge Function Handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const { action, data } = await req.json();
    const modelVersion = `v${Date.now()}`;
    const model = new InsuranceProducerModel(supabase, modelVersion);

    switch (action) {
      case 'train':
        const history = await model.train(data);
        return new Response(JSON.stringify({ history }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      case 'predict':
        const prediction = await model.predict(data);
        return new Response(JSON.stringify({ prediction }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('ML Model error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
