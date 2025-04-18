
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'lojista' | 'cliente'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'admin' | 'lojista' | 'cliente'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'lojista' | 'cliente'
          created_at?: string
        }
      }
      stores: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string | null
          owner_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url?: string | null
          owner_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string | null
          owner_id?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          price: number
          stock: number
          image_url: string | null
          category: string
          store_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          stock: number
          image_url?: string | null
          category: string
          store_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          stock?: number
          image_url?: string | null
          category?: string
          store_id?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          store_id: string
          client_id: string
          status: 'pendente' | 'em_preparo' | 'entregue' | 'cancelado'
          total_value: number
          created_at: string
        }
        Insert: {
          id?: string
          store_id: string
          client_id: string
          status?: 'pendente' | 'em_preparo' | 'entregue' | 'cancelado'
          total_value: number
          created_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          client_id?: string
          status?: 'pendente' | 'em_preparo' | 'entregue' | 'cancelado'
          total_value?: number
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          product_id: string
          quantity: number
          unit_price: number
          order_id: string
        }
        Insert: {
          id?: string
          product_id: string
          quantity: number
          unit_price: number
          order_id: string
        }
        Update: {
          id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          order_id?: string
        }
      }
      payments: {
        Row: {
          id: string
          type: 'cartao' | 'boleto' | 'pix'
          status: 'pendente' | 'aprovado' | 'recusado'
          order_id: string
          value: number
          created_at: string
        }
        Insert: {
          id?: string
          type: 'cartao' | 'boleto' | 'pix'
          status?: 'pendente' | 'aprovado' | 'recusado'
          order_id: string
          value: number
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'cartao' | 'boleto' | 'pix'
          status?: 'pendente' | 'aprovado' | 'recusado'
          order_id?: string
          value?: number
          created_at?: string
        }
      }
      preferences: {
        Row: {
          id: string
          theme: 'light' | 'dark'
          language: string
          notifications: boolean
          user_id: string
        }
        Insert: {
          id?: string
          theme?: 'light' | 'dark'
          language?: string
          notifications?: boolean
          user_id: string
        }
        Update: {
          id?: string
          theme?: 'light' | 'dark'
          language?: string
          notifications?: boolean
          user_id?: string
        }
      }
    }
  }
}

// Tipos para os dados de autenticação
export interface UserData {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'lojista' | 'cliente';
}

export interface AuthState {
  user: UserData | null;
  session: any | null;
  loading: boolean;
}
