import { AssessmentResponse } from "@/types/assessmentTypes";

export const calculateScores = (responses: AssessmentResponse[]) => {
  const scores: Record<string, number> = {};
  
  responses.forEach(response => {
    const category = response.answer?.category;
    if (category) {
      scores[category] = (scores[category] || 0) + (response.answer?.value || 0);
    }
  });
  
  return scores;
};

export const calculateDimensionalBalance = (responses: AssessmentResponse[]) => {
  const external = {
    empathy: 0,
    practicalThinking: 0,
    systemsJudgment: 0,
  };
  
  const internal = {
    selfEsteem: 0,
    roleAwareness: 0,
    selfDirection: 0,
  };
  
  responses.forEach(response => {
    const dimension = response.answer?.dimension;
    const value = response.answer?.value || 0;
    
    if (dimension) {
      if (dimension in external) {
        external[dimension as keyof typeof external] += value;
      } else if (dimension in internal) {
        internal[dimension as keyof typeof internal] += value;
      }
    }
  });
  
  return { external, internal };
};

export const calculateOverallProfile = (responses: AssessmentResponse[]) => {
  const naturalStyle = { D: 0, I: 0, S: 0, C: 0 };
  const adaptiveStyle = { D: 0, I: 0, S: 0, C: 0 };
  const values: { dimension: string; score: number; description: string }[] = [];
  
  responses.forEach(response => {
    const style = response.answer?.style;
    const type = response.answer?.type;
    const value = response.answer?.value || 0;
    
    if (style && type === 'natural') {
      naturalStyle[style as keyof typeof naturalStyle] += value;
    } else if (style && type === 'adaptive') {
      adaptiveStyle[style as keyof typeof adaptiveStyle] += value;
    } else if (response.answer?.dimension) {
      values.push({
        dimension: response.answer.dimension,
        score: value,
        description: response.answer.description || '',
      });
    }
  });
  
  return { naturalStyle, adaptiveStyle, values };
};