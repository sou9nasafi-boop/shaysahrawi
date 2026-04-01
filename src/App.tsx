import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DesertBackground from "./components/DesertBackground";
import SocialBar from "./components/SocialBar";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0E8D8] font-sans overflow-hidden relative" dir="rtl">
      <DesertBackground />
      <SocialBar />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-6"
            >
              <img 
                src="https://i.ibb.co/SXwfnwQd/Logo-de-the-du-de-sert-authentique.png" 
                alt="الشاي الصحراوي الممتاز" 
                className="w-[min(280px,60vw)] h-auto drop-shadow-[0_0_15px_rgba(200,151,58,0.4)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-radial-gradient from-[rgba(200,151,58,0.2)] to-transparent rounded-full z-[-1] blur-xl" />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-5 max-w-[90%]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#C8973A] font-bold drop-shadow-[0_2px_10px_rgba(200,151,58,0.3)]"
              >
                الشاي الصحراوي الممتاز
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[#C8973A] text-xl tracking-[0.2rem] my-2"
              >
                ✦──────────✦
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-serif italic text-[clamp(1.2rem,3vw,2rem)] text-[#F0E8D8]"
              >
                "كل كاس حكاية — وحكايتنا من الصحراء"
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="font-serif italic text-[clamp(0.85rem,2vw,1.1rem)] text-[#C8973A]"
              >
                "أتاي ن الصحرا — اللي شربو ما ينساه"
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                whileHover={{ y: -3, scale: 1.05, background: 'linear-gradient(135deg, #E8C06A 0%, #C8973A 100%)', boxShadow: '0 12px 25px rgba(200, 151, 58, 0.3)' }}
                onClick={() => setShowSplash(false)}
                className="mt-4 bg-gradient-to-br from-[#C8973A] to-[#8B5E1A] text-black font-bold text-lg py-3.5 px-14 rounded border border-white/10 shadow-2xl self-center transition-all duration-300"
              >
                ابدأ الرحلة
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.section
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-8 flex flex-col items-center justify-center min-h-screen text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-[#C8973A]/20 shadow-2xl max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#C8973A] drop-shadow-[0_2px_10px_rgba(200,151,58,0.3)]">
                مرحباً بكم في عالم الشاي الصحراوي
              </h2>
              <p className="text-xl text-[#F0E8D8] mb-8 leading-relaxed">
                هذه هي بوابتكم لتجربة أجود أنواع الشاي والمنتجات الصحراوية الأصيلة. 
                نحن نأخذكم في رحلة عبر الرمال لنقدم لكم نكهة لا تُنسى.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  className="px-8 py-3 bg-[#C8973A] text-black font-bold rounded hover:bg-[#E8C06A] transition-colors shadow-lg"
                >
                  تصفح المنتجات
                </button>
                <button 
                  onClick={() => setShowSplash(true)}
                  className="px-8 py-3 border border-[#C8973A] text-[#C8973A] font-bold rounded hover:bg-[#C8973A]/10 transition-all"
                >
                  العودة للبداية
                </button>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
