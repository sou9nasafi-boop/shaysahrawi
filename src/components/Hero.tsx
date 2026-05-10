import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0A0A] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1200" 
          alt="Desert Background" 
          className="w-full h-full object-cover"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ delay: 0.2, duration: 1 }}
            className="inline-block text-[#C8973A] text-xs md:text-sm font-bold uppercase mb-6"
          >
            تراث الأصالة في كل رشفة
          </motion.span>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-[#F0E8D8] mb-8 leading-tight">
            عالم <span className="text-[#C8973A] italic">الشاي</span> الصحراوي
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-[#F0E8D8]/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            نقدم لكم أجود أنواع الشاي والمنتجات الصحراوية المختارة بعناية من قلب الصحراء المغربية، لتصلكم أينما كنتم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#catalog"
              className="luxury-button bg-[#C8973A] text-black w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(200,151,58,0.3)]"
            >
              <span>اكتشف الكتالوج</span>
              <ArrowRight size={20} />
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              className="luxury-button bg-white/5 text-[#F0E8D8] border border-white/10 w-full sm:w-auto flex items-center justify-center gap-3 hover:bg-white/10"
            >
              <MessageCircle size={20} />
              <span>اطلب عبر واتساب</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[#F0E8D8]/40 text-[10px] uppercase tracking-[0.3em] font-medium">اسحب للأسفل</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C8973A] to-transparent" />
      </motion.div>
    </section>
  );
}
