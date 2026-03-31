import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { BottomNav } from "../components/BottomNav";
import { CONTACT_INFO } from "../constants";
import { CartItem, Product, WeightOption } from "../types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, MapPin, Sparkles, ArrowRight, X, HelpCircle, ChevronDown } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MainLayout({ 
  children, 
  cart, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  searchQuery, 
  onSearchChange 
}: MainLayoutProps) {
  const [showPromo, setShowPromo] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-[60] bg-gold py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-oasis md:text-xs"
          >
            توصيل مجاني للطلبات أكثر من 500 درهم 🚚 ✨
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-oasis/50 hover:text-oasis"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        cart={cart}
        onRemoveFromCart={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <main>{children}</main>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-oasis p-8 md:p-16 text-center text-white shadow-2xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-sunset/10 blur-3xl" />
            
            <div className="relative z-10 mx-auto max-w-2xl">
              <Sparkles className="h-10 w-10 text-gold mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">انضم إلى عائلتنا</h2>
              <p className="text-white/70 text-sm md:text-lg mb-10 font-medium tracking-wide">
                اشترك في نشرتنا الإخبارية لتصلك آخر العروض والمنتجات الجديدة مباشرة على بريدك الإلكتروني.
              </p>
              
              <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني" 
                  className="flex-1 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
                <button className="rounded-full bg-gold px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-oasis transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg">
                  اشترك الآن
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-8 w-8 text-gold mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-oasis mb-2 italic tracking-tight">الأسئلة الشائعة</h2>
            <p className="text-oasis/60 text-sm font-medium">كل ما تحتاج معرفته عن منتجاتنا وخدماتنا</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "كيف يمكنني الطلب؟",
                a: "يمكنك الطلب مباشرة عبر الموقع بإضافة المنتجات للسلة ثم إرسال الطلب عبر الواتساب، أو التواصل معنا مباشرة عبر الرقم الموجود في الموقع."
              },
              {
                q: "كم يستغرق التوصيل؟",
                a: "يستغرق التوصيل عادة من 24 إلى 48 ساعة في المدن الكبرى، ومن 3 إلى 5 أيام لباقي المدن المغربية."
              },
              {
                q: "هل المنتجات أصلية؟",
                a: "نعم، جميع منتجاتنا أصلية 100% ومستوردة مباشرة من المصادر الموثوقة في الصحراء المغربية."
              },
              {
                q: "ما هي طرق الأداء المتاحة؟",
                a: "نوفر خدمة الدفع عند الاستلام (Cash on Delivery) لضمان ثقتكم وراحتكم."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-oasis/5 cursor-pointer transition-all hover:shadow-md">
                <summary className="flex items-center justify-between font-bold text-oasis list-none">
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 text-gold transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-oasis/70 leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-oasis/10 bg-white py-16 text-oasis">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="space-y-6">
              <div className="flex flex-col items-start leading-none">
                <img 
                  src="https://i.ibb.co/SXwfnwQd/Logo-de-the-du-de-sert-authentique.png" 
                  alt="الشاي الصحراوي الممتاز" 
                  className="h-16 w-auto object-contain mb-4"
                  referrerPolicy="no-referrer"
                />
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
        onCartClick={() => {}} // Handle in App.tsx
        onHomeClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchClick={handleSearchFocus}
        whatsappNumber={CONTACT_INFO.whatsapp}
      />

      {/* Floating Actions (Desktop) */}
      <div className="fixed bottom-8 right-8 z-50 hidden flex-col gap-4 md:flex">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-oasis shadow-xl transition-transform hover:scale-110 active:scale-95 border border-oasis/5"
            >
              <ArrowRight className="h-5 w-5 -rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <motion.a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/20"
        >
          <MessageCircle className="h-7 w-7" />
        </motion.a>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}
