import { motion } from "motion/react";

export default function SocialFooter() {
  const socialLinks = [
    { 
      label: "TikTok", 
      href: "https://tiktok.com/@shaysahrawi", 
      iconUrl: "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg"
    },
    { 
      label: "Instagram", 
      href: "https://instagram.com/shaysahrawi", 
      iconUrl: "https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
    },
    { 
      label: "WhatsApp", 
      href: "https://wa.me/212649682152", 
      iconUrl: "https://www.vectorlogo.zone/logos/whatsapp/whatsapp-icon.svg"
    },
    { 
      label: "Facebook", 
      href: "https://facebook.com/shaysahrawi", 
      iconUrl: "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg"
    },
  ];

  return (
    <footer className="w-full bg-black/60 backdrop-blur-xl border-t border-[#C8973A]/10 pt-16 pb-8 px-6 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-right">
        <div className="space-y-4">
          <h3 className="text-[#C8973A] font-serif text-xl font-bold border-b border-[#C8973A]/20 pb-2 inline-block">شكون حنا</h3>
          <p className="text-[#F0E8D8]/60 text-sm leading-relaxed">
            نحن متجر متخصص في جلب أجود أنواع الشاي والمنتجات الصحراوية الأصيلة مباشرة من قلب الصحراء المغربية إلى مدينة آسفي.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-[#C8973A] font-serif text-xl font-bold border-b border-[#C8973A]/20 pb-2 inline-block">تواصل معنا</h3>
          <div className="space-y-2 text-[#F0E8D8]/60 text-sm">
            <p>📞 الهاتف: 06 49 68 21 52</p>
            <p>📍 العنوان: مدينة آسفي، المغرب</p>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C8973A]/10 hover:border-[#C8973A]/30 transition-colors"
                aria-label={social.label}
              >
                <img 
                  src={social.iconUrl} 
                  alt={social.label}
                  className="w-5 h-5 object-contain"
                />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[#C8973A] font-serif text-xl font-bold border-b border-[#C8973A]/20 pb-2 inline-block">روابط سريعة</h3>
          <div className="flex flex-col gap-2 text-[#F0E8D8]/60 text-sm">
            <a href="#" className="hover:text-[#C8973A] transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-[#C8973A] transition-colors">الشاي</a>
            <a href="#" className="hover:text-[#C8973A] transition-colors">العطور</a>
            <a href="#" className="hover:text-[#C8973A] transition-colors">الباكات</a>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 text-center">
        <p className="text-[#F0E8D8]/20 text-[10px] tracking-[0.2em] uppercase">
          © 2026 الشاي الصحراوي الممتاز — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
