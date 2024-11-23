import { AssessmentCategory } from './assessment/category';
import { Question, DimensionalBalance, Profile, CategoryScore } from './assessment';
import { Json } from './database/schema';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      assessments: {
        Row: {
          id: string;
          candidate_id: string | null;
          questions: Question[] | null;
          responses: Json[] | null;
          score: number | null;
          personality_profile: Json | null;
          completion_time: number | null;
          started_at: string | null;
          completed_at: string | null;
          created_at: string | null;
          updated_at: string | null;
          title: string | null;
          description: string | null;
          categories: AssessmentCategory[] | null;
          dimensional_balance: DimensionalBalance | null;
          category_scores: CategoryScore[] | null;
          overall_profile: Profile | null;
        };
        Insert: {
          id?: string;
          candidate_id?: string | null;
          questions?: Question[] | null;
          responses?: Json[] | null;
          score?: number | null;
          personality_profile?: Json | null;
          completion_time?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          title?: string | null;
          description?: string | null;
          categories?: AssessmentCategory[] | null;
          dimensional_balance?: DimensionalBalance | null;
          category_scores?: CategoryScore[] | null;
          overall_profile?: Profile | null;
        };
        Update: {
          id?: string;
          candidate_id?: string | null;
          questions?: Question[] | null;
          responses?: Json[] | null;
          score?: number | null;
          personality_profile?: Json | null;
          completion_time?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          title?: string | null;
          description?: string | null;
          categories?: AssessmentCategory[] | null;
          dimensional_balance?: DimensionalBalance | null;
          category_scores?: CategoryScore[] | null;
          overall_profile?: Profile | null;
        };
      };
      documents: {
        Row: {
          created_at: string | null;
          file_name: string;
          file_path: string;
          file_type: string | null;
          id: string;
          lead_id: string | null;
          updated_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          file_name: string;
          file_path: string;
          file_type?: string | null;
          id?: string;
          lead_id?: string | null;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          file_name?: string;
          file_path?: string;
          file_type?: string | null;
          id?: string;
          lead_id?: string | null;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "documents_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          assessment_score: number | null;
          assigned_to: string | null;
          communication_history: Json[] | null;
          created_at: string | null;
          email: string;
          first_name: string;
          follow_ups: Json[] | null;
          id: string;
          last_name: string;
          notes: string[] | null;
          phone: string | null;
          pipeline_stage: string | null;
          placement_status: string | null;
          source: string | null;
          status: string;
          tasks: Json[] | null;
          updated_at: string | null;
        };
        Insert: {
          assessment_score?: number | null;
          assigned_to?: string | null;
          communication_history?: Json[] | null;
          created_at?: string | null;
          email: string;
          first_name: string;
          follow_ups?: Json[] | null;
          id?: string;
          last_name: string;
          notes?: string[] | null;
          phone?: string | null;
          pipeline_stage?: string | null;
          placement_status?: string | null;
          source?: string | null;
          status?: string;
          tasks?: Json[] | null;
          updated_at?: string | null;
        };
        Update: {
          assessment_score?: number | null;
          assigned_to?: string | null;
          communication_history?: Json[] | null;
          created_at?: string | null;
          email?: string;
          first_name?: string;
          follow_ups?: Json[] | null;
          id?: string;
          last_name?: string;
          notes?: string[] | null;
          phone?: string | null;
          pipeline_stage?: string | null;
          placement_status?: string | null;
          source?: string | null;
          status?: string;
          tasks?: Json[] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "administrator" | "recruiter" | "candidate" | "manager";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"];
