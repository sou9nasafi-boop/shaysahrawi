import { Home, ShoppingCart, MessageCircle, Search } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  whatsappNumber: string;
}

export function BottomNav({ 
  cartCount, 
  onCartClick, 
  onHomeClick, 
  onSearchClick,
  whatsappNumber 
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 px-6 md:hidden">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="flex h-20 w-full max-w-md items-center justify-around rounded-[2rem] bg-oasis/90 px-8 text-white shadow-[0_20px_50px_rgba(27,67,50,0.4)] backdrop-blur-xl border border-white/10"
      >
        <button 
          onClick={onHomeClick}
          className="flex flex-col items-center gap-1.5 transition-all hover:text-gold active:scale-90"
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">الرئيسية</span>
        </button>

        <button 
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1.5 transition-all hover:text-gold active:scale-90"
        >
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">بحث</span>
        </button>

        <button 
          onClick={onCartClick}
          className="relative flex flex-col items-center gap-1.5 transition-all hover:text-gold active:scale-90"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-black text-oasis shadow-lg">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest">السلة</span>
        </button>

        <a 
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1.5 transition-all hover:text-gold active:scale-90"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">واتساب</span>
        </a>
      </motion.div>
    </div>
  );
}
