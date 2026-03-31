import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Star generation logic for React
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 2.5 + 1.5}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0E8D8] font-sans overflow-hidden" dir="rtl">
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-4"
          >
            {/* Background Night Theme */}
            <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#050508] to-[#0a0a0a] overflow-hidden">
              {/* Moon Glow */}
              <div className="absolute -top-[5%] -right-[5%] w-[60vw] h-[60vw] bg-radial-gradient from-[rgba(200,151,58,0.08)] to-transparent rounded-full blur-[60px]" />
              
              {/* Stars */}
              {stars.map((star) => (
                <div
                  key={star.id}
                  className="absolute bg-white rounded-full animate-twinkle"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    animationDuration: star.duration,
                    animationDelay: star.delay,
                  }}
                />
              ))}

              {/* Dunes */}
              <div 
                className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-[#1a140a] opacity-100 border-t-2 border-[rgba(200,151,58,0.2)]"
                style={{ clipPath: 'polygon(0% 85%, 15% 75%, 35% 90%, 55% 70%, 75% 85%, 100% 65%, 100% 100%, 0% 100%)' }}
              />
              <div 
                className="absolute bottom-0 left-0 w-full h-[22%] bg-gradient-to-t from-black to-[#0f0b05] opacity-100"
                style={{ clipPath: 'polygon(0% 95%, 25% 80%, 50% 95%, 80% 75%, 100% 90%, 100% 100%, 0% 100%)' }}
              />
            </div>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-8 flex flex-col items-center justify-center min-h-screen text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-[#C8973A]">مرحباً بكم في متجرنا</h2>
            <p className="text-lg text-[#A89878] max-w-md">
              هذه هي الصفحة الرئيسية للمتجر. يمكنك الآن تصفح أجود أنواع الشاي والمنتجات الصحراوية.
            </p>
            <button 
              onClick={() => setShowSplash(true)}
              className="mt-8 px-6 py-2 border border-[#C8973A] text-[#C8973A] hover:bg-[#B58631] hover:text-black hover:shadow-[0_-4px_10px_rgba(181,134,49,0.3)] transition-all"
            >
              العودة لصفحة البداية (Splash)
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-twinkle {
          animation: twinkle var(--duration, 2s) infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
