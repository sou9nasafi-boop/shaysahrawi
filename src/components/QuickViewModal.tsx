import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Star, Info, Plus } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import { cn } from '../lib/utils';
import { trackOrderClick } from '../lib/firebase';
import { useCart } from '../lib/cart';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  if (!product) return null;

  const weightOptions = Object.keys(product.prices);
  const [selectedWeight, setSelectedWeight] = React.useState(weightOptions[0]);
  const currentPrice = product.prices[selectedWeight];
  
  const allImages = [product.image, product.secondaryImage, ...(product.gallery || [])].filter(Boolean) as string[];
  const [selectedImage, setSelectedImage] = React.useState(allImages[0]);
  const { addToCart } = useCart();

  const handleWhatsAppOrder = () => {
    trackOrderClick(product, selectedWeight, currentPrice);
    const message = `السلام عليكم، أريد طلب منتج: ${product.name} (${selectedWeight}) بسعر ${currentPrice} درهم.`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#111] w-full max-w-5xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 z-10 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C8973A] hover:text-black transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto h-full overflow-hidden bg-white/5 flex flex-col">
              <div className="flex-1 relative">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {allImages.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto bg-black/40 backdrop-blur-md no-scrollbar absolute bottom-0 left-0 right-0">
                  {allImages.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedImage(img)} 
                      className={cn(
                        "w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300",
                        selectedImage === img ? "border-[#C8973A] scale-105" : "border-transparent opacity-50 hover:opacity-100"
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#C8973A] text-xs font-bold uppercase tracking-[0.3em]">
                  {product.category === 'tea' ? 'شاي صحراوي' : 
                   product.category === 'melhfa' ? 'ملاحف صحراوية' : 
                   product.category === 'perfume' ? 'عطور فاخرة' : 
                   'منتجات صحراوية'}
                </span>
                <div className="flex items-center gap-1 text-[#C8973A]">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">4.9 (120+ تقييم)</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F0E8D8] mb-6 leading-tight">
                {product.name}
              </h2>

              <p className="text-lg text-[#F0E8D8]/60 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="flex flex-wrap gap-3 mb-10">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      <div className="w-1.5 h-1.5 bg-[#C8973A] rounded-full" />
                      <span className="text-xs text-[#F0E8D8]/80 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Weight Selection */}
              <div className="mb-10">
                <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-4 block mr-2">اختر الكمية / الوزن</label>
                <div className="flex flex-wrap gap-3">
                  {weightOptions.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={cn(
                        "px-6 py-3 rounded-2xl border transition-all duration-300 font-bold text-sm",
                        selectedWeight === weight
                          ? "bg-[#C8973A] text-black border-[#C8973A] shadow-lg"
                          : "bg-white/5 text-[#F0E8D8]/60 border-white/10 hover:border-[#C8973A]/50"
                      )}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-1">السعر الإجمالي</div>
                  <div className="text-4xl font-serif font-bold text-[#C8973A]">
                    {currentPrice} <span className="text-lg">درهم</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <button 
                    onClick={() => {
                      addToCart(product, selectedWeight, currentPrice);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-[#F0E8D8] font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300"
                  >
                    <Plus size={20} />
                    <span>أضف للباك</span>
                  </button>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full sm:w-auto luxury-button bg-[#C8973A] text-black flex items-center justify-center gap-4 shadow-2xl"
                  >
                    <ShoppingBag size={20} />
                    <span>اطلب الآن</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
