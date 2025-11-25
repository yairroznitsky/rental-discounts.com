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
      location_icons: {
        Row: {
          cached_icon_path: string | null
          created_at: string
          icon_url: string | null
          id: string
          location_id: string
          location_type: string | null
          updated_at: string
        }
        Insert: {
          cached_icon_path?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          location_id: string
          location_type?: string | null
          updated_at?: string
        }
        Update: {
          cached_icon_path?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          location_id?: string
          location_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partner_configurations: {
        Row: {
          config_key: string
          config_value: string | null
          created_at: string
          id: string
          partner_id: string | null
        }
        Insert: {
          config_key: string
          config_value?: string | null
          created_at?: string
          id?: string
          partner_id?: string | null
        }
        Update: {
          config_key?: string
          config_value?: string | null
          created_at?: string
          id?: string
          partner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_configurations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "rental_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_clicks: {
        Row: {
          click_id: string
          dropoff_date: string | null
          dropoff_time: string | null
          iata_code: string | null
          id: string
          location_id: string | null
          partner_name: string
          pickup_date: string | null
          pickup_time: string | null
          timestamp: string
        }
        Insert: {
          click_id: string
          dropoff_date?: string | null
          dropoff_time?: string | null
          iata_code?: string | null
          id?: string
          location_id?: string | null
          partner_name: string
          pickup_date?: string | null
          pickup_time?: string | null
          timestamp?: string
        }
        Update: {
          click_id?: string
          dropoff_date?: string | null
          dropoff_time?: string | null
          iata_code?: string | null
          id?: string
          location_id?: string | null
          partner_name?: string
          pickup_date?: string | null
          pickup_time?: string | null
          timestamp?: string
        }
        Relationships: []
      }
      rental_partners: {
        Row: {
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      landings: {
        Row: {
          id: string
          click_id: string
          timestamp: string
          ip: string | null
          location: any | null
          user_agent: string | null
          device: string | null
          referrer: string | null
          partner: string | null
          deeplink: string | null
          parameters: any | null
          method: string | null
          url_params: any | null
        }
        Insert: {
          id?: string
          click_id: string
          timestamp?: string
          ip?: string | null
          location?: any | null
          user_agent?: string | null
          device?: string | null
          referrer?: string | null
          partner?: string | null
          deeplink?: string | null
          parameters?: any | null
          method?: string | null
          url_params?: any | null
        }
        Update: {
          id?: string
          click_id?: string
          timestamp?: string
          ip?: string | null
          location?: any | null
          user_agent?: string | null
          device?: string | null
          referrer?: string | null
          partner?: string | null
          deeplink?: string | null
          parameters?: any | null
          method?: string | null
          url_params?: any | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
