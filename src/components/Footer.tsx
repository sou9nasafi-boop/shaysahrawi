import React from 'react';
import { Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, LOGO_URL } from '../constants';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-[#C8973A]/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <img 
              src={LOGO_URL} 
              alt="Logo" 
              className="h-16 w-auto"
              referrerPolicy="no-referrer"
            />
            <p className="text-[#F0E8D8]/60 leading-relaxed">
              نحن متجر متخصص في جلب أجود أنواع الشاي والمنتجات الصحراوية الأصيلة مباشرة من قلب الصحراء المغربية إلى مدينة آسفي.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${CONTACT_INFO.instagram}`} className="text-[#C8973A] hover:text-[#E8C06A] transition-colors">
                <Instagram size={24} />
              </a>
              <a href={`https://facebook.com/${CONTACT_INFO.facebook}`} className="text-[#C8973A] hover:text-[#E8C06A] transition-colors">
                <Facebook size={24} />
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-[#C8973A] hover:text-[#E8C06A] transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C8973A] font-serif font-bold text-xl mb-6">روابط سريعة</h3>
            <ul className="space-y-4 text-[#F0E8D8]/80">
              <li><a href="#home" className="hover:text-[#C8973A] transition-colors">الرئيسية</a></li>
              <li><a href="#catalog" className="hover:text-[#C8973A] transition-colors">الكتالوج</a></li>
              <li><a href="#about" className="hover:text-[#C8973A] transition-colors">من نحن</a></li>
              <li><a href="#contact" className="hover:text-[#C8973A] transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#C8973A] font-serif font-bold text-xl mb-6">تواصل معنا</h3>
            <ul className="space-y-4 text-[#F0E8D8]/80">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#C8973A]" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-[#C8973A]" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#C8973A]" />
                <span>متاحون 24/7 عبر واتساب</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 text-center text-[#F0E8D8]/40 text-sm">
          <p>© {new Date().getFullYear()} الشاي الصحراوي الممتاز. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
