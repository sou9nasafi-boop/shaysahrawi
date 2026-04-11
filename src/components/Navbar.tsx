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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#C8973A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="الشاي الصحراوي الممتاز" 
              className="h-10 md:h-12 w-auto"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:block text-[#C8973A] font-serif font-bold text-lg md:text-xl">الشاي الصحراوي الممتاز</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden lg:flex items-center gap-2 bg-[#C8973A] text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-[#E8C06A] transition-all"
            >
              <Phone size={16} />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <button className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[#C8973A] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#F0E8D8] p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#C8973A]/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-lg text-[#F0E8D8] hover:text-[#C8973A] hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-4">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center justify-center gap-3 bg-[#C8973A] text-black w-full py-4 rounded-xl font-bold text-lg"
                >
                  <Phone size={20} />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
