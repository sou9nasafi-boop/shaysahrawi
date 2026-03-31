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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 md:hidden">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="flex h-16 w-full max-w-md items-center justify-around rounded-2xl bg-oasis/95 px-6 text-white shadow-2xl backdrop-blur-md border border-white/10"
      >
        <button 
          onClick={onHomeClick}
          className="flex flex-col items-center gap-1 transition-colors hover:text-sunset"
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">الرئيسية</span>
        </button>

        <button 
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1 transition-colors hover:text-sunset"
        >
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-medium">بحث</span>
        </button>

        <button 
          onClick={onCartClick}
          className="relative flex flex-col items-center gap-1 transition-colors hover:text-sunset"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sunset text-[10px] font-bold text-oasis">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">السلة</span>
        </button>

        <a 
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 transition-colors hover:text-sunset"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-[10px] font-medium">واتساب</span>
        </a>
      </motion.div>
    </div>
  );
}
