import { Product } from "./types";

export const CONTACT_INFO = {
  phone: "0649682152",
  whatsapp: "212649682152",
  tiktok: "@SHAYSAHRAWI",
  location: "معرض التضامن مع تجار الفيضانات، رقم 130 - آسفي",
};

const SAHRAWI_WEIGHTS = [
  { label: "200g", price: 35.0 },
  { label: "500g", price: 80.0 },
  { label: "1kg", price: 150.0 },
  { label: "2kg", price: 280.0 },
  { label: "4kg", price: 540.0 },
];

export const PRODUCTS: Product[] = [
  {
    id: "shay-dahabi",
    name: "شاي الصحراء الذهبي",
    description: "شاي فاخر يتميز بنكهة قوية ولون ذهبي أصيل، مثالي للجلسات الصحراوية التقليدية.",
    image: "https://picsum.photos/seed/tea-gold/800/1000",
    category: "شاي",
    options: SAHRAWI_WEIGHTS,
    sales: 1250,
  },
  {
    id: "shay-malki",
    name: "الشاي الملكي الممتاز",
    description: "مزيج خاص من أجود أوراق الشاي، مختار بعناية لعشاق الذوق الرفيع.",
    image: "https://picsum.photos/seed/tea-royal/800/1000",
    category: "شاي",
    options: SAHRAWI_WEIGHTS.map(o => ({ ...o, price: o.price * 1.2 })),
    sales: 980,
  },
  {
    id: "shay-atlas",
    name: "شاي أطلس الأصيل",
    description: "شاي طبيعي 100% يتميز بمذاق منعش ورائحة زكية تدوم طويلاً.",
    image: "https://picsum.photos/seed/tea-atlas/800/1000",
    category: "شاي",
    options: SAHRAWI_WEIGHTS.map(o => ({ ...o, price: o.price * 0.9 })),
    sales: 450,
  },
  {
    id: "malhafa-sahrawia",
    name: "ملحفة صحراوية أصيلة",
    description: "تشكيلة متنوعة من الملاحف الصحراوية بألوان وأثواب رفيعة (النيلا، كاز، بروكار).",
    image: "https://picsum.photos/seed/malhafa-lux/800/1000",
    category: "أزياء",
    options: [
      { label: "قطعة عادية", price: 250.0 },
      { label: "قطعة ممتازة", price: 450.0 },
      { label: "طقم العروس", price: 1200.0 },
    ],
    sales: 320,
  },
  {
    id: "darra-sahrawia",
    name: "دراعة صحراوية للرجال",
    description: "الدراعة الصحراوية التقليدية، رمز الأناقة والوقار في الصحراء.",
    image: "https://picsum.photos/seed/darra/800/1000",
    category: "أزياء",
    options: [
      { label: "عادية", price: 350.0 },
      { label: "مطرزة", price: 650.0 },
      { label: "ممتازة (بزوان)", price: 1500.0 },
    ],
    sales: 180,
  },
  {
    id: "atar-sahrawi",
    name: "عطور صحراوية فاخرة",
    description: "باقة من أرقى العطور والروائح الصحراوية التقليدية الفواحة.",
    image: "https://picsum.photos/seed/perfume-lux/800/1000",
    category: "عطور",
    options: [
      { label: "30ml", price: 120.0 },
      { label: "50ml", price: 180.0 },
      { label: "100ml", price: 320.0 },
    ],
    sales: 150,
  },
  {
    id: "natta-sahrawia",
    name: "الناطة الصحراوية",
    description: "حلوى الناطة التقليدية، مذاق الطفولة والأصالة الصحراوية.",
    image: "https://picsum.photos/seed/natta/800/1000",
    category: "منتجات متنوعة",
    options: [
      { label: "250g", price: 45.0 },
      { label: "500g", price: 85.0 },
      { label: "1kg", price: 160.0 },
    ],
    sales: 640,
  },
  {
    id: "nila-sahrawia",
    name: "النيلة الصحراوية الزرقاء",
    description: "النيلة الحرة الأصلية، سر جمال المرأة الصحراوية للعناية بالبشرة.",
    image: "https://picsum.photos/seed/nila/800/1000",
    category: "منتجات متنوعة",
    options: [
      { label: "قطعة صغيرة", price: 30.0 },
      { label: "مسحوق 100g", price: 70.0 },
    ],
    sales: 420,
  },
  {
    id: "kofia-sahrawia",
    name: "الكوفية الصحراوية",
    description: "غطاء الرأس التقليدي، جودة عالية وألوان متنوعة.",
    image: "https://picsum.photos/seed/kofia/800/1000",
    category: "منتجات متنوعة",
    options: [
      { label: "عادية", price: 40.0 },
      { label: "ممتازة", price: 75.0 },
    ],
    sales: 210,
  },
];
