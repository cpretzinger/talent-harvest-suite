export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          action: string
          description: string
          id: string
          metadata: Json | null
          timestamp: string
          type: string
          user_id: string | null
        }
        Insert: {
          action: string
          description: string
          id?: string
          metadata?: Json | null
          timestamp?: string
          type: string
          user_id?: string | null
        }
        Update: {
          action?: string
          description?: string
          id?: string
          metadata?: Json | null
          timestamp?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_kpis: {
        Row: {
          active_producers: Json
          completion_rate: Json
          created_at: string
          id: string
          monthly_revenue: Json
          system_health: Json
        }
        Insert: {
          active_producers?: Json
          completion_rate?: Json
          created_at?: string
          id?: string
          monthly_revenue?: Json
          system_health?: Json
        }
        Update: {
          active_producers?: Json
          completion_rate?: Json
          created_at?: string
          id?: string
          monthly_revenue?: Json
          system_health?: Json
        }
        Relationships: []
      }
      assessment_invitations: {
        Row: {
          assessment_id: string
          completed_at: string | null
          created_at: string
          current_question_index: number | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          status: string | null
          unique_token: string
        }
        Insert: {
          assessment_id: string
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          status?: string | null
          unique_token?: string
        }
        Update: {
          assessment_id?: string
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          status?: string | null
          unique_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_invitations_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_progress: {
        Row: {
          answers: Json
          assessment_id: string
          current_question: number
          current_section: string
          id: string
          last_updated: string | null
          user_id: string
        }
        Insert: {
          answers?: Json
          assessment_id: string
          current_question?: number
          current_section?: string
          id?: string
          last_updated?: string | null
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_id?: string
          current_question?: number
          current_section?: string
          id?: string
          last_updated?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_progress_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          assessment_id: string
          created_at: string
          dimensional_balance: Json
          id: string
          overall_profile: Json
          scores: Json
          user_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string
          dimensional_balance: Json
          id?: string
          overall_profile: Json
          scores: Json
          user_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string
          dimensional_balance?: Json
          id?: string
          overall_profile?: Json
          scores?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_field_definitions: {
        Row: {
          agency_id: string | null
          created_at: string | null
          default_value: Json | null
          field_type: string
          id: string
          name: string
          options: Json | null
          updated_at: string | null
          validation_rules: Json | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string | null
          default_value?: Json | null
          field_type: string
          id?: string
          name: string
          options?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string | null
          default_value?: Json | null
          field_type?: string
          id?: string
          name?: string
          options?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_field_definitions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_fields: {
        Row: {
          agency_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_fields_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          lead_id: string | null
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          lead_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          lead_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scores: {
        Row: {
          created_at: string | null
          factors: Json | null
          id: string
          lead_id: string | null
          recommendations: Json | null
          score: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          factors?: Json | null
          id?: string
          lead_id?: string | null
          recommendations?: Json | null
          score: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          factors?: Json | null
          id?: string
          lead_id?: string | null
          recommendations?: Json | null
          score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_scores_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          analysis_results: Json | null
          assessment_score: number | null
          assigned_to: string | null
          communication_history: Json[] | null
          contact_method: string | null
          created_at: string | null
          custom_fields: Json | null
          dial_count: number | null
          email: string
          first_name: string
          follow_up_count: number | null
          follow_ups: Json[] | null
          id: string
          last_name: string
          lead_score: number | null
          lifetime_talk_time: number | null
          notes: string[] | null
          phone: string | null
          pipeline_stage: string | null
          placement_status: string | null
          source: string | null
          status: string
          tasks: Json[] | null
          total_quoted: number | null
          updated_at: string | null
        }
        Insert: {
          analysis_results?: Json | null
          assessment_score?: number | null
          assigned_to?: string | null
          communication_history?: Json[] | null
          contact_method?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          dial_count?: number | null
          email: string
          first_name: string
          follow_up_count?: number | null
          follow_ups?: Json[] | null
          id?: string
          last_name: string
          lead_score?: number | null
          lifetime_talk_time?: number | null
          notes?: string[] | null
          phone?: string | null
          pipeline_stage?: string | null
          placement_status?: string | null
          source?: string | null
          status?: string
          tasks?: Json[] | null
          total_quoted?: number | null
          updated_at?: string | null
        }
        Update: {
          analysis_results?: Json | null
          assessment_score?: number | null
          assigned_to?: string | null
          communication_history?: Json[] | null
          contact_method?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          dial_count?: number | null
          email?: string
          first_name?: string
          follow_up_count?: number | null
          follow_ups?: Json[] | null
          id?: string
          last_name?: string
          lead_score?: number | null
          lifetime_talk_time?: number | null
          notes?: string[] | null
          phone?: string | null
          pipeline_stage?: string | null
          placement_status?: string | null
          source?: string | null
          status?: string
          tasks?: Json[] | null
          total_quoted?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_data: {
        Row: {
          competitor_density: number
          created_at: string
          growth_rate: number
          id: string
          insurance_penetration: number
          market_name: string
          median_income: number
          population: number
          updated_at: string
        }
        Insert: {
          competitor_density: number
          created_at?: string
          growth_rate: number
          id?: string
          insurance_penetration: number
          market_name: string
          median_income: number
          population: number
          updated_at?: string
        }
        Update: {
          competitor_density?: number
          created_at?: string
          growth_rate?: number
          id?: string
          insurance_penetration?: number
          market_name?: string
          median_income?: number
          population?: number
          updated_at?: string
        }
        Relationships: []
      }
      metric_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          metric_id: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          metric_id?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          metric_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metric_embeddings_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "producer_daily_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      ml_feature_store: {
        Row: {
          feature_name: string
          feature_value: Json
          id: string
          last_updated: string | null
        }
        Insert: {
          feature_name: string
          feature_value: Json
          id?: string
          last_updated?: string | null
        }
        Update: {
          feature_name?: string
          feature_value?: Json
          id?: string
          last_updated?: string | null
        }
        Relationships: []
      }
      ml_feedback: {
        Row: {
          actual_outcome: Json
          created_at: string | null
          id: string
          performance_metrics: Json
          prediction_id: string | null
        }
        Insert: {
          actual_outcome: Json
          created_at?: string | null
          id?: string
          performance_metrics: Json
          prediction_id?: string | null
        }
        Update: {
          actual_outcome?: Json
          created_at?: string | null
          id?: string
          performance_metrics?: Json
          prediction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ml_feedback_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "ml_predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      ml_models: {
        Row: {
          created_at: string | null
          id: string
          metrics: Json
          parameters: Json
          status: string
          version: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metrics: Json
          parameters: Json
          status: string
          version: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metrics?: Json
          parameters?: Json
          status?: string
          version?: string
        }
        Relationships: []
      }
      ml_predictions: {
        Row: {
          confidence: number
          created_at: string | null
          features: Json
          id: string
          input_data: Json
          model_version: string
          prediction: Json
        }
        Insert: {
          confidence: number
          created_at?: string | null
          features: Json
          id?: string
          input_data: Json
          model_version: string
          prediction: Json
        }
        Update: {
          confidence?: number
          created_at?: string | null
          features?: Json
          id?: string
          input_data?: Json
          model_version?: string
          prediction?: Json
        }
        Relationships: []
      }
      ml_system_config: {
        Row: {
          batch_size: number
          created_at: string | null
          id: string
          model_version: string
          prediction_threshold: number
          update_frequency: number
          updated_at: string | null
        }
        Insert: {
          batch_size: number
          created_at?: string | null
          id?: string
          model_version: string
          prediction_threshold: number
          update_frequency: number
          updated_at?: string | null
        }
        Update: {
          batch_size?: number
          created_at?: string | null
          id?: string
          model_version?: string
          prediction_threshold?: number
          update_frequency?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      pattern_analysis: {
        Row: {
          analysis_type: string
          created_at: string | null
          id: string
          patterns: Json
          recommendations: Json | null
          significance: number | null
        }
        Insert: {
          analysis_type: string
          created_at?: string | null
          id?: string
          patterns: Json
          recommendations?: Json | null
          significance?: number | null
        }
        Update: {
          analysis_type?: string
          created_at?: string | null
          id?: string
          patterns?: Json
          recommendations?: Json | null
          significance?: number | null
        }
        Relationships: []
      }
      producer_ai_analysis: {
        Row: {
          analysis_result: Json
          analysis_type: string
          confidence_score: number
          created_at: string | null
          id: string
          producer_id: string
        }
        Insert: {
          analysis_result: Json
          analysis_type: string
          confidence_score: number
          created_at?: string | null
          id?: string
          producer_id: string
        }
        Update: {
          analysis_result?: Json
          analysis_type?: string
          confidence_score?: number
          created_at?: string | null
          id?: string
          producer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "producer_ai_analysis_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      producer_daily_metrics: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          date: string
          id: string
          metadata: Json | null
          metrics: Json
          producer_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          date: string
          id?: string
          metadata?: Json | null
          metrics: Json
          producer_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          date?: string
          id?: string
          metadata?: Json | null
          metrics?: Json
          producer_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producer_daily_metrics_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producer_daily_metrics_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          assessment_id: string
          category: string
          created_at: string
          id: string
          options: Json | null
          sub_category: string | null
          text: string
          type: string
          weight: number
        }
        Insert: {
          assessment_id: string
          category: string
          created_at?: string
          id?: string
          options?: Json | null
          sub_category?: string | null
          text: string
          type: string
          weight?: number
        }
        Update: {
          assessment_id?: string
          category?: string
          created_at?: string
          id?: string
          options?: Json | null
          sub_category?: string | null
          text?: string
          type?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category_id: string
          created_at: string
          created_by: string | null
          description: string | null
          file_path: string | null
          id: string
          title: string
          type: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          title: string
          type: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          answer: Json
          assessment_id: string
          created_at: string
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          answer: Json
          assessment_id: string
          created_at?: string
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          answer?: Json
          assessment_id?: string
          created_at?: string
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_configurations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_configurations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          provider: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          provider: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          provider?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      producer_performance_analytics: {
        Row: {
          avg_talk_time: number | null
          conversion_rate: number | null
          producer_id: string | null
          total_dials: number | null
          total_households_quoted: number | null
          week: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producer_daily_metrics_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      user_role: "administrator" | "recruiter" | "candidate" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
