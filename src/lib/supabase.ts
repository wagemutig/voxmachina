import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.PUBLIC_SUPABASE_URL || 'https://beuvflymiodgodeqksyh.supabase.co';
const supabaseKey = (import.meta as any).env?.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BPIAtbeuvflymiodgodeqksyh';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
