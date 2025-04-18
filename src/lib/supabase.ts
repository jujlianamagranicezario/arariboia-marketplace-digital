
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use import.meta.env for Vite projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log error for debugging but provide fallback values for development
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ou Anon Key não encontrados. Verifique as variáveis de ambiente.');
}

// Use fallback values (empty string) to prevent the runtime error and allow the app to load
// In a real app, you would want to handle this differently, perhaps showing a configuration error screen
export const supabase = createClient<Database>(
  supabaseUrl || 'https://your-project.supabase.co',  // fallback URL (this won't work but prevents crash)
  supabaseAnonKey || 'public-anon-key-placeholder',   // fallback key (this won't work but prevents crash)
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

