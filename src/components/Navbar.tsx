import React from 'react';
import { ShoppingCart, Menu, Phone } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#C8973A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="الشاي الصحراوي الممتاز" 
              className="h-12 w-auto"
              referrerPolicy="no-referrer"
            />
            <span className="hidden md:block text-[#C8973A] font-serif font-bold text-xl">الشاي الصحراوي الممتاز</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors">الرئيسية</a>
            <a href="#catalog" className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors">الكتالوج</a>
            <a href="#about" className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors">من نحن</a>
            <a href="#contact" className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors">اتصل بنا</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden sm:flex items-center gap-2 bg-[#C8973A] text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-[#E8C06A] transition-all"
            >
              <Phone size={16} />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <button className="text-[#F0E8D8] hover:text-[#C8973A] transition-colors relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[#C8973A] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="md:hidden text-[#F0E8D8]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
