import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js';
import * as tf from 'https://esm.sh/@tensorflow/tfjs';
import { modelConfig, normalizationRules } from './modelConfig.ts';
import type { PredictionResult, FeatureImportance, PredictionExplanation } from './types.ts';

export class InsuranceProducerModel {
  private model: tf.Sequential;

  constructor(
    private supabase: SupabaseClient,
    private modelVersion: string
  ) {
    this.model = this.buildModel();
  }

  private buildModel(): tf.Sequential {
    const model = tf.sequential();

    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [modelConfig.inputFeatures.length],
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

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

    model.add(tf.layers.dense({
      units: modelConfig.outputFeatures.length,
      activation: 'sigmoid'
    }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy', 'precision', 'recall']
    });

    return model;
  }

  private normalizeFeature(feature: string, value: number): number {
    const rule = normalizationRules[feature];
    if (!rule) return value;
    return (value - rule.min) / (rule.max - rule.min);
  }

  private prepareTrainingData(data: any[]): { xs: tf.Tensor; ys: tf.Tensor } {
    const xs = data.map(record => 
      modelConfig.inputFeatures.map(feature => 
        this.normalizeFeature(feature, record[feature])
      )
    );

    const ys = data.map(record =>
      modelConfig.outputFeatures.map(feature =>
        record[feature]
      )
    );

    return {
      xs: tf.tensor2d(xs),
      ys: tf.tensor2d(ys)
    };
  }

  async train(trainingData: any[]): Promise<tf.History> {
    const { xs, ys } = this.prepareTrainingData(trainingData);
    const history = await this.model.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: async (epoch: number, logs: any) => {
          await this.logTrainingProgress(epoch, logs);
        }
      }
    });

    await this.saveModel();
    return history;
  }

  async predict(input: any): Promise<PredictionResult> {
    const inputTensor = tf.tensor2d([
      modelConfig.inputFeatures.map(feature =>
        this.normalizeFeature(feature, input[feature])
      )
    ]);

    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const predictionData = await prediction.data();
    const confidence = this.calculateConfidence(predictionData);
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
    const meanPrediction = Array.from(prediction).reduce((a, b) => a + b, 0) / prediction.length;
    const variance = Array.from(prediction)
      .reduce((acc, val) => acc + Math.pow(val - meanPrediction, 2), 0) / prediction.length;
    return 1 - Math.min(variance, 1);
  }

  private async generateExplanation(
    input: any,
    prediction: Float32Array
  ): Promise<PredictionExplanation> {
    const featureImportance = await this.calculateFeatureImportance(input);
    return {
      overall_assessment: this.generateNaturalLanguageExplanation(prediction, featureImportance),
      feature_importance: featureImportance,
      improvement_areas: this.identifyImprovementAreas(input, featureImportance),
      confidence_factors: this.explainConfidenceFactors(input)
    };
  }

  private async calculateFeatureImportance(input: any): Promise<FeatureImportance[]> {
    const baselinePrediction = await this.predict(input);
    
    return modelConfig.inputFeatures.map(feature => {
      const modifiedInput = { ...input };
      modifiedInput[feature] *= 0.9;
      
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
      config: modelConfig,
      metadata: {
        created_at: new Date().toISOString(),
        input_features: modelConfig.inputFeatures,
        output_features: modelConfig.outputFeatures
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

  private generateNaturalLanguageExplanation(prediction: Float32Array, featureImportance: FeatureImportance[]): string {
    // Implement natural language explanation generation
    return "Model prediction explanation placeholder";
  }

  private identifyImprovementAreas(input: any, featureImportance: FeatureImportance[]): string[] {
    // Implement improvement areas identification
    return ["Improvement area placeholder"];
  }

  private explainConfidenceFactors(input: any): string[] {
    // Implement confidence factors explanation
    return ["Confidence factor placeholder"];
  }
}