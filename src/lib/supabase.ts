import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rkjjeunfxkuifghrzrbq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zvV1VqPhGbJ3vXlhux6EoA_vsyb9VUW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
