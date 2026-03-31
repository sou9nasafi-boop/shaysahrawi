import { useMemo } from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product, WeightOption } from "../types";
import { Star, Quote, ArrowRight } from "lucide-react";
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
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="relative mb-16 h-[70vh] w-full overflow-hidden rounded-[2rem] bg-oasis premium-shadow md:mb-32 md:h-[80vh] md:rounded-[3rem]">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/desert-tea/1920/1080?blur=2"
            className="h-full w-full object-cover opacity-40 mix-blend-overlay"
            alt="Desert"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-oasis/20 via-transparent to-oasis" />
        </div>
        
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-gold-shimmer md:mb-6 md:text-xs md:tracking-[0.6em]">
              تراث الأصالة المغربية
            </span>
            <h1 className="mb-6 text-4xl font-black leading-[1.1] text-white sm:text-5xl md:mb-8 md:text-8xl">
              الشاي الصحراوي <br />
              <span className="text-gold-shimmer">الممتاز</span>
            </h1>
            <p className="mb-8 text-sm font-medium leading-relaxed text-white/70 sm:text-base md:mb-12 md:text-xl">
              نقدم لكم أجود أنواع الشاي الصحراوي والمنتجات التقليدية المختارة بعناية فائقة من قلب الصحراء المغربية.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="h-14 w-full rounded-2xl bg-gold px-8 text-base font-black text-oasis shadow-2xl shadow-gold/20 transition-all hover:bg-gold-light hover:scale-105 active:scale-95 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                >
                  اكتشف مجموعتنا
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 w-full rounded-2xl border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-md hover:bg-white/10 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                >
                  قصة علامتنا
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10"
        >
          <div className="h-10 w-5 rounded-full border-2 border-white/20 p-1 md:h-12 md:w-6">
            <div className="h-1.5 w-full rounded-full bg-gold md:h-2" />
          </div>
        </motion.div>
      </section>

      {/* Best Sellers Section */}
      <section className="mb-16 md:mb-32">
        <div className="mb-10 flex flex-col items-center text-center md:mb-16">
          <span className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-sunset md:mb-4 md:tracking-[0.4em]">الإصدارات الخاصة</span>
          <h2 className="text-3xl font-black text-oasis md:text-6xl">الأكثر مبيعاً</h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gold md:mt-6 md:h-1.5 md:w-24" />
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
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

      {/* Brand Story Section */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-[2.5rem] premium-shadow"
        >
          <img 
            src="https://picsum.photos/seed/sahara-tea-story/1200/1200" 
            alt="Our Story" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oasis/60 to-transparent" />
          <div className="absolute bottom-8 right-8 text-white">
            <p className="text-3xl font-extrabold">من قلب الصحراء</p>
            <p className="text-gold-light font-medium">تقاليد تتوارثها الأجيال</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-block rounded-full bg-oasis/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-oasis">
            قصتنا
          </div>
          <h2 className="text-4xl font-extrabold text-oasis leading-tight">
            أكثر من مجرد شاي، <br />
            <span className="text-sunset">إنها ثقافة وأسلوب حياة</span>
          </h2>
          <p className="text-lg text-oasis/70 leading-relaxed">
            في "الشاي الصحراوي الممتاز"، نؤمن أن الشاي هو قلب الضيافة الصحراوية. نحن نختار أجود أوراق الشاي بعناية فائقة، ونقدم لكم تشكيلة من المنتجات التقليدية التي تعكس أصالة وجمال الصحراء المغربية.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <p className="text-3xl font-extrabold text-oasis">100%</p>
              <p className="text-sm font-bold text-oasis/50 uppercase tracking-wider">منتجات طبيعية</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-extrabold text-oasis">+5000</p>
              <p className="text-sm font-bold text-oasis/50 uppercase tracking-wider">زبون سعيد</p>
            </div>
          </div>
          <Link to="/about">
            <Button variant="link" className="p-0 h-auto text-oasis font-bold gap-2 group">
              اقرأ المزيد عن قصتنا <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-oasis md:text-5xl">ماذا يقول زبناؤنا</h2>
          <p className="mt-4 text-oasis/60">ثقتكم هي سر نجاحنا</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "فاطمة الزهراء", city: "العيون", text: "أجود أنواع الشاي التي تذوقتها، المذاق الصحراوي الأصيل فعلاً." },
            { name: "محمد", city: "الدار البيضاء", text: "توصيل سريع وتعامل احترافي جداً. المنتجات وصلت في حالة ممتازة." },
            { name: "ليلى", city: "أكادير", text: "العطور الصحراوية رائعة جداً وتدوم طويلاً. شكراً لكم على هذه الجودة." }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[2rem] bg-white p-8 shadow-sm border border-oasis/5"
            >
              <div className="mb-4 flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <Quote className="mb-4 h-8 w-8 text-oasis/10" />
              <p className="mb-6 text-oasis/80 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-oasis/5 flex items-center justify-center font-bold text-oasis">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-oasis">{t.name}</p>
                  <p className="text-xs text-oasis/40">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
