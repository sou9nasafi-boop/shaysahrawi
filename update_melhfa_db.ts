import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rkjjeunfxkuifghrzrbq.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zvV1VqPhGbJ3vXlhux6EoA_vsyb9VUW';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateMelhfa() {
  console.log('Updating Melhfa...');
  
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'melhfa');

  if (fetchError) {
    console.error('Fetch error:', fetchError);
    return;
  }

  if (products && products.length > 0) {
    for (const p of products) {
      const newDesc = p.description + " | المقاس: 4 متر طول في 1 متر عرض.";
      const { error: updateError } = await supabase
        .from('products')
        .update({
          prices: { "قطعة واحدة": 80 },
          description: newDesc
        })
        .eq('id', p.id);
        
      if (updateError) {
        console.error('Update error for', p.id, updateError);
      } else {
        console.log('Successfully updated', p.name);
      }
    }
  } else {
    console.log('No melhfa found.');
  }
}

updateMelhfa();
