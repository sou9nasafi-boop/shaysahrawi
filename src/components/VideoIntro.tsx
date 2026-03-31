import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, SkipForward, Sparkles } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Vimeo embed link for 1178674998
  const videoId = "1178674998";
  const videoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${isMuted ? 1 : 0}&loop=1&autopause=0&quality=1080p&title=0&byline=0&portrait=0&controls=0`;

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800);
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark overflow-hidden cursor-pointer"
          onClick={handleSkip}
        >
          {/* Full Screen Video Background */}
          <div className="absolute inset-0 z-0 bg-black">
            <div className="relative h-full w-full overflow-hidden">
              <iframe
                src={videoUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute inset-0 h-full w-full object-cover scale-[1.25] md:scale-[1.15]"
                style={{ 
                  pointerEvents: 'none',
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100vh',
                  minWidth: '177.77vh',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.25)',
                }}
                title="Intro Video"
              />
            </div>
            <div className="absolute inset-0 bg-dark/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80" />
          </div>

          {/* Controls Overlay */}
          <div className="absolute top-8 right-8 z-20 flex items-center gap-6 md:top-12 md:right-12">
            <button
              onClick={toggleMute}
              className="group flex items-center gap-3 text-text-premium/60 transition-all hover:text-gold"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 transition-all group-hover:opacity-100">
                {isMuted ? "تشغيل الصوت" : "كتم الصوت"}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-dark/40 backdrop-blur-md transition-all group-hover:bg-gold group-hover:text-dark">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </div>
            </button>

            <button 
              onClick={handleSkip}
              className="group flex items-center gap-3 text-text-premium/60 transition-all hover:text-gold"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 transition-all group-hover:opacity-100">
                تخطي
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-dark/40 backdrop-blur-md transition-all group-hover:bg-gold group-hover:text-dark">
                <SkipForward className="h-5 w-5" />
              </div>
            </button>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 w-full max-w-4xl pointer-events-none">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                src="https://i.ibb.co/SXwfnwQd/Logo-de-the-du-de-sert-authentique.png" 
                alt="Logo" 
                className="w-48 md:w-64 mx-auto mb-10 drop-shadow-[0_0_50px_rgba(200,151,58,0.4)]"
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                <span className="text-gold text-[12px] font-bold uppercase tracking-[0.6em] block">
                  ✦ الأصالة الصحراوية ✦
                </span>
                <h1 className="font-serif text-5xl md:text-8xl text-text-premium drop-shadow-2xl">
                  شاي <span className="text-gold">الصحراء</span>
                </h1>
                <p className="text-text-muted font-serif italic text-lg md:text-2xl max-w-xl mx-auto leading-relaxed drop-shadow-lg">
                  نكهة عريقة تأخذك إلى قلب الرمال الذهبية
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="pointer-events-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSkip}
                  className="group relative h-20 rounded-full border-gold/30 bg-dark/40 px-20 font-bold text-gold backdrop-blur-md hover:bg-gold hover:text-dark hover:border-gold transition-all duration-500 overflow-hidden text-xl"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    دخول المتجر
                    <Sparkles className="h-6 w-6" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="w-48 h-[2px] bg-gold/10 rounded-full overflow-hidden">
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
