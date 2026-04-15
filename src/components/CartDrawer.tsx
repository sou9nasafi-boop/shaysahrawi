import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../lib/cart';
import { CONTACT_INFO } from '../constants';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal } = useCart();
  const [city, setCity] = useState<'safi' | 'other'>('safi');
  
  const deliveryFee = city === 'safi' ? 0 : (subtotal >= 500 ? 0 : 40);
  const total = subtotal + deliveryFee;
  
  const canCheckout = city === 'safi' || subtotal >= 200;

  const handleCheckout = () => {
    if (!canCheckout) return;
    
    let message = `السلام عليكم، بغيت نطلب هاد الباك:\n\n`;
    items.forEach(item => {
      message += `- ${item.product.name} (${item.weight}) x${item.quantity} = ${item.price * item.quantity} درهم\n`;
    });
    
    message += `\nالمجموع: ${subtotal} درهم`;
    message += `\nالمدينة: ${city === 'safi' ? 'أسفي' : 'مدينة أخرى'}`;
    message += `\nالتوصيل: ${deliveryFee === 0 ? 'مجاني' : deliveryFee + ' درهم'}`;
    message += `\nالمبلغ الإجمالي: ${total} درهم`;
    
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#C8973A]" />
                <h2 className="text-xl font-bold text-[#F0E8D8]">سلة المشتريات (الباك)</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center text-[#F0E8D8]/50 py-12">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>السلة فارغة حالياً</p>
                  <p className="text-sm mt-2">قم بإضافة منتجات لتكوين الباك الخاص بك</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.weight}`} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#F0E8D8] font-bold text-sm leading-tight">{item.product.name}</h3>
                        <p className="text-[#C8973A] text-xs mt-1">{item.weight}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-black/50 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.product.id, item.weight, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded-md">
                            <Minus size={14} />
                          </button>
                          <span className="text-white text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.weight, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded-md">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-[#F0E8D8] font-bold text-sm">
                          {item.price * item.quantity} درهم
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.weight)} className="text-red-500/50 hover:text-red-500 self-start p-1">
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-black/40 border-t border-white/10 space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#F0E8D8] flex items-center gap-2">
                    <MapPin size={16} className="text-[#C8973A]" />
                    مدينة التوصيل:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setCity('safi')}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${city === 'safi' ? 'bg-[#C8973A]/20 border-[#C8973A] text-[#C8973A]' : 'bg-white/5 border-white/10 text-[#F0E8D8]/60 hover:border-white/30'}`}
                    >
                      أسفي
                    </button>
                    <button 
                      onClick={() => setCity('other')}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${city === 'other' ? 'bg-[#C8973A]/20 border-[#C8973A] text-[#C8973A]' : 'bg-white/5 border-white/10 text-[#F0E8D8]/60 hover:border-white/30'}`}
                    >
                      مدينة أخرى
                    </button>
                  </div>
                </div>

                {city === 'other' && subtotal < 200 && (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs leading-relaxed">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <p>عذراً، الحد الأدنى للطلب خارج مدينة أسفي هو 200 درهم.</p>
                  </div>
                )}

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-[#F0E8D8]/60 text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} درهم</span>
                  </div>
                  <div className="flex justify-between text-[#F0E8D8]/60 text-sm">
                    <span>التوصيل</span>
                    <span>{deliveryFee === 0 ? 'مجاني' : `${deliveryFee} درهم`}</span>
                  </div>
                  {city === 'other' && subtotal >= 200 && subtotal < 500 && (
                    <div className="text-[10px] text-[#C8973A] text-left">
                      (توصيل مجاني للطلبات فوق 500 درهم)
                    </div>
                  )}
                  <div className="flex justify-between text-[#F0E8D8] text-lg font-bold pt-2">
                    <span>الإجمالي</span>
                    <span className="text-[#C8973A]">{total} درهم</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  className="w-full bg-[#C8973A] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E8C06A] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  <ShoppingBag size={20} />
                  تأكيد الطلب عبر واتساب
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
