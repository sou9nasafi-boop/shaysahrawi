import { useMemo, useState, useEffect } from "react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Product, WeightOption } from "../types";
import { Search, Filter, X, LayoutGrid, List, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "../constants";

interface ProductsProps {
  onAddToCart: (product: Product, option: WeightOption) => void;
  searchQuery: string;
}

export function Products({ onAddToCart, searchQuery }: ProductsProps) {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(catParam);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [catParam]);

  const categories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleWhatsAppOrder = (product: Product, option: WeightOption) => {
    const message = `السلام عليكم، أريد طلب ${product.name} بوزن ${option.label}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
          >
            مجموعتنا الكاملة
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl text-text-premium mb-6"
          >
            استكشف <span className="text-gold">الأصالة</span>
          </motion.h1>
          <div className="h-px w-24 bg-gold/30 mx-auto" />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          {/* Categories */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold transition-all border ${
                  !selectedCategory
                    ? "bg-gold border-gold text-dark shadow-lg shadow-gold/20"
                    : "bg-dark-2 border-gold/10 text-text-muted hover:border-gold/30"
                }`}
              >
                الكل
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold transition-all border ${
                    selectedCategory === category
                      ? "bg-gold border-gold text-dark shadow-lg shadow-gold/20"
                      : "bg-dark-2 border-gold/10 text-text-muted hover:border-gold/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-dark-2 p-1 rounded-full border border-gold/10 self-start md:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-gold text-dark" : "text-text-muted hover:text-gold"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-full transition-all ${viewMode === "table" ? "bg-gold text-dark" : "text-text-muted hover:text-gold"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto rounded-3xl border border-gold/10 bg-dark-2"
              dir="rtl"
            >
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-gold/10 bg-dark-3">
                    <th className="p-6 font-serif text-gold font-bold">المنتج</th>
                    <th className="p-6 font-serif text-gold font-bold">الوزن</th>
                    <th className="p-6 font-serif text-gold font-bold">الثمن</th>
                    <th className="p-6 font-serif text-gold font-bold text-center">طلب سريع</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    product.options.map((option, idx) => (
                      <tr key={`${product.id}-${idx}`} className="border-b border-gold/5 hover:bg-gold/5 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gold/10" />
                            <div>
                              <p className="text-text-premium font-bold">{product.name}</p>
                              <p className="text-text-muted text-xs">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-text-premium font-medium">{option.label}</td>
                        <td className="p-6 text-gold font-bold">{option.price} درهم</td>
                        <td className="p-6 text-center">
                          <Button 
                            onClick={() => handleWhatsAppOrder(product, option)}
                            size="sm" 
                            className="bg-gold hover:bg-gold-light text-dark rounded-full h-10 px-6"
                          >
                            <MessageCircle className="w-4 h-4 ml-2" />
                            اطلب عبر واتساب
                          </Button>
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex h-96 flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-gold/5 p-10">
              <Search className="h-16 w-16 text-gold/20" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-serif text-text-premium">عذراً، لم نجد ما تبحث عنه.</p>
              <p className="text-text-muted">جرب البحث بكلمات أخرى أو تصفح تصنيفات مختلفة.</p>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gold font-bold underline underline-offset-8 decoration-gold/30 hover:text-gold-light transition-colors"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
