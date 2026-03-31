import { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, Eye, MessageCircle } from "lucide-react";
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
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-dark-2 border border-gold/10 transition-all hover:border-gold/30 hover:-translate-y-1"
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
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        
        {/* Best Seller Badge */}
        {isBestSeller && (
          <div className="absolute right-4 top-4 z-10">
            <div className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-dark shadow-lg">
              <Sparkles className="h-3 w-3" />
              الأكثر مبيعاً
            </div>
          </div>
        )}

        {/* Live Viewers Badge */}
        <div className="absolute left-4 top-4 z-10">
          <div className="flex items-center gap-1.5 rounded-full bg-dark/60 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-text-premium border border-gold/10">
            <Eye className="h-3 w-3 text-gold" />
            <span>{viewers} يشاهدون الآن</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">
            {product.category}
          </span>
          {product.sales && product.sales > 500 && (
            <span className="text-[10px] font-bold text-text-muted">
              +{product.sales} طلب
            </span>
          )}
        </div>
        
        <h3 className="font-serif mb-2 text-xl font-bold text-text-premium leading-tight group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {product.description}
        </p>

        {/* Options Selection */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {product.options.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedOption(option)}
                className={`rounded-full px-4 py-2 text-[10px] font-bold transition-all border ${
                  selectedOption.label === option.label
                    ? "bg-gold border-gold text-dark shadow-lg shadow-gold/20"
                    : "bg-dark border-gold/10 text-text-muted hover:border-gold/30"
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
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">السعر</span>
            <span className="text-2xl font-bold text-gold">
              {selectedOption.price} <span className="text-xs font-medium">درهم</span>
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => onAddToCart(product, selectedOption)}
              size="icon"
              className="h-12 w-12 rounded-full bg-dark border border-gold/10 text-gold hover:bg-gold hover:text-dark transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={handleWhatsAppOrder}
              className="h-12 rounded-full bg-gold px-6 font-bold text-dark shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              اطلب الآن
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
