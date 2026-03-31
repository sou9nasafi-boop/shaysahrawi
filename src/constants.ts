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
    image: "https://picsum.photos/seed/tea-gold/800/800",
    category: "شاي",
    options: SAHRAWI_WEIGHTS,
    sales: 1250,
  },
  {
    id: "shay-malki",
    name: "الشاي الملكي الممتاز",
    description: "مزيج خاص من أجود أوراق الشاي، مختار بعناية لعشاق الذوق الرفيع.",
    image: "https://picsum.photos/seed/tea-royal/800/800",
    category: "شاي",
    options: SAHRAWI_WEIGHTS.map(o => ({ ...o, price: o.price * 1.2 })),
    sales: 980,
  },
  {
    id: "shay-atlas",
    name: "شاي أطلس الأصيل",
    description: "شاي طبيعي 100% يتميز بمذاق منعش ورائحة زكية تدوم طويلاً.",
    image: "https://picsum.photos/seed/tea-atlas/800/800",
    category: "شاي",
    options: SAHRAWI_WEIGHTS.map(o => ({ ...o, price: o.price * 0.9 })),
    sales: 450,
  },
  {
    id: "malhafa-sahrawia",
    name: "ملحفة صحراوية أصيلة",
    description: "تشكيلة متنوعة من الملاحف الصحراوية بألوان وأثواب رفيعة.",
    image: "https://picsum.photos/seed/malhafa/800/800",
    category: "أزياء",
    options: [
      { label: "قطعة واحدة", price: 250.0 },
      { label: "طقم كامل", price: 450.0 },
    ],
    sales: 320,
  },
  {
    id: "atar-sahrawi",
    name: "عطور صحراوية فاخرة",
    description: "باقة من أرقى العطور والروائح الصحراوية التقليدية الفواحة.",
    image: "https://picsum.photos/seed/perfume/800/800",
    category: "عطور",
    options: [
      { label: "30ml", price: 120.0 },
      { label: "50ml", price: 180.0 },
      { label: "100ml", price: 320.0 },
    ],
    sales: 150,
  },
];
