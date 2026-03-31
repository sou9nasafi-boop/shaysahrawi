import { useMemo } from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product, WeightOption } from "../types";
import { Star, Quote, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeProps {
  onAddToCart: (product: Product, option: WeightOption) => void;
}

export function Home({ onAddToCart }: HomeProps) {
  const bestSellers = useMemo(() => {
    return [...PRODUCTS]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section from Snippet Style */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-2 to-dark" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src="https://i.ibb.co/SXwfnwQd/Logo-de-the-du-de-sert-authentique.png" 
            alt="الشاي الصحراوي الممتاز" 
            className="w-64 md:w-80 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(200,151,58,0.3)]"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gold text-xs md:text-sm font-bold tracking-[0.4em] mb-4 uppercase"
          >
            ✦ آسفي — المغرب ✦
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-serif text-4xl md:text-7xl text-text-premium mb-6 leading-tight"
          >
            قائمة أسعارنا <span className="text-gold">الكاملة</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-text-muted font-serif italic text-lg md:text-2xl mb-12"
          >
            شاي صحراوي • عطور فاخرة • بخور أصيل
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/products">
              <Button size="lg" className="bg-gold hover:bg-gold-light text-dark font-bold rounded-full px-10 h-14 text-lg transition-all hover:scale-105">
                تصفح المنتجات
              </Button>
            </Link>
            <a href={`https://wa.me/212649682152`} target="_blank">
              <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 rounded-full px-10 h-14 text-lg">
                تواصل معنا
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Categories Quick Access */}
      <section className="py-12 bg-dark-2 border-y border-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { name: "الشاي الصحراوي", cat: "chai", icon: "🍵" },
              { name: "العطور الفاخرة", cat: "attar", icon: "✨" },
              { name: "البخور والعود", cat: "bakhour", icon: "🪔" },
              { name: "زنابيل وكادو", cat: "chai-znbil", icon: "🎁" }
            ].map((c) => (
              <Link 
                key={c.cat} 
                to={`/products?cat=${c.cat}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gold/5 transition-all"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</span>
                <span className="text-text-muted group-hover:text-gold font-bold text-sm">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <div className="text-center">
            <p className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-2">الأكثر طلباً</p>
            <h2 className="font-serif text-3xl md:text-5xl text-text-premium">مختاراتنا المميزة</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard
              key={`best-${product.id}`}
              product={product}
              onAddToCart={onAddToCart}
              isBestSeller
            />
          ))}
        </div>
      </section>

      {/* Features from Snippet Vibe */}
      <section className="py-24 bg-dark-3">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-gold w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-text-premium">جودة استثنائية</h3>
              <p className="text-text-muted text-sm leading-relaxed">نختار أجود أنواع الشاي والمنتجات الصحراوية بعناية فائقة لضمان أفضل تجربة لزبنائنا.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Quote className="text-gold w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-text-premium">أصالة التقاليد</h3>
              <p className="text-text-muted text-sm leading-relaxed">نحافظ على روح الضيافة الصحراوية المغربية في كل منتج نقدمه لكم.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-gold w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-text-premium">خدمة متميزة</h3>
              <p className="text-text-muted text-sm leading-relaxed">توصيل سريع وتعامل راقٍ يليق بزبناء الشاي الصحراوي الممتاز.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
