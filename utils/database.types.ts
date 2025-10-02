export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      events: {
        Row: {
          age_range: number[] | null;
          duration: unknown | null;
          end_time: string | null;
          id: string;
          name: string | null;
          place_id: string | null;
          start_time: string | null;
        };
        Insert: {
          age_range?: number[] | null;
          duration?: unknown | null;
          end_time?: string | null;
          id: string;
          name?: string | null;
          place_id?: string | null;
          start_time?: string | null;
        };
        Update: {
          age_range?: number[] | null;
          duration?: unknown | null;
          end_time?: string | null;
          id?: string;
          name?: string | null;
          place_id?: string | null;
          start_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_place';
            columns: ['place_id'];
            isOneToOne: false;
            referencedRelation: 'places';
            referencedColumns: ['id'];
          },
        ];
      };
      kids: {
        Row: {
          birthdate: string | null;
          first_name: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          birthdate?: string | null;
          first_name?: string | null;
          id: string;
          user_id?: string | null;
        };
        Update: {
          birthdate?: string | null;
          first_name?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      places: {
        Row: {
          address: string | null;
          area_type: string | null;
          category: string | null;
          created_at: string | null;
          deleted: boolean | null;
          description: string | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
          opening_hours: string | null;
          price_range: string | null;
          updated_at: string | null;
          website_url: string | null;
        };
        Insert: {
          address?: string | null;
          area_type?: string | null;
          category?: string | null;
          created_at?: string | null;
          deleted?: boolean | null;
          description?: string | null;
          id: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
          opening_hours?: string | null;
          price_range?: string | null;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Update: {
          address?: string | null;
          area_type?: string | null;
          category?: string | null;
          created_at?: string | null;
          deleted?: boolean | null;
          description?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
          opening_hours?: string | null;
          price_range?: string | null;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      todos: {
        Row: {
          counter: number;
          created_at: string | null;
          deleted: boolean | null;
          done: boolean | null;
          id: string;
          text: string | null;
          updated_at: string | null;
        };
        Insert: {
          counter?: number;
          created_at?: string | null;
          deleted?: boolean | null;
          done?: boolean | null;
          id?: string;
          text?: string | null;
          updated_at?: string | null;
        };
        Update: {
          counter?: number;
          created_at?: string | null;
          deleted?: boolean | null;
          done?: boolean | null;
          id?: string;
          text?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          birthdate: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          birthdate?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          birthdate?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      binary_quantize: {
        Args: { '': string } | { '': unknown };
        Returns: unknown;
      };
      halfvec_avg: {
        Args: { '': number[] };
        Returns: unknown;
      };
      halfvec_out: {
        Args: { '': unknown };
        Returns: unknown;
      };
      halfvec_send: {
        Args: { '': unknown };
        Returns: string;
      };
      halfvec_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
      hnsw_bit_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnsw_halfvec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnsw_sparsevec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      hnswhandler: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflat_bit_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflat_halfvec_support: {
        Args: { '': unknown };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: { '': unknown };
        Returns: unknown;
      };
      l2_norm: {
        Args: { '': unknown } | { '': unknown };
        Returns: number;
      };
      l2_normalize: {
        Args: { '': string } | { '': unknown } | { '': unknown };
        Returns: unknown;
      };
      sparsevec_out: {
        Args: { '': unknown };
        Returns: unknown;
      };
      sparsevec_send: {
        Args: { '': unknown };
        Returns: string;
      };
      sparsevec_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
      vector_avg: {
        Args: { '': number[] };
        Returns: string;
      };
      vector_dims: {
        Args: { '': string } | { '': unknown };
        Returns: number;
      };
      vector_norm: {
        Args: { '': string };
        Returns: number;
      };
      vector_out: {
        Args: { '': string };
        Returns: unknown;
      };
      vector_send: {
        Args: { '': string };
        Returns: string;
      };
      vector_typmod_in: {
        Args: { '': unknown[] };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
