import React, { useState, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import { PRODUCTS, CONTACT_INFO } from './constants';
import { Category } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0E8D8] font-sans selection:bg-[#C8973A] selection:text-black overflow-x-hidden" dir="rtl">
      <Navbar />
      
      <main className="pt-20">
        <Hero />

        {/* Catalog Section */}
        <section id="catalog" className="py-16 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
            >
              <div className="text-right">
                <span className="text-[#C8973A] text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-3 md:mb-4 block">مجموعتنا المختارة</span>
                <h2 className="text-3xl md:text-6xl font-serif font-bold text-[#F0E8D8] mb-4">كتالوج المنتجات</h2>
                <p className="text-[#F0E8D8]/50 max-w-xl text-base md:text-lg font-light leading-relaxed">
                  تصفح مجموعتنا الفاخرة من أجود أنواع الشاي والمنتجات الصحراوية الأصيلة.
                </p>
              </div>

              <div className="hidden md:flex gap-4">
                <button 
                  onClick={() => scroll('right')}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-[#F0E8D8] hover:bg-[#C8973A] hover:text-black hover:border-[#C8973A] transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => scroll('left')}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-[#F0E8D8] hover:bg-[#C8973A] hover:text-black hover:border-[#C8973A] transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>

          <div className="relative group">
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-[calc((100vw-1280px)/2+32px)] pb-8 md:pb-12"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[380px]"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile Gradient Fade */}
            <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none md:hidden" />
            <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none md:hidden" />
          </div>

          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 text-[#F0E8D8]/20 text-xl font-light italic"
            >
              لا توجد منتجات في هذه الفئة حالياً.
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-40 bg-[#0A0A0A] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              {/* Content side */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <span className="text-[#C8973A] text-sm font-bold uppercase tracking-[0.3em] mb-6 block">قصتنا وأصالتنا</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F0E8D8] mb-8 leading-tight">
                  نحمل إليكم <span className="text-[#C8973A] italic">روح الصحراء</span> في كل منتج
                </h2>
                <div className="space-y-6 text-lg text-[#F0E8D8]/60 font-light leading-relaxed">
                  <p>
                    بدأت رحلتنا من شغف عميق بالتراث الصحراوي المغربي، حيث يعتبر الشاي أكثر من مجرد مشروب؛ إنه رمز للكرم، الضيافة، واللحظات التي لا تنسى.
                  </p>
                  <p>
                    نحن في "الشاي الصحراوي الممتاز" نلتزم بتقديم أجود أنواع الشاي والمنتجات التقليدية التي تعكس أصالة الصحراء. كل منتج في متجرنا يتم اختياره بعناية فائقة لضمان أعلى مستويات الجودة والمذاق الأصيل.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-16">
                  <div className="flex flex-col gap-3">
                    <div className="text-4xl font-serif font-bold text-[#C8973A]">100%</div>
                    <div className="text-xs uppercase tracking-widest font-black text-[#F0E8D8]/40">منتجات طبيعية</div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-4xl font-serif font-bold text-[#C8973A]">24/7</div>
                    <div className="text-xs uppercase tracking-widest font-black text-[#F0E8D8]/40">دعم متواصل</div>
                  </div>
                </div>
              </motion.div>

              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800" 
                    alt="Desert Culture" 
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-10 -right-10 bg-[#C8973A] text-black p-10 rounded-[2.5rem] shadow-2xl hidden md:block"
                >
                  <div className="text-5xl font-serif font-bold mb-1">20+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70">سنة من الخبرة والأصالة</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-[#0A0A0A] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#111] rounded-[3rem] p-8 md:p-20 border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[#C8973A] text-sm font-bold uppercase tracking-[0.3em] mb-6 block">تواصل معنا</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F0E8D8] mb-8 leading-tight">
                    نحن هنا <span className="text-[#C8973A] italic">لخدمتكم</span> دائماً
                  </h2>
                  <p className="text-lg text-[#F0E8D8]/50 font-light mb-12 leading-relaxed">
                    هل لديك أي استفسار أو ترغب في طلب خاص؟ لا تتردد في التواصل معنا عبر أي من الوسائل التالية.
                  </p>

                  <div className="space-y-8">
                    <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8973A] group-hover:bg-[#C8973A] group-hover:text-black transition-all duration-300">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-1">اتصل بنا</div>
                        <div className="text-xl font-bold text-[#F0E8D8] group-hover:text-[#C8973A] transition-colors" dir="ltr">{CONTACT_INFO.phone}</div>
                      </div>
                    </a>
                    
                    <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8973A] group-hover:bg-[#C8973A] group-hover:text-black transition-all duration-300">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-1">واتساب</div>
                        <div className="text-xl font-bold text-[#F0E8D8] group-hover:text-[#C8973A] transition-colors">تواصل مباشر</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8973A]">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-1">الموقع</div>
                        <div className="text-xl font-bold text-[#F0E8D8]">{CONTACT_INFO.address}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner"
                >
                  <h3 className="text-2xl font-serif font-bold text-[#F0E8D8] mb-8">أرسل لنا رسالة</h3>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">الاسم الكامل</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors" placeholder="أدخل اسمك هنا..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">رقم الهاتف</label>
                      <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors" placeholder="06XXXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">الرسالة</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors resize-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                    </div>
                    <button className="w-full luxury-button bg-[#C8973A] text-black font-black text-sm shadow-xl">إرسال الرسالة</button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
