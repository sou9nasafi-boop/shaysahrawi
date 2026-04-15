import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rkjjeunfxkuifghrzrbq.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zvV1VqPhGbJ3vXlhux6EoA_vsyb9VUW';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addMelhfa() {
  const { error } = await supabase.from('products').insert([{
    name: "ملحف صحراوي فاخر",
    category: "melhfa",
    prices: { "قطعة واحدة": 80 },
    description: "ملحف صحراوي أصيل بألوان زاهية وتصميم تقليدي يعكس ثقافة الصحراء. قماش بارد ومريح يناسب جميع الأوقات. | المقاس: 4 متر طول في 1 متر عرض.",
    image: "https://i.ibb.co/gFVFtNh1/pomelli-photoshoot-image-1-1-0414-1.jpg",
    secondaryimage: "https://i.ibb.co/r2jR4m9J/pomelli-photoshoot-image-1-1-0414.jpg",
    gallery: [
      "https://i.ibb.co/jkVjr7vb/Melhfa-fabric-on-202604142039.jpg",
      "https://i.ibb.co/23FsJC3P/Sahrawi-melhfa-fabric-202604142039.jpg",
      "https://i.ibb.co/0VQB5J27/Moroccan-woman-wearing-202604142039.jpg",
      "https://i.ibb.co/RkmTt8q8/Woman-drinking-tea-202604142039.jpg"
    ],
    features: ["قماش بارد ومريح", "ألوان ثابتة", "طول قياسي 4.5 متر", "جودة عالية"]
  }]);
  
  if (error) {
    console.error('Error inserting melhfa:', error);
  } else {
    console.log('Melhfa added successfully.');
  }
}

addMelhfa();
