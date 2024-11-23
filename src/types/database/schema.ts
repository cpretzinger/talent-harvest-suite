export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          assessment_id: string;
          text: string;
          category: string;
          sub_category: string | null;
          type: string;
          options: Json | null;
          weight: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          text: string;
          category: string;
          sub_category?: string | null;
          type: string;
          options?: Json | null;
          weight?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          assessment_id?: string;
          text?: string;
          category?: string;
          sub_category?: string | null;
          type?: string;
          options?: Json | null;
          weight?: number;
          created_at?: string;
        };
      };
      assessment_results: {
        Row: {
          id: string;
          user_id: string;
          assessment_id: string;
          scores: Json;
          dimensional_balance: Json;
          overall_profile: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          assessment_id: string;
          scores: Json;
          dimensional_balance: Json;
          overall_profile: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          assessment_id?: string;
          scores?: Json;
          dimensional_balance?: Json;
          overall_profile?: Json;
          created_at?: string;
        };
      };
      responses: {
        Row: {
          id: string;
          user_id: string;
          assessment_id: string;
          question_id: string;
          answer: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          assessment_id: string;
          question_id: string;
          answer: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          assessment_id?: string;
          question_id?: string;
          answer?: Json;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];