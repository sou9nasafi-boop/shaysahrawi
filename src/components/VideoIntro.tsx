import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Reverting to Streamable as Jumpshare embedding is unreliable in this environment
  const videoUrl = "https://streamable.com/e/4qxwyr?autoplay=1&muted=1&nocontrols=1";

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800); // Wait for exit animation
  };

  useEffect(() => {
    // Auto-skip after 12 seconds as a fallback (typical intro length)
    const timer = setTimeout(() => {
      handleSkip();
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Full Screen Video Background */}
          <div className="absolute inset-0 z-0">
            <iframe
              src={videoUrl}
              frameBorder="0"
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              className="h-full w-full object-cover scale-[1.2]" // Scale to hide UI elements
              style={{ 
                pointerEvents: 'none',
              }}
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 w-full max-w-4xl">
            {/* Subtle Skip in top right */}
            <button 
              onClick={handleSkip}
              className="absolute top-0 right-4 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors md:right-0"
            >
              تخطي
            </button>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
              >
                تجربة أصيلة
              </motion.span>
              <h1 className="text-4xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
                الشاي الصحراوي <br />
                <span className="text-gold">الممتاز</span>
              </h1>
              <p className="mt-6 text-base font-medium text-white/70 md:text-xl max-w-xl mx-auto leading-relaxed">
                نأخذكم في رحلة عبر رمال الصحراء لنقدم لكم أجود أنواع الشاي الأصيل المختار بعناية فائقة
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleSkip}
                className="group relative h-16 rounded-full border-white/20 bg-white/10 px-16 font-bold text-white backdrop-blur-xl hover:bg-gold hover:text-oasis hover:border-gold transition-all duration-500 overflow-hidden text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  دخول المتجر
                  <SkipForward className="h-6 w-6 transition-transform group-hover:translate-x-[-4px]" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              </Button>

              {/* Progress bar below button */}
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 12, ease: "linear" }}
                  className="h-full w-full bg-gold origin-left"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
