import { ShoppingCart, Search, Menu, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { CartItem } from "../types";
import { CONTACT_INFO } from "../constants";

interface NavbarProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({ cart, onRemoveFromCart, onUpdateQuantity, searchQuery, onSearchChange }: NavbarProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-oasis/5 bg-sand-light/60 backdrop-blur-xl" dir="rtl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-oasis text-gold transition-transform group-hover:rotate-12">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-oasis">الشاي الصحراوي</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sunset">الممتاز</span>
            </div>
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center px-4 md:px-12">
          <div className="relative w-full max-w-lg">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oasis/30 md:right-4" />
            <Input
              id="main-search"
              type="search"
              placeholder="ابحث..."
              className="h-10 w-full rounded-xl border-oasis/5 bg-white/50 pr-10 text-right text-xs focus-visible:ring-gold transition-all focus:bg-white md:h-12 md:rounded-2xl md:pr-12 md:text-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-6 md:flex ml-6">
            <a href="#products-grid" className="text-sm font-bold text-oasis/60 hover:text-oasis transition-colors">المنتجات</a>
            <a href="#" className="text-sm font-bold text-oasis/60 hover:text-oasis transition-colors">قصتنا</a>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-oasis/5 text-oasis hover:bg-oasis hover:text-white transition-all md:h-12 md:w-12 md:rounded-2xl">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                {cartCount > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-black text-oasis shadow-lg md:h-5 md:w-5 md:text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <CartDrawer 
              cart={cart} 
              onRemove={onRemoveFromCart} 
              onUpdateQuantity={onUpdateQuantity} 
            />
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
