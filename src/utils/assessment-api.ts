import { supabase } from "@/integrations/supabase/client";

export const assessmentApi = {
  startAssessment: async (assessmentId: string) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('assessment_progress')
      .upsert({
        user_id: session.session.user.id,
        assessment_id: assessmentId,
        current_question: 0,
        answers: {},
        last_updated: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  saveProgress: async (assessmentId: string, progress: { currentQuestion: number; answers: Record<string, any> }) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('assessment_progress')
      .update({
        current_question: progress.currentQuestion,
        answers: progress.answers,
        last_updated: new Date().toISOString()
      })
      .match({
        user_id: session.session.user.id,
        assessment_id: assessmentId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  submitAssessment: async (assessmentId: string, results: {
    scores: any[];
    dimensional_balance: any;
    overall_profile: any;
  }) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        user_id: session.session.user.id,
        assessment_id: assessmentId,
        scores: results.scores,
        dimensional_balance: results.dimensional_balance,
        overall_profile: results.overall_profile
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};