import React, { useState } from 'react';
import { ShoppingCart, Menu, Phone, X } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'الكتالوج', href: '#catalog' },
    { name: 'من نحن', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className="absolute inset-0 bg-black/60 border-b border-white/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 flex items-center gap-2 md:gap-4 group cursor-pointer"
          >
            <div className="relative">
              <img 
                src={LOGO_URL} 
                alt="الشاي الصحراوي الممتاز" 
                className="h-10 sm:h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#C8973A] font-serif font-bold text-base sm:text-lg md:text-2xl tracking-tight">الشاي الصحراوي</span>
              <span className="text-[#F0E8D8]/60 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">الممتاز والأصيل</span>
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a 
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-[#F0E8D8]/80 hover:text-[#C8973A] transition-all duration-300 font-medium text-sm lg:text-base relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8973A] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <motion.a 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden lg:flex items-center gap-3 bg-[#C8973A] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#E8C06A] hover:shadow-[0_0_20px_rgba(200,151,58,0.4)] transition-all duration-300"
            >
              <Phone size={16} />
              <span dir="ltr" className="inline-block">{CONTACT_INFO.phone}</span>
            </motion.a>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-[#F0E8D8]/80 hover:text-[#C8973A] hover:bg-white/5 rounded-full transition-all duration-300 relative group">
                <ShoppingCart size={22} />
                <span className="absolute top-1 right-1 bg-[#C8973A] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">0</span>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 text-[#F0E8D8]/80 hover:text-[#C8973A] hover:bg-white/5 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-white/5 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-4 text-xl font-serif text-[#F0E8D8] hover:text-[#C8973A] hover:bg-white/5 rounded-2xl transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-6">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center justify-center gap-4 bg-[#C8973A] text-black w-full py-5 rounded-2xl font-bold text-lg shadow-xl"
                >
                  <Phone size={20} />
                  <span dir="ltr" className="inline-block">{CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
