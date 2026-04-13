import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import { PRODUCTS as INITIAL_PRODUCTS, CONTACT_INFO } from './constants';
import { Category, Product } from './types';
import { trackVisit, getProducts, addProduct, sendMessage } from './lib/firebase';
import { cn } from './lib/utils';

import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', content: '', city: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackVisit();
    // Simple way to handle /admin route without a router library
    if (window.location.hash === '#admin') {
      setIsAdminView(true);
    }
    
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    
    window.addEventListener('hashchange', handleHashChange);

    // Fetch products from Firestore in background
    const fetchProducts = async () => {
      try {
        // Only attempt fetch if we have a real config (handled in firebase.ts)
        const fetchedProducts = await getProducts();
        
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error loading products from Firestore:", error);
      }
    };

    fetchProducts();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendMessage(contactForm);
      setSendSuccess(true);
      setContactForm({ name: '', phone: '', content: '', city: '' });
      setTimeout(() => setSendSuccess(false), 5000);
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSending(false);
    }
  };

  if (isAdminView) {
    return <AdminDashboard />;
  }

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
                    <ProductCard 
                      product={product} 
                      onQuickView={(p) => setSelectedProduct(p)}
                    />
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

        {/* Testimonials Section */}
        <section className="py-24 md:py-40 bg-[#0A0A0A] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-[#C8973A] text-sm font-bold uppercase tracking-[0.3em] mb-4 block">ثقة زبائننا</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F0E8D8]">ماذا يقولون عنا</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "محمد العلمي",
                  role: "عاشق للشاي الأصيل",
                  content: "أفضل شاي صحراوي جربته على الإطلاق. النكهة قوية والأصالة حاضرة في كل رشفة. التوصيل كان سريعاً والتعامل احترافي جداً.",
                  rating: 5
                },
                {
                  name: "سارة بناني",
                  role: "زبونة دائمة",
                  content: "منتجات رائعة وجودة استثنائية. العلك (الصمغ العربي) نقي جداً ويضيف نكهة خاصة للشاي. أنصح الجميع بتجربته.",
                  rating: 5
                },
                {
                  name: "ياسين كنتاوي",
                  role: "متذوق شاي",
                  content: "تجربة فريدة من نوعها. الموقع سهل الاستخدام والطلب عبر واتساب مريح جداً. شاي 'خطاري' هو المفضل لدي الآن.",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-[#C8973A]/30 transition-all duration-500"
                >
                  <div className="flex gap-1 mb-6 text-[#C8973A]">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg text-[#F0E8D8]/60 font-light leading-relaxed mb-8 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#C8973A]/10 rounded-full flex items-center justify-center text-[#C8973A] font-serif font-bold text-xl">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="text-[#F0E8D8] font-bold">{testimonial.name}</div>
                      <div className="text-[#F0E8D8]/30 text-xs uppercase tracking-widest">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
                  <form onSubmit={handleSendMessage} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">الاسم الكامل</label>
                        <input 
                          required
                          type="text" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors" 
                          placeholder="أدخل اسمك هنا..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">المدينة</label>
                        <input 
                          type="text" 
                          value={contactForm.city}
                          onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors" 
                          placeholder="مثلاً: طنجة، الدار البيضاء..." 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">رقم الهاتف</label>
                      <input 
                        required
                        type="tel" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors" 
                        placeholder="06XXXXXXXX" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mr-4">الرسالة</label>
                      <textarea 
                        required
                        rows={4} 
                        value={contactForm.content}
                        onChange={(e) => setContactForm({ ...contactForm, content: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors resize-none" 
                        placeholder="كيف يمكننا مساعدتك؟"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isSending}
                      className={cn(
                        "w-full luxury-button font-black text-sm shadow-xl transition-all",
                        sendSuccess ? "bg-green-500 text-white" : "bg-[#C8973A] text-black"
                      )}
                    >
                      {isSending ? 'جاري الإرسال...' : sendSuccess ? 'تم الإرسال بنجاح!' : 'إرسال الرسالة'}
                    </button>
                    {sendSuccess && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-green-500 text-xs font-bold"
                      >
                        شكراً لتواصلك معنا! سنتصل بك في أقرب وقت.
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <QuickViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
