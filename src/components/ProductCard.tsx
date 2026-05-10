import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import { cn } from '../lib/utils';
import { useCart } from '../lib/cart';

import { trackOrderClick } from '../lib/firebase';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const weightOptions = Object.keys(product.prices);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const currentPrice = product.prices[selectedWeight];
  const { addToCart } = useCart();

  const handleWhatsAppOrder = () => {
    trackOrderClick(product, selectedWeight, currentPrice);
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
      <div className="relative aspect-[4/5] overflow-hidden m-1.5 rounded-[1.8rem] img-skeleton">
        <div className="w-full h-full relative">
          <img 
            src={product.image.includes('unsplash.com') ? `${product.image}&w=400&q=60` : product.image} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              product.secondaryImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
            )}
            referrerPolicy="no-referrer"
          />
          {product.secondaryImage && (
            <img 
              src={product.secondaryImage.includes('unsplash.com') ? `${product.secondaryImage}&w=400&q=60` : product.secondaryImage} 
              alt={`${product.name} secondary`} 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-[#C8973A] shadow-2xl"
          >
            <Eye size={16} />
            <span className="text-xs font-bold">عرض سريع</span>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, selectedWeight, currentPrice);
            }}
            className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center gap-2 bg-[#C8973A] text-black px-6 py-3 rounded-full hover:bg-[#E8C06A] shadow-2xl"
          >
            <Plus size={16} />
            <span className="text-xs font-bold">أضف للباك</span>
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
            {product.category === 'tea' ? 'شاي صحراوي' : 
             product.category === 'perfume' ? 'عطور فاخرة' : 
             'منتجات صحراوية'}
          </span>
          <div className="flex items-center gap-1 text-[#C8973A]">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold">4.9</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-serif font-bold text-[#F0E8D8] mb-2 md:mb-3 group-hover:text-[#C8973A] transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="mb-4 md:mb-6">
          <p 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-xs md:text-sm text-[#F0E8D8]/50 leading-relaxed font-light cursor-pointer transition-all duration-300",
              !isExpanded && "line-clamp-2"
            )}
          >
            {product.description}
          </p>
          {product.description && product.description.length > 60 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] text-[#C8973A] mt-1 hover:underline font-bold"
            >
              {isExpanded ? 'عرض أقل' : 'اقرأ المزيد'}
            </button>
          )}
        </div>
        
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

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button 
            onClick={handleWhatsAppOrder}
            className="bg-white/10 text-[#F0E8D8] py-3 rounded-xl font-bold text-xs hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            <span>طلب مباشر</span>
          </button>
          <button 
            onClick={() => addToCart(product, selectedWeight, currentPrice)}
            className="bg-[#C8973A] text-black py-3 rounded-xl font-bold text-xs hover:bg-[#E8C06A] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={16} />
            <span>أضف للباك</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
