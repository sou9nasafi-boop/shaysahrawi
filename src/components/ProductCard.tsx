import { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, WeightOption } from "../types";
import { CONTACT_INFO } from "../constants";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, option: WeightOption) => void;
  isBestSeller?: boolean;
  key?: string | number;
}

export function ProductCard({ product, onAddToCart, isBestSeller }: ProductCardProps) {
  const [selectedOption, setSelectedOption] = useState<WeightOption>(product.options[0]);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 8) + 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal < 2 ? 2 : newVal > 15 ? 15 : newVal;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppOrder = () => {
    const message = `السلام عليكم، أريد طلب ${product.name} بوزن ${selectedOption.label}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white premium-shadow transition-all hover:-translate-y-1 border border-oasis/5"
      dir="rtl"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oasis/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Best Seller Badge */}
        {isBestSeller && (
          <div className="absolute right-4 top-4 z-10">
            <div className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-oasis shadow-lg">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-oasis" />
              الأكثر مبيعاً
            </div>
          </div>
        )}

        {/* Live Viewers Badge */}
        <div className="absolute left-4 top-4 z-10">
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-oasis shadow-sm border border-oasis/5">
            <Eye className="h-3 w-3 text-gold" />
            <span>{viewers} يشاهدون الآن</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sunset">
            {product.category}
          </span>
          {product.sales && product.sales > 500 && (
            <span className="text-[10px] font-bold text-oasis/40">
              +{product.sales} طلب
            </span>
          )}
        </div>
        
        <h3 className="mb-2 text-lg font-extrabold text-oasis leading-tight group-hover:text-sunset transition-colors">
          {product.name}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-oasis/60">
          {product.description}
        </p>

        {/* Options Selection */}
        <div className="mb-6">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {product.options.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedOption(option)}
                className={`flex-shrink-0 rounded-xl px-4 py-2 text-[10px] font-bold transition-all ${
                  selectedOption.label === option.label
                    ? "bg-oasis text-white shadow-md"
                    : "bg-oasis/5 text-oasis hover:bg-oasis/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-oasis/40">السعر</span>
            <span className="text-xl font-black text-oasis">
              {selectedOption.price} <span className="text-xs font-bold">درهم</span>
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => onAddToCart(product, selectedOption)}
              size="icon"
              className="h-12 w-12 rounded-2xl bg-oasis/5 text-oasis hover:bg-oasis hover:text-white transition-all shadow-sm"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={handleWhatsAppOrder}
              className="h-12 rounded-2xl bg-gold px-6 font-bold text-oasis shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:scale-105 active:scale-95"
            >
              اطلب الآن
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
