import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=2000" 
          alt="Desert Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#C8973A] mb-6 drop-shadow-2xl">
            أصالة الصحراء في كل كاس
          </h1>
          <p className="text-xl md:text-2xl text-[#F0E8D8] mb-10 font-light leading-relaxed">
            نقدم لكم أجود أنواع الشاي الصحراوي، العطور الفواحة، والملحفة الأصيلة. 
            رحلة من قلب الصحراء إلى منزلك.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#catalog"
              className="bg-[#C8973A] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-[#E8C06A] transition-all transform hover:scale-105 shadow-xl"
            >
              تصفح الكتالوج
            </a>
            <a 
              href="#contact"
              className="bg-transparent border-2 border-[#C8973A] text-[#C8973A] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#C8973A]/10 transition-all"
            >
              تواصل معنا
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#C8973A]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#C8973A]/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C8973A]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
    </section>
  );
}
