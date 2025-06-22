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
      cases: {
        Row: {
          actual_submission_date: string | null
          assigned_consultant: string | null
          case_number: string
          case_type: Database["public"]["Enums"]["visa_type"]
          client_id: string
          created_date: string | null
          decision_date: string | null
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          status: Database["public"]["Enums"]["case_status"] | null
          target_submission_date: string | null
        }
        Insert: {
          actual_submission_date?: string | null
          assigned_consultant?: string | null
          case_number: string
          case_type: Database["public"]["Enums"]["visa_type"]
          client_id: string
          created_date?: string | null
          decision_date?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["case_status"] | null
          target_submission_date?: string | null
        }
        Update: {
          actual_submission_date?: string | null
          assigned_consultant?: string | null
          case_number?: string
          case_type?: Database["public"]["Enums"]["visa_type"]
          client_id?: string
          created_date?: string | null
          decision_date?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["case_status"] | null
          target_submission_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          assigned_agent: string | null
          country_of_origin: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          registration_date: string | null
          ritu_chat_enabled: boolean | null
          status: Database["public"]["Enums"]["client_status"] | null
          updated_at: string | null
          visa_type_interested: Database["public"]["Enums"]["visa_type"] | null
        }
        Insert: {
          assigned_agent?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          registration_date?: string | null
          ritu_chat_enabled?: boolean | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
          visa_type_interested?: Database["public"]["Enums"]["visa_type"] | null
        }
        Update: {
          assigned_agent?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          registration_date?: string | null
          ritu_chat_enabled?: boolean | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
          visa_type_interested?: Database["public"]["Enums"]["visa_type"] | null
        }
        Relationships: []
      }
      consultations: {
        Row: {
          client_id: string
          consultant_name: string
          created_at: string | null
          duration_minutes: number | null
          follow_up_required: boolean | null
          id: string
          meeting_link: string | null
          notes: string | null
          scheduled_date: string
          status: Database["public"]["Enums"]["consultation_status"] | null
        }
        Insert: {
          client_id: string
          consultant_name: string
          created_at?: string | null
          duration_minutes?: number | null
          follow_up_required?: boolean | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_date: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
        }
        Update: {
          client_id?: string
          consultant_name?: string
          created_at?: string | null
          duration_minutes?: number | null
          follow_up_required?: boolean | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_date?: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          client_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          upload_date: string | null
          verified_by: string | null
          verified_date: string | null
        }
        Insert: {
          client_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          upload_date?: string | null
          verified_by?: string | null
          verified_date?: string | null
        }
        Update: {
          client_id?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          upload_date?: string | null
          verified_by?: string | null
          verified_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      immigration_data: {
        Row: {
          created_at: string | null
          data_content: Json
          data_type: string
          id: number
          last_updated: string | null
          visa_subclass: string | null
        }
        Insert: {
          created_at?: string | null
          data_content: Json
          data_type: string
          id?: number
          last_updated?: string | null
          visa_subclass?: string | null
        }
        Update: {
          created_at?: string | null
          data_content?: Json
          data_type?: string
          id?: number
          last_updated?: string | null
          visa_subclass?: string | null
        }
        Relationships: []
      }
      ritu_conversations: {
        Row: {
          client_id: string
          id: string
          message: string
          message_type: Database["public"]["Enums"]["message_type"] | null
          sender: Database["public"]["Enums"]["message_sender"]
          session_id: string | null
          timestamp: string | null
        }
        Insert: {
          client_id: string
          id?: string
          message: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender: Database["public"]["Enums"]["message_sender"]
          session_id?: string | null
          timestamp?: string | null
        }
        Update: {
          client_id?: string
          id?: string
          message?: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender?: Database["public"]["Enums"]["message_sender"]
          session_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ritu_conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_case_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      case_status:
        | "initiated"
        | "documents_collection"
        | "application_preparation"
        | "submitted"
        | "awaiting_response"
        | "approved"
        | "rejected"
        | "closed"
      client_status:
        | "new"
        | "documents_pending"
        | "under_review"
        | "consultation_scheduled"
        | "application_in_progress"
        | "approved"
        | "rejected"
      consultation_status:
        | "scheduled"
        | "completed"
        | "cancelled"
        | "rescheduled"
      document_status:
        | "uploaded"
        | "under_review"
        | "verified"
        | "rejected"
        | "needs_replacement"
      document_type:
        | "passport"
        | "ielts_certificate"
        | "degree_certificate"
        | "transcripts"
        | "experience_letter"
        | "bank_statement"
        | "other"
      message_sender: "client" | "ritu"
      message_type:
        | "text"
        | "document_request"
        | "appointment_booking"
        | "escalation"
      priority_level: "low" | "medium" | "high" | "urgent"
      visa_type:
        | "Student Visa"
        | "Work Visa"
        | "Permanent Residence"
        | "Visitor Visa"
        | "Partner Visa"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      case_status: [
        "initiated",
        "documents_collection",
        "application_preparation",
        "submitted",
        "awaiting_response",
        "approved",
        "rejected",
        "closed",
      ],
      client_status: [
        "new",
        "documents_pending",
        "under_review",
        "consultation_scheduled",
        "application_in_progress",
        "approved",
        "rejected",
      ],
      consultation_status: [
        "scheduled",
        "completed",
        "cancelled",
        "rescheduled",
      ],
      document_status: [
        "uploaded",
        "under_review",
        "verified",
        "rejected",
        "needs_replacement",
      ],
      document_type: [
        "passport",
        "ielts_certificate",
        "degree_certificate",
        "transcripts",
        "experience_letter",
        "bank_statement",
        "other",
      ],
      message_sender: ["client", "ritu"],
      message_type: [
        "text",
        "document_request",
        "appointment_booking",
        "escalation",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      visa_type: [
        "Student Visa",
        "Work Visa",
        "Permanent Residence",
        "Visitor Visa",
        "Partner Visa",
      ],
    },
  },
} as const
