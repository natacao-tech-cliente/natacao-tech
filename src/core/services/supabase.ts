import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/core/types/database"; // Certifique-se que criou esse arquivo na etapa anterior

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    " Faltam as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
