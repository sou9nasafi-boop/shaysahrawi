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
  // --- TEA PRODUCTS (SHAY) ---
  {
    id: "shay-wad-waer",
    name: "شاي الواد الواعر",
    description: "شاي صحراوي أصيل يتميز بنكهة قوية وجودة عالية.",
    image: "https://picsum.photos/seed/tea-1/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 18.0 },
      { label: "500g", price: 45.0 },
    ],
    sales: 850,
  },
  {
    id: "shay-almoukar",
    name: "شاي الموكار طانطان",
    description: "من أجود أنواع الشاي الصحراوي التقليدي.",
    image: "https://picsum.photos/seed/tea-2/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 18.0 },
      { label: "500g", price: 45.0 },
    ],
    sales: 720,
  },
  {
    id: "shay-smara-aswad",
    name: "شاي السمارة اسود",
    description: "شاي السمارة الأصلي، مذاق لا يقاوم.",
    image: "https://picsum.photos/seed/tea-3/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 18.0 },
      { label: "500g", price: 45.0 },
    ],
    sales: 640,
  },
  {
    id: "shay-4011-fransa",
    name: "شاي 4011 فرنسا",
    description: "شاي 4011 المستورد، جودة عالمية بنكهة صحراوية.",
    image: "https://picsum.photos/seed/tea-4/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 18.0 },
      { label: "500g", price: 45.0 },
    ],
    sales: 910,
  },
  {
    id: "shay-las-palmas",
    name: "شاي لاس بالماس",
    description: "شاي لاس بالماس الشهير، رفيق الجلسات الصحراوية.",
    image: "https://picsum.photos/seed/tea-5/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 17.0 },
      { label: "500g", price: 43.0 },
    ],
    sales: 1100,
  },
  {
    id: "shay-tarfaya-4011",
    name: "شاي طرفايا 4011",
    description: "شاي طرفايا الأصيل، جودة مضمونة ومذاق رائع.",
    image: "https://picsum.photos/seed/tea-6/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 19.0 },
      { label: "500g", price: 48.0 },
      { label: "1kg", price: 95.0 },
      { label: "2kg", price: 140.0 },
    ],
    sales: 1350,
  },
  {
    id: "shay-las-palmas-long",
    name: "شاي لاس بالماس طويل",
    description: "النسخة الممتازة من شاي لاس بالماس.",
    image: "https://picsum.photos/seed/tea-7/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 18.0 },
      { label: "500g", price: 45.0 },
      { label: "1kg", price: 75.0 },
      { label: "2kg", price: 150.0 },
      { label: "3kg", price: 220.0 },
    ],
    sales: 1580,
  },
  {
    id: "shay-wad-fatima",
    name: "شاي واد ام فاطمة",
    description: "شاي فاخر جداً للمناسبات الخاصة.",
    image: "https://picsum.photos/seed/tea-8/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 28.0 },
      { label: "500g", price: 70.0 },
    ],
    sales: 420,
  },
  {
    id: "shay-wad-fatima-zanbil",
    name: "شاي واد ام فاطمة زنبيل",
    description: "شاي واد ام فاطمة في تغليف الزنبيل التقليدي.",
    image: "https://picsum.photos/seed/tea-9/800/1000",
    category: "شاي",
    options: [
      { label: "500g", price: 70.0 },
    ],
    sales: 310,
  },
  {
    id: "shay-general",
    name: "شاي الجنرال",
    description: "شاي قوي ومميز لأصحاب الذوق الرفيع.",
    image: "https://picsum.photos/seed/tea-10/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 26.0 },
      { label: "500g", price: 65.0 },
    ],
    sales: 560,
  },
  {
    id: "shay-wadnoun",
    name: "شاي وادنون 10/10",
    description: "شاي وادنون بجودة 10 على 10.",
    image: "https://picsum.photos/seed/tea-11/800/1000",
    category: "شاي",
    options: [
      { label: "200g", price: 15.0 },
      { label: "500g", price: 36.0 },
      { label: "1kg", price: 75.0 },
      { label: "2kg", price: 130.0 },
    ],
    sales: 890,
  },
  {
    id: "shay-wad-draa",
    name: "شاي واد درعة",
    description: "شاي واد درعة الاقتصادي والجيد.",
    image: "https://picsum.photos/seed/tea-12/800/1000",
    category: "شاي",
    options: [
      { label: "100g", price: 5.0 },
      { label: "200g", price: 12.0 },
      { label: "500g", price: 25.0 },
      { label: "1kg", price: 45.0 },
      { label: "2kg", price: 75.0 },
    ],
    sales: 2100,
  },

  // --- PERFUMES (ATOUR) ---
  {
    id: "perfume-luxury-ahlam",
    name: "عطور فاخرة (أحلام/فرح/همسة)",
    description: "مجموعة من أرقى العطور الفاخرة التي تدوم طويلاً.",
    image: "https://picsum.photos/seed/perfume-1/800/1000",
    category: "عطور",
    options: [
      { label: "قنينة فاخرة", price: 190.0 },
    ],
    sales: 240,
  },
  {
    id: "perfume-premium-titanium",
    name: "عطور مميزة (تيتانيوم/إيريس)",
    description: "عطور مميزة وجذابة لكل المناسبات.",
    image: "https://picsum.photos/seed/perfume-2/800/1000",
    category: "عطور",
    options: [
      { label: "قنينة مميزة", price: 150.0 },
    ],
    sales: 310,
  },
  {
    id: "perfume-1l-ramdor",
    name: "عطور 1 لتر (رامدور/كولد)",
    description: "عطور بحجم كبير واقتصادي وجودة عالية.",
    image: "https://picsum.photos/seed/perfume-3/800/1000",
    category: "عطور",
    options: [
      { label: "1 لتر", price: 150.0 },
    ],
    sales: 180,
  },

  // --- INCENSE (BUKHOUR) ---
  {
    id: "bukhour-banafa",
    name: "بخور بنافع الذهبي",
    description: "بخور بنافع الأصلي لرائحة زكية في منزلك.",
    image: "https://picsum.photos/seed/bukhour-1/800/1000",
    category: "بخور",
    options: [
      { label: "50 جرام", price: 130.0 },
    ],
    sales: 450,
  },
  {
    id: "bukhour-khanjar",
    name: "بخور الخنجر",
    description: "بخور الخنجر الشهير برائحته الفواحة.",
    image: "https://picsum.photos/seed/bukhour-2/800/1000",
    category: "بخور",
    options: [
      { label: "50 جرام", price: 70.0 },
    ],
    sales: 520,
  },
  {
    id: "oud-nafis",
    name: "عود النفيس الممتاز",
    description: "عود النفيس الأصلي لمحبي الروائح الشرقية.",
    image: "https://picsum.photos/seed/bukhour-3/800/1000",
    category: "بخور",
    options: [
      { label: "50 جرام", price: 70.0 },
    ],
    sales: 380,
  },

  // --- FASHION & MISC (KEEPING SOME FROM BEFORE) ---
  {
    id: "malhafa-sahrawia",
    name: "ملحفة صحراوية أصيلة",
    description: "تشكيلة متنوعة من الملاحف الصحراوية بألوان وأثواب رفيعة.",
    image: "https://picsum.photos/seed/malhafa-lux/800/1000",
    category: "أزياء",
    options: [
      { label: "قطعة عادية", price: 250.0 },
      { label: "قطعة ممتازة", price: 450.0 },
    ],
    sales: 320,
  },
  {
    id: "nila-sahrawia",
    name: "النيلة الصحراوية الزرقاء",
    description: "النيلة الحرة الأصلية، سر جمال المرأة الصحراوية.",
    image: "https://picsum.photos/seed/nila/800/1000",
    category: "منتجات متنوعة",
    options: [
      { label: "قطعة صغيرة", price: 30.0 },
      { label: "مسحوق 100g", price: 70.0 },
    ],
    sales: 420,
  },
];
