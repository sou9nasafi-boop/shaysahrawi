import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const weightOptions = Object.keys(product.prices);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const currentPrice = product.prices[selectedWeight];

  const handleWhatsAppOrder = () => {
    const message = `السلام عليكم، أريد طلب منتج: ${product.name} (${selectedWeight}) بسعر ${currentPrice} درهم.`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group bg-[#111] border border-[#C8973A]/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#C8973A]/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="w-full h-full relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              product.secondaryImage ? "group-hover:opacity-0 group-hover:scale-110" : "group-hover:scale-110"
            )}
            referrerPolicy="no-referrer"
          />
          {product.secondaryImage && (
            <img 
              src={product.secondaryImage} 
              alt={`${product.name} secondary`} 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
          <button className="bg-white text-black p-3 rounded-full hover:bg-[#C8973A] transition-colors">
            <Eye size={20} />
          </button>
          <button 
            onClick={handleWhatsAppOrder}
            className="bg-[#C8973A] text-black p-3 rounded-full hover:bg-[#E8C06A] transition-colors"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-[#C8973A] px-3 py-1 rounded-full text-sm font-bold border border-[#C8973A]/20">
          {currentPrice} درهم
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[10px] uppercase tracking-widest text-[#C8973A] mb-2 font-bold opacity-70">
          {product.category === 'tea' ? 'شاي صحراوي' : product.category === 'perfume' ? 'عطور' : 'ملحفة'}
        </div>
        <h3 className="text-xl font-serif font-bold text-[#F0E8D8] mb-3 group-hover:text-[#C8973A] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#F0E8D8]/60 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        
        {/* Weight Selection */}
        {weightOptions.length > 1 && (
          <div className="mb-6">
            <div className="text-[10px] text-[#C8973A] mb-2 font-bold opacity-70">اختر الوزن:</div>
            <div className="flex flex-wrap gap-2">
              {weightOptions.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full border transition-all",
                    selectedWeight === weight
                      ? "bg-[#C8973A] text-black border-[#C8973A]"
                      : "bg-transparent text-[#F0E8D8]/60 border-white/10 hover:border-[#C8973A]/50"
                  )}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {product.features && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {product.features.map((feature, i) => (
              <span key={i} className="text-[10px] bg-white/5 text-[#F0E8D8]/80 px-2 py-1 rounded border border-white/5">
                {feature}
              </span>
            ))}
          </div>
        )}

        <button 
          onClick={handleWhatsAppOrder}
          className="w-full mt-auto bg-transparent border border-[#C8973A]/30 text-[#C8973A] py-3 rounded-xl font-bold hover:bg-[#C8973A] hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          <span>اطلب الآن عبر واتساب</span>
        </button>
      </div>
    </motion.div>
  );
}
