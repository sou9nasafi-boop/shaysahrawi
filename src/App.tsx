import { useState, useEffect, useMemo, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { BottomNav } from "./components/BottomNav";
import { PRODUCTS, CONTACT_INFO } from "./constants";
import { CartItem, Product, WeightOption } from "./types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, MapPin, Sparkles, Search } from "lucide-react";

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
          <section className="relative mb-12 overflow-hidden rounded-3xl bg-oasis px-8 py-16 text-white">
            <div className="relative z-10 max-w-2xl text-right">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 text-sunset"
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-widest">مجموعة رمضان 2026</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-extrabold tracking-tight md:text-6xl"
              >
                اكتشف سحر <span className="text-sunset">الصحراء</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-neutral-200"
              >
                أجود أنواع الشاي والمنتجات التقليدية المختارة بعناية لتناسب ذوقكم الرفيع.
              </motion.p>
            </div>
            {/* Decorative background element */}
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sunset/10 blur-3xl" />
            <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-dune/10 blur-3xl" />
          </section>
        )}

        {/* Best Sellers Section */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-oasis">الأكثر مبيعاً</h2>
                <p className="mt-1 text-xs text-dune font-medium">المنتجات التي نالت إعجاب الجميع</p>
              </div>
              <div className="h-[2px] flex-1 bg-sunset/10 mx-6 rounded-full hidden md:block" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Section Title for All Products */}
        <div className="mb-8 flex items-center justify-between">
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
        onSearchClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Focus search input if possible
        }}
        whatsappNumber={CONTACT_INFO.whatsapp}
      />

      <Toaster position="bottom-center" />
    </div>
  );
}
