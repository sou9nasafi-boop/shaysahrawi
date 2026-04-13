import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import { PRODUCTS, CONTACT_INFO } from './constants';
import { Category } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0E8D8] font-sans selection:bg-[#C8973A] selection:text-black overflow-x-hidden" dir="rtl">
      <Navbar />
      
      <main className="pt-20">
        <Hero />

        {/* Catalog Section */}
        <section id="catalog" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#C8973A] text-sm font-bold uppercase tracking-[0.3em] mb-4 block">مجموعتنا المختارة</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F0E8D8] mb-6">كتالوج المنتجات</h2>
            <p className="text-[#F0E8D8]/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              اختر ما يناسبك من مجموعتنا المختارة بعناية من أجود أنواع الشاي، العطور الفاخرة، والمنتجات الصحراوية الأصيلة.
            </p>
          </motion.div>

          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

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
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
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
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800" 
                    alt="Desert Culture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-10 -right-10 bg-[#C8973A] text-black p-10 rounded-[2.5rem] shadow-2xl hidden md:block"
                >
                  <div className="text-5xl font-serif font-bold mb-1">20+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70">سنة من الخبرة والأصالة</div>
                </motion.div>

                <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#C8973A]/10 rounded-full blur-[100px] animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-[#0A0A0A] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#111] rounded-[3rem] p-8 md:p-20 border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8973A]/5 rounded-full blur-[120px]" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
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
                </div>

                <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner">
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
