
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use import.meta.env for Vite projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ou Anon Key não encontrados. Verifique as variáveis de ambiente.');
}

export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseAnonKey as string
);
