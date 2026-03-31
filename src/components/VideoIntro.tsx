import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Vimeo embed link for 1178674998
  const videoId = "1178674998";
  // Set muted=0 to attempt sound, but note that browsers often block autoplay with sound
  // We remove background=1 to allow audio, but hide other UI elements
  const videoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${isMuted ? 1 : 0}&loop=1&autopause=0&quality=1080p&title=0&byline=0&portrait=0&controls=0`;

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 600);
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkip();
    }, 12000); // Slightly longer to enjoy the sound

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden cursor-pointer"
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
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          </div>

          {/* Controls Overlay */}
          <div className="absolute top-8 right-8 z-20 flex items-center gap-6 md:top-12 md:right-12">
            {/* Volume Toggle */}
            <button
              onClick={toggleMute}
              className="group flex items-center gap-3 text-white/60 transition-all hover:text-white"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 transition-all group-hover:opacity-100">
                {isMuted ? "تشغيل الصوت" : "كتم الصوت"}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all group-hover:bg-white/10">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </div>
            </button>

            {/* Skip Button */}
            <button 
              onClick={handleSkip}
              className="group flex items-center gap-3 text-white/60 transition-all hover:text-white"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 transition-all group-hover:opacity-100">
                تخطي
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all group-hover:bg-white/10">
                <SkipForward className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-6 w-full max-w-4xl text-white pointer-events-none">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gold text-[11px] font-bold uppercase tracking-[0.5em] mb-4 block"
              >
                الأصالة الصحراوية
              </motion.span>
              <h1 className="text-5xl font-black tracking-tighter md:text-8xl lg:text-9xl drop-shadow-2xl">
                شاي <span className="text-gold">الصحراء</span>
              </h1>
              <p className="mt-6 text-sm font-medium text-white/70 md:text-xl max-w-xl mx-auto leading-relaxed drop-shadow-lg">
                نكهة عريقة تأخذك إلى قلب الرمال الذهبية
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="pointer-events-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSkip}
                  className="group relative h-16 rounded-full border-white/20 bg-white/5 px-16 font-bold text-white backdrop-blur-md hover:bg-gold hover:text-oasis hover:border-gold transition-all duration-500 overflow-hidden text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    دخول المتجر
                    <SkipForward className="h-6 w-6 transition-transform group-hover:translate-x-[-4px]" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
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
