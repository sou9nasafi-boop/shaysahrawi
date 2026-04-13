import React from 'react';
import { Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, LOGO_URL } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img 
                src={LOGO_URL} 
                alt="الشاي الصحراوي الممتاز" 
                className="h-14 w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-[#C8973A] font-serif font-bold text-2xl tracking-tight">الشاي الصحراوي</span>
                <span className="text-[#F0E8D8]/40 text-[10px] uppercase tracking-[0.2em] font-medium">الممتاز والأصيل</span>
              </div>
            </div>
            <p className="text-[#F0E8D8]/50 font-light leading-relaxed">
              نحن فخورون بتقديم أجود أنواع الشاي والمنتجات الصحراوية التي تعكس تراثنا العريق وأصالتنا المغربية.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Facebook size={20} />, href: `https://facebook.com/${CONTACT_INFO.facebook}` },
                { icon: <Instagram size={20} />, href: `https://instagram.com/${CONTACT_INFO.instagram}` },
                { icon: <MessageCircle size={20} />, href: `https://wa.me/${CONTACT_INFO.whatsapp}` },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#F0E8D8]/60 hover:bg-[#C8973A] hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F0E8D8] font-bold mb-8 uppercase tracking-widest text-sm">روابط سريعة</h4>
            <ul className="space-y-4">
              {['الرئيسية', 'الكتالوج', 'من نحن', 'اتصل بنا'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'الرئيسية' ? 'home' : item === 'الكتالوج' ? 'catalog' : item === 'من نحن' ? 'about' : 'contact'}`} className="text-[#F0E8D8]/50 hover:text-[#C8973A] transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#F0E8D8] font-bold mb-8 uppercase tracking-widest text-sm">التصنيفات</h4>
            <ul className="space-y-4">
              {['الشاي الصحراوي', 'العطور الفاخرة', 'الملحفة الصحراوية', 'الصمغ العربي'].map((item) => (
                <li key={item}>
                  <a href="#catalog" className="text-[#F0E8D8]/50 hover:text-[#C8973A] transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#F0E8D8] font-bold mb-8 uppercase tracking-widest text-sm">النشرة الإخبارية</h4>
            <p className="text-[#F0E8D8]/50 font-light mb-6 text-sm">اشترك لتصلك أحدث العروض والمنتجات الجديدة.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors"
              />
              <button className="absolute left-1 top-1 bottom-1 bg-[#C8973A] text-black px-4 rounded-lg font-bold text-xs hover:bg-[#E8C06A] transition-colors">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#F0E8D8]/30 text-xs font-light">
            © {new Date().getFullYear()} الشاي الصحراوي الممتاز. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[#F0E8D8]/30 text-xs hover:text-[#C8973A] transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-[#F0E8D8]/30 text-xs hover:text-[#C8973A] transition-colors">شروط الخدمة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
