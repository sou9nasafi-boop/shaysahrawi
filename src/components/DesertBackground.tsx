import { useState, useEffect } from "react";

export default function DesertBackground() {
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
          } as any}
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
  );
}
