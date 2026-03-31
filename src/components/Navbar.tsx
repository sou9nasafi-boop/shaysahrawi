import { ShoppingCart, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { CartItem } from "../types";
import { CONTACT_INFO } from "../constants";
import { Link } from "react-router-dom";

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
    <nav className="sticky top-0 z-50 w-full border-b border-gold/15 bg-dark/95 backdrop-blur-md" dir="rtl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <img 
              src="https://i.ibb.co/SXwfnwQd/Logo-de-the-du-de-sert-authentique.png" 
              alt="الشاي الصحراوي الممتاز" 
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/products" className="text-sm font-medium text-text-muted hover:text-gold transition-colors">كل المنتجات</Link>
          <Link to="/products?cat=chai" className="text-sm font-medium text-text-muted hover:text-gold transition-colors">الشاي</Link>
          <Link to="/products?cat=attar" className="text-sm font-medium text-text-muted hover:text-gold transition-colors">العطور</Link>
          <Link to="/products?cat=bakhour" className="text-sm font-medium text-text-muted hover:text-gold transition-colors">البخور</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search (Icon only on mobile) */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/40" />
            <Input
              id="main-search"
              type="search"
              placeholder="ابحث..."
              className="h-10 w-full rounded-full border-gold/10 bg-white/5 pr-10 text-right text-xs text-text-premium placeholder:text-text-muted focus-visible:ring-gold transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-all">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-black text-dark shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            } />
            <CartDrawer 
              cart={cart} 
              onRemove={onRemoveFromCart} 
              onUpdateQuantity={onUpdateQuantity} 
            />
          </Sheet>

          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
            target="_blank" 
            className="hidden sm:flex items-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white px-4 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            <span>اطلب الآن</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
