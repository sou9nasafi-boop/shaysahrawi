import { useMemo, useState } from "react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Product, WeightOption } from "../types";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductsProps {
  onAddToCart: (product: Product, option: WeightOption) => void;
  searchQuery: string;
}

export function Products({ onAddToCart, searchQuery }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl font-black text-oasis md:text-6xl mb-4">مجموعتنا الكاملة</h1>
        <p className="text-oasis/60 max-w-2xl">تصفح تشكيلتنا المختارة من أجود أنواع الشاي والمنتجات الصحراوية الأصيلة.</p>
      </div>

      {/* Categories Filter */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="h-5 w-5 text-gold" />
          <h3 className="font-bold text-oasis">تصفية حسب التصنيف:</h3>
        </div>
        <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap rounded-full px-8 py-3 text-sm font-black transition-all ${
                !selectedCategory
                  ? "bg-oasis text-white shadow-xl shadow-oasis/20 scale-105"
                  : "bg-white text-oasis border border-oasis/10 hover:bg-oasis/5"
              }`}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-8 py-3 text-sm font-black transition-all ${
                  selectedCategory === category
                    ? "bg-oasis text-white shadow-xl shadow-oasis/20 scale-105"
                    : "bg-white text-oasis border border-oasis/10 hover:bg-oasis/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4" id="products-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex h-96 flex-col items-center justify-center space-y-6 text-center">
          <div className="rounded-full bg-oasis/5 p-10">
            <Search className="h-16 w-16 text-oasis/20" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black text-oasis">عذراً، لم نجد ما تبحث عنه.</p>
            <p className="text-oasis/40">جرب البحث بكلمات أخرى أو تصفح تصنيفات مختلفة.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
            }}
            className="text-sm font-black text-sunset underline underline-offset-8 decoration-2 hover:text-oasis transition-colors"
          >
            عرض جميع المنتجات
          </button>
        </div>
      )}
    </div>
  );
}
