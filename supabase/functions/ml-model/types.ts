import * as tf from 'https://esm.sh/@tensorflow/tfjs';

export interface ModelArchitecture {
  layers: tf.layers.Layer[];
  optimizer: string;
  loss: string;
  metrics: string[];
}

export interface PredictionResult {
  success_probability: number;
  expected_performance: number;
  retention_likelihood: number;
  confidence: number;
  explanation: PredictionExplanation;
}

export interface PredictionExplanation {
  overall_assessment: string;
  feature_importance: FeatureImportance[];
  improvement_areas: string[];
  confidence_factors: string[];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  contribution: 'positive' | 'negative';
}

export interface ModelConfig {
  inputFeatures: string[];
  outputFeatures: string[];
}