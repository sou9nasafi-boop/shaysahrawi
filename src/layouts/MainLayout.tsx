import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { BottomNav } from "../components/BottomNav";
import { CONTACT_INFO } from "../constants";
import { CartItem } from "../types";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ArrowRight, X } from "lucide-react";

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
    <div className="min-h-screen bg-dark font-sans antialiased pb-24" dir="rtl">
      {/* Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-[60] bg-gold py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-dark md:text-xs"
          >
            توصيل مجاني للطلبات أكثر من 500 درهم 🚚 ✨
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/50 hover:text-dark"
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

      <main className="text-text-premium">{children}</main>

      {/* CTA Bar from Snippet */}
      <div className="bg-dark-3 border-y border-gold/15 py-16 px-6 text-center mt-20">
        <h2 className="font-serif text-3xl md:text-4xl text-text-premium mb-4">جاهز تطلب؟</h2>
        <p className="text-text-muted mb-10 font-serif italic text-lg">راسلنا على واتساب وسنرد بسرعة: {CONTACT_INFO.phone}</p>
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
          target="_blank" 
          className="inline-flex items-center gap-4 bg-whatsapp text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-whatsapp/30"
        >
          <MessageCircle className="h-6 w-6" />
          <span>تواصل على واتساب</span>
        </a>
      </div>

      <footer className="bg-dark py-16 px-6 text-center border-t border-gold/10">
        <span className="font-serif text-2xl text-gold block mb-4">الشاي الصحراوي الممتاز</span>
        <p className="text-text-muted text-sm mb-8">أجود الشاي والمنتجات الصحراوية</p>
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="text-text-muted hover:text-gold transition-colors">📱 {CONTACT_INFO.phone}</a>
          <a href={`https://tiktok.com/@${CONTACT_INFO.tiktok}`} target="_blank" className="text-text-muted hover:text-gold transition-colors">🎵 @{CONTACT_INFO.tiktok}</a>
          <span className="text-text-muted">📍 {CONTACT_INFO.location}</span>
        </div>
        <p className="mt-12 text-[10px] font-bold text-dark-4 uppercase tracking-widest">
          © 2026 الشاي الصحراوي الممتاز. جميع الحقوق محفوظة.
        </p>
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-2 text-gold shadow-xl transition-transform hover:scale-110 active:scale-95 border border-gold/10"
            >
              <ArrowRight className="h-5 w-5 -rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}
