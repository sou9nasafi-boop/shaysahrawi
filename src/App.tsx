import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { Category } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0E8D8] font-sans selection:bg-[#C8973A] selection:text-black" dir="rtl">
      <Navbar />
      
      <main>
        <Hero />

        {/* Catalog Section */}
        <section id="catalog" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C8973A] mb-4">كتالوج المنتجات</h2>
            <div className="w-24 h-1 bg-[#C8973A] mx-auto mb-8 rounded-full" />
            <p className="text-[#F0E8D8]/60 max-w-2xl mx-auto text-lg">
              اختر ما يناسبك من مجموعتنا المختارة بعناية من أجود أنواع الشاي، العطور الفاخرة، والملحفة الصحراوية الأصيلة.
            </p>
          </div>

          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-[#F0E8D8]/40">
              لا توجد منتجات في هذه الفئة حالياً.
            </div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-[#111] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C8973A]">حكايتنا من قلب الصحراء</h2>
                <p className="text-lg text-[#F0E8D8]/80 leading-relaxed">
                  بدأت رحلتنا من شغفنا بالتقاليد الصحراوية العريقة. نحن نؤمن أن الشاي ليس مجرد مشروب، بل هو رمز للكرم والضيافة. 
                  لذلك، نحرص على جلب أجود الأنواع التي ترضي ذوقكم الرفيع.
                </p>
                <p className="text-lg text-[#F0E8D8]/80 leading-relaxed">
                  كما نقدم لكم مجموعة من العطور التي تعبق برائحة الأصالة، والملحفة التي تعكس جمال وأناقة المرأة الصحراوية.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="border-l-2 border-[#C8973A] pr-4">
                    <div className="text-3xl font-bold text-[#C8973A]">100%</div>
                    <div className="text-sm text-[#F0E8D8]/60">منتجات طبيعية</div>
                  </div>
                  <div className="border-l-2 border-[#C8973A] pr-4">
                    <div className="text-3xl font-bold text-[#C8973A]">24/7</div>
                    <div className="text-sm text-[#F0E8D8]/60">دعم متواصل</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-[#C8973A]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1000" 
                    alt="Desert Culture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C8973A] rounded-2xl -z-10 opacity-20" />
                <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-[#C8973A] rounded-2xl -z-10 opacity-20" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
