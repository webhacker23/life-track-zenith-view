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
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          is_active: boolean | null
          priority: number | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          file_url: string | null
          id: string
          instructions: string | null
          max_marks: number | null
          subject_id: string | null
          teacher_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          file_url?: string | null
          id?: string
          instructions?: string | null
          max_marks?: number | null
          subject_id?: string | null
          teacher_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          file_url?: string | null
          id?: string
          instructions?: string | null
          max_marks?: number | null
          subject_id?: string | null
          teacher_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          description: string | null
          file_size: number | null
          file_url: string | null
          id: string
          is_public: boolean | null
          semester: Database["public"]["Enums"]["semester_number"]
          subject_id: string | null
          title: string
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean | null
          semester: Database["public"]["Enums"]["semester_number"]
          subject_id?: string | null
          title: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean | null
          semester?: Database["public"]["Enums"]["semester_number"]
          subject_id?: string | null
          title?: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects_master"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_life_data: {
        Row: {
          breakfast: string | null
          created_at: string
          creative_activity: string | null
          daily_goal: string | null
          date: string
          day_highlight: string | null
          dinner: string | null
          exercise_minutes: number | null
          expense_category: string | null
          family_time_minutes: number | null
          friends_interaction: string | null
          fruits_servings: number | null
          goal_achieved: boolean | null
          gratitude_note: string | null
          id: string
          improvement_area: string | null
          learning_new_skill: string | null
          lunch: string | null
          meditation_minutes: number | null
          money_saved: number | null
          money_spent: number | null
          mood_rating: number | null
          outdoor_time_minutes: number | null
          phone_screen_time_minutes: number | null
          posture_breaks: number | null
          reading_minutes: number | null
          skill_practice_minutes: number | null
          skincare_routine: boolean | null
          sleep_end: string | null
          sleep_start: string | null
          snacks: string | null
          social_media_minutes: number | null
          steps_count: number | null
          study_hours: number | null
          tomorrow_priority: string | null
          updated_at: string
          user_id: string
          vegetables_servings: number | null
          vitamins_taken: boolean | null
          water_glasses: number | null
          work_hours: number | null
        }
        Insert: {
          breakfast?: string | null
          created_at?: string
          creative_activity?: string | null
          daily_goal?: string | null
          date: string
          day_highlight?: string | null
          dinner?: string | null
          exercise_minutes?: number | null
          expense_category?: string | null
          family_time_minutes?: number | null
          friends_interaction?: string | null
          fruits_servings?: number | null
          goal_achieved?: boolean | null
          gratitude_note?: string | null
          id?: string
          improvement_area?: string | null
          learning_new_skill?: string | null
          lunch?: string | null
          meditation_minutes?: number | null
          money_saved?: number | null
          money_spent?: number | null
          mood_rating?: number | null
          outdoor_time_minutes?: number | null
          phone_screen_time_minutes?: number | null
          posture_breaks?: number | null
          reading_minutes?: number | null
          skill_practice_minutes?: number | null
          skincare_routine?: boolean | null
          sleep_end?: string | null
          sleep_start?: string | null
          snacks?: string | null
          social_media_minutes?: number | null
          steps_count?: number | null
          study_hours?: number | null
          tomorrow_priority?: string | null
          updated_at?: string
          user_id: string
          vegetables_servings?: number | null
          vitamins_taken?: boolean | null
          water_glasses?: number | null
          work_hours?: number | null
        }
        Update: {
          breakfast?: string | null
          created_at?: string
          creative_activity?: string | null
          daily_goal?: string | null
          date?: string
          day_highlight?: string | null
          dinner?: string | null
          exercise_minutes?: number | null
          expense_category?: string | null
          family_time_minutes?: number | null
          friends_interaction?: string | null
          fruits_servings?: number | null
          goal_achieved?: boolean | null
          gratitude_note?: string | null
          id?: string
          improvement_area?: string | null
          learning_new_skill?: string | null
          lunch?: string | null
          meditation_minutes?: number | null
          money_saved?: number | null
          money_spent?: number | null
          mood_rating?: number | null
          outdoor_time_minutes?: number | null
          phone_screen_time_minutes?: number | null
          posture_breaks?: number | null
          reading_minutes?: number | null
          skill_practice_minutes?: number | null
          skincare_routine?: boolean | null
          sleep_end?: string | null
          sleep_start?: string | null
          snacks?: string | null
          social_media_minutes?: number | null
          steps_count?: number | null
          study_hours?: number | null
          tomorrow_priority?: string | null
          updated_at?: string
          user_id?: string
          vegetables_servings?: number | null
          vitamins_taken?: boolean | null
          water_glasses?: number | null
          work_hours?: number | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          enrolled_at: string | null
          id: string
          student_id: string | null
          subject_id: string | null
        }
        Insert: {
          enrolled_at?: string | null
          id?: string
          student_id?: string | null
          subject_id?: string | null
        }
        Update: {
          enrolled_at?: string | null
          id?: string
          student_id?: string | null
          subject_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      live_classes: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          max_participants: number | null
          meeting_url: string | null
          scheduled_at: string
          subject_id: string | null
          teacher_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          meeting_url?: string | null
          scheduled_at: string
          subject_id?: string | null
          teacher_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          meeting_url?: string | null
          scheduled_at?: string
          subject_id?: string | null
          teacher_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_classes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          approved_at: string | null
          approved_by: string | null
          contact_number: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          email: string
          full_name: string
          guardian_contact: string | null
          guardian_name: string | null
          id: string
          is_approved: boolean | null
          phone: string | null
          profile_image_url: string | null
          registration_number: string | null
          role: Database["public"]["Enums"]["user_role"]
          roll_number: string | null
          semester: string | null
          session: string | null
          student_id: string | null
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          contact_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email: string
          full_name: string
          guardian_contact?: string | null
          guardian_name?: string | null
          id: string
          is_approved?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          registration_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          roll_number?: string | null
          semester?: string | null
          session?: string | null
          student_id?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          contact_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string
          full_name?: string
          guardian_contact?: string | null
          guardian_name?: string | null
          id?: string
          is_approved?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          registration_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          roll_number?: string | null
          semester?: string | null
          session?: string | null
          student_id?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      queries: {
        Row: {
          created_at: string | null
          description: string
          id: string
          priority: number | null
          responded_at: string | null
          responded_by: string | null
          response: string | null
          status: Database["public"]["Enums"]["query_status"] | null
          student_id: string | null
          subject_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          priority?: number | null
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: Database["public"]["Enums"]["query_status"] | null
          student_id?: string | null
          subject_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          priority?: number | null
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: Database["public"]["Enums"]["query_status"] | null
          student_id?: string | null
          subject_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "queries_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      recorded_classes: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_public: boolean | null
          subject_id: string | null
          teacher_id: string
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_public?: boolean | null
          subject_id?: string | null
          teacher_id: string
          title: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_public?: boolean | null
          subject_id?: string | null
          teacher_id?: string
          title?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "recorded_classes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      student_approvals: {
        Row: {
          approved_at: string | null
          created_at: string
          id: string
          status: string | null
          student_id: string
          subject_id: string
          teacher_id: string
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          id?: string
          status?: string | null
          student_id: string
          subject_id: string
          teacher_id: string
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          id?: string
          status?: string | null
          student_id?: string
          subject_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_approvals_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string | null
          credits: number | null
          description: string | null
          id: string
          name: string
          semester: Database["public"]["Enums"]["semester_number"]
        }
        Insert: {
          code: string
          created_at?: string | null
          credits?: number | null
          description?: string | null
          id?: string
          name: string
          semester: Database["public"]["Enums"]["semester_number"]
        }
        Update: {
          code?: string
          created_at?: string | null
          credits?: number | null
          description?: string | null
          id?: string
          name?: string
          semester?: Database["public"]["Enums"]["semester_number"]
        }
        Relationships: []
      }
      subjects_master: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      content_type: "video" | "pdf" | "document" | "image"
      query_status: "pending" | "answered" | "closed"
      semester: "1st" | "2nd" | "3rd" | "4th" | "5th" | "6th" | "7th" | "8th"
      semester_number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
      user_role: "student" | "teacher" | "professor" | "admin"
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
      content_type: ["video", "pdf", "document", "image"],
      query_status: ["pending", "answered", "closed"],
      semester: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
      semester_number: ["1", "2", "3", "4", "5", "6", "7", "8"],
      user_role: ["student", "teacher", "professor", "admin"],
    },
  },
} as const
