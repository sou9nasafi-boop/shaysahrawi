import { ShoppingCart, Search, Menu, Phone, MessageCircle } from "lucide-react";
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
    <nav className="sticky top-0 z-50 w-full border-b border-oasis/10 bg-sand-light/80 backdrop-blur-md" dir="rtl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <a href="/" className="flex flex-col items-start leading-none">
            <span className="text-xl font-extrabold tracking-tighter text-oasis">الشاي الصحراوي</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sunset">الممتاز</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 md:px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oasis/40" />
            <Input
              type="search"
              placeholder="بحث عن منتج..."
              className="h-10 w-full rounded-full border-oasis/10 bg-white pr-10 text-right focus-visible:ring-sunset"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 text-oasis hover:bg-oasis/5">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sunset text-[10px] font-bold text-oasis">
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
