import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative flex flex-col h-full bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#C8973A]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden m-1.5 rounded-[1.8rem]">
        <div className="w-full h-full relative">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              product.secondaryImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
            )}
            referrerPolicy="no-referrer"
          />
          {product.secondaryImage && (
            <img 
              src={product.secondaryImage} 
              alt={`${product.name} secondary`} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button className="bg-white text-black p-4 rounded-full hover:bg-[#C8973A] transition-colors shadow-2xl">
            <Eye size={20} />
          </button>
          <button 
            onClick={handleWhatsAppOrder}
            className="bg-[#C8973A] text-black p-4 rounded-full hover:bg-[#E8C06A] transition-colors shadow-2xl"
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl text-[#C8973A] px-4 py-1.5 rounded-full text-sm font-black border border-white/10 shadow-2xl">
          {currentPrice} <span className="text-[10px]">درهم</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8973A] font-bold">
            {product.category === 'tea' ? 'شاي صحراوي' : product.category === 'perfume' ? 'عطور' : product.category === 'gum' ? 'صمغ عربي' : 'ملحفة'}
          </span>
          <div className="flex items-center gap-1 text-[#C8973A]">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold">4.9</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-serif font-bold text-[#F0E8D8] mb-2 md:mb-3 group-hover:text-[#C8973A] transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-xs md:text-sm text-[#F0E8D8]/50 line-clamp-2 mb-4 md:mb-6 leading-relaxed font-light">
          {product.description}
        </p>
        
        {/* Weight Selection */}
        {weightOptions.length > 1 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {weightOptions.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={cn(
                    "px-4 py-1.5 text-[10px] rounded-full border transition-all duration-300 font-bold tracking-wider uppercase",
                    selectedWeight === weight
                      ? "bg-[#C8973A] text-black border-[#C8973A] shadow-[0_0_15px_rgba(200,151,58,0.3)]"
                      : "bg-transparent text-[#F0E8D8]/40 border-white/10 hover:border-[#C8973A]/50"
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
          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {product.features.map((feature, i) => (
              <span key={i} className="text-[9px] bg-white/5 text-[#F0E8D8]/40 px-3 py-1 rounded-full border border-white/5 uppercase tracking-wider">
                {feature}
              </span>
            ))}
          </div>
        )}

        <button 
          onClick={handleWhatsAppOrder}
          className="w-full mt-auto bg-[#C8973A] text-black py-4 rounded-2xl font-black text-sm hover:bg-[#E8C06A] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
        >
          <ShoppingBag size={18} />
          <span>اطلب الآن عبر واتساب</span>
        </button>
      </div>
    </motion.div>
  );
}
