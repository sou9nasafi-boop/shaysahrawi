import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateMelhfa() {
  console.log('Updating Melhfa product...');
  
  // Find the product
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'melhfa');

  if (fetchError) {
    console.error('Error fetching:', fetchError);
    return;
  }

  console.log(`Found ${products?.length || 0} products with category 'melhfa'`);

  for (const product of products || []) {
    let features = product.features || [];
    if (!features.includes('ألوان أخرى متوفرة')) {
      features.push('ألوان أخرى متوفرة');
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ 
        category: 'sahrawi',
        features: features
      })
      .eq('id', product.id);

    if (updateError) {
      console.error(`Error updating product ${product.id}:`, updateError);
    } else {
      console.log(`Successfully updated product ${product.name}`);
    }
  }

  // Also check if there are any products named "ملحفة" that might have been categorized differently
  const { data: namedProducts, error: namedFetchError } = await supabase
    .from('products')
    .select('*')
    .ilike('name', '%ملحف%');

  if (namedFetchError) {
    console.error('Error fetching by name:', namedFetchError);
    return;
  }

  for (const product of namedProducts || []) {
    if (product.category !== 'sahrawi' || !(product.features || []).includes('ألوان أخرى متوفرة')) {
      let features = product.features || [];
      if (!features.includes('ألوان أخرى متوفرة')) {
        features.push('ألوان أخرى متوفرة');
      }

      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          category: 'sahrawi',
          features: features
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating named product ${product.id}:`, updateError);
      } else {
        console.log(`Successfully updated named product ${product.name}`);
      }
    }
  }

  console.log('Done.');
}

updateMelhfa();
