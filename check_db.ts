import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rkjjeunfxkuifghrzrbq.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zvV1VqPhGbJ3vXlhux6EoA_vsyb9VUW';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProducts() {
  const { data, error } = await supabase.from('products').select('id, name, category');
  console.log(data);
}

checkProducts();
