import { useState, useEffect, useMemo, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { BottomNav } from "./components/BottomNav";
import { PRODUCTS, CONTACT_INFO } from "./constants";
import { CartItem, Product, WeightOption } from "./types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, MapPin, Sparkles, Search, Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const bestSellers = useMemo(() => {
    return [...PRODUCTS]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 3);
  }, []);

  const addToCart = (product: Product, option: WeightOption) => {
    const cartItemId = `${product.id}-${option.label}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          selectedOption: option,
          quantity: 1,
        },
      ];
    });
    toast.success(`تمت إضافة ${product.name} (${option.label}) إلى السلة`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleSearchFocus = () => {
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
      searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-sand-light font-sans antialiased pb-24" dir="rtl">
      <Navbar
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Horizontal Categories Scroll */}
        <div className="no-scrollbar -mx-4 mb-8 flex overflow-x-auto px-4 pb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                !selectedCategory
                  ? "bg-oasis text-white shadow-lg shadow-oasis/20"
                  : "bg-white text-oasis border border-oasis/10 hover:bg-oasis/5"
              }`}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  selectedCategory === category
                    ? "bg-oasis text-white shadow-lg shadow-oasis/20"
                    : "bg-white text-oasis border border-oasis/10 hover:bg-oasis/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        {!selectedCategory && !searchQuery && (
          <section className="relative mb-16 h-[70vh] w-full overflow-hidden rounded-[2rem] bg-oasis premium-shadow md:mb-32 md:h-[80vh] md:rounded-[3rem]">
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/seed/desert-tea/1920/1080?blur=2"
                className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                alt="Desert"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-oasis/20 via-transparent to-oasis" />
            </div>
            
            <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <span className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-gold-shimmer md:mb-6 md:text-xs md:tracking-[0.6em]">
                  تراث الأصالة المغربية
                </span>
                <h1 className="mb-6 text-4xl font-black leading-[1.1] text-white sm:text-5xl md:mb-8 md:text-8xl">
                  الشاي الصحراوي <br />
                  <span className="text-gold-shimmer">الممتاز</span>
                </h1>
                <p className="mb-8 text-sm font-medium leading-relaxed text-white/70 sm:text-base md:mb-12 md:text-xl">
                  نقدم لكم أجود أنواع الشاي الصحراوي والمنتجات التقليدية المختارة بعناية فائقة من قلب الصحراء المغربية.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                  <Button 
                    size="lg" 
                    className="h-14 w-full rounded-2xl bg-gold px-8 text-base font-black text-oasis shadow-2xl shadow-gold/20 transition-all hover:bg-gold-light hover:scale-105 active:scale-95 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                    onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    اكتشف مجموعتنا
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-14 w-full rounded-2xl border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-md hover:bg-white/10 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                  >
                    قصة علامتنا
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll Indicator - Hidden on very small screens */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10"
            >
              <div className="h-10 w-5 rounded-full border-2 border-white/20 p-1 md:h-12 md:w-6">
                <div className="h-1.5 w-full rounded-full bg-gold md:h-2" />
              </div>
            </motion.div>
          </section>
        )}

        {/* Best Sellers Section */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-16 md:mb-32">
            <div className="mb-10 flex flex-col items-center text-center md:mb-16">
              <span className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-sunset md:mb-4 md:tracking-[0.4em]">الإصدارات الخاصة</span>
              <h2 className="text-3xl font-black text-oasis md:text-6xl">الأكثر مبيعاً</h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gold md:mt-6 md:h-1.5 md:w-24" />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {bestSellers.map((product) => (
                <ProductCard
                  key={`best-${product.id}`}
                  product={product}
                  onAddToCart={addToCart}
                  isBestSeller
                />
              ))}
            </div>
          </section>
        )}

        {/* Brand Story Section */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-[2.5rem] premium-shadow"
            >
              <img 
                src="https://picsum.photos/seed/sahara-tea-story/1200/1200" 
                alt="Our Story" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oasis/60 to-transparent" />
              <div className="absolute bottom-8 right-8 text-white">
                <p className="text-3xl font-extrabold">من قلب الصحراء</p>
                <p className="text-gold-light font-medium">تقاليد تتوارثها الأجيال</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block rounded-full bg-oasis/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-oasis">
                قصتنا
              </div>
              <h2 className="text-4xl font-extrabold text-oasis leading-tight">
                أكثر من مجرد شاي، <br />
                <span className="text-sunset">إنها ثقافة وأسلوب حياة</span>
              </h2>
              <p className="text-lg text-oasis/70 leading-relaxed">
                في "الشاي الصحراوي الممتاز"، نؤمن أن الشاي هو قلب الضيافة الصحراوية. نحن نختار أجود أوراق الشاي بعناية فائقة، ونقدم لكم تشكيلة من المنتجات التقليدية التي تعكس أصالة وجمال الصحراء المغربية.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <p className="text-3xl font-extrabold text-oasis">100%</p>
                  <p className="text-sm font-bold text-oasis/50 uppercase tracking-wider">منتجات طبيعية</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-extrabold text-oasis">+5000</p>
                  <p className="text-sm font-bold text-oasis/50 uppercase tracking-wider">زبون سعيد</p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Testimonials Section */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-24 py-20 bg-oasis/5 rounded-[2.5rem] px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-oasis">ماذا يقول زبناؤنا</h2>
              <p className="mt-4 text-oasis/60">ثقتكم هي سر نجاحنا واستمرارنا</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "محمد العبدي", text: "أفضل شاي صحراوي جربته في حياتي، الجودة لا يعلى عليها والتوصيل سريع جداً.", city: "الدار البيضاء" },
                { name: "فاطمة الزهراء", text: "الملحفة التي اشتريتها رائعة جداً، الثوب ممتاز والألوان تماماً كما في الصور.", city: "الرباط" },
                { name: "ياسين بناني", text: "تعامل راقي ومنتجات أصلية. الناطة تذكرني بطفولتي في الصحراء. شكراً لكم.", city: "مراكش" }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl premium-shadow relative"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Sparkles key={i} className="h-4 w-4 text-gold" />)}
                  </div>
                  <p className="text-oasis/80 italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-oasis">{t.name}</p>
                    <p className="text-xs text-oasis/40">{t.city}</p>
                  </div>
                  <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-gold/10 rounded-full blur-xl" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Section Title for All Products */}
        <div id="products-grid" className="mb-12 flex items-center justify-between scroll-mt-24">
          <h2 className="text-2xl font-extrabold text-oasis">
            {selectedCategory || (searchQuery ? "نتائج البحث" : "جميع المنتجات")}
          </h2>
          <span className="text-xs font-bold text-sunset bg-sunset/10 px-3 py-1 rounded-full">
            {filteredProducts.length} منتج
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-oasis/5 p-6">
              <Search className="h-12 w-12 text-oasis/20" />
            </div>
            <p className="text-lg font-bold text-oasis">
              عذراً، لم نجد ما تبحث عنه.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-sm font-bold text-sunset underline underline-offset-4"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-oasis/10 bg-white py-16 text-oasis">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="space-y-6">
              <div className="flex flex-col items-start leading-none">
                <span className="text-3xl font-extrabold tracking-tighter text-oasis">الشاي الصحراوي</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sunset">الممتاز</span>
              </div>
              <p className="text-sm leading-relaxed text-oasis/60">
                نحن نفخر بتقديم أجود أنواع الشاي والمنتجات الصحراوية الأصيلة لزبنائنا الكرام، مع الحفاظ على التقاليد والجودة.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-sunset">تواصل معنا</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-oasis/5">
                    <Phone className="h-4 w-4 text-oasis" />
                  </div>
                  <span className="font-medium">{CONTACT_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-oasis/5">
                    <MessageCircle className="h-4 w-4 text-oasis" />
                  </div>
                  <span className="font-medium">واتساب: {CONTACT_INFO.phone}</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-oasis/5 mt-1">
                    <MapPin className="h-4 w-4 text-oasis" />
                  </div>
                  <span className="font-medium">{CONTACT_INFO.location}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-sunset">تابعنا</h4>
              <div className="flex gap-4">
                <a href={`https://www.tiktok.com/${CONTACT_INFO.tiktok}`} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-oasis text-white transition-transform hover:scale-110">
                  <span className="font-bold">T</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-oasis/5 pt-8 text-center text-xs font-bold text-oasis/30">
            © 2026 الشاي الصحراوي الممتاز. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      <BottomNav 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => {
          setSelectedCategory(null);
          setSearchQuery("");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchClick={handleSearchFocus}
        whatsappNumber={CONTACT_INFO.whatsapp}
      />

      <Toaster position="bottom-center" />
    </div>
  );
}
