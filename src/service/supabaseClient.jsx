import { createClient } from "@supabase/supabase-js";
export const supabaseDb = createClient(import.meta.env.VITE_SUPABASE_URL,
   import.meta.env.VITE_SUPABASE_ANON_KEY);