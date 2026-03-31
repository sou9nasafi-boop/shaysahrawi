import { useState } from "react";
import { ShoppingCart, Scale, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    `السلام عليكم، أريد طلب ${product.name} بوزن ${selectedOption.label}`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      dir="rtl"
    >
      <Card className="group relative h-full overflow-hidden border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl">
        {isBestSeller && (
          <div className="absolute left-2 top-2 z-20">
            <div className="flex items-center gap-1 rounded-full bg-sunset px-3 py-1 text-[9px] font-black uppercase tracking-tighter text-oasis shadow-lg backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-oasis" />
              الأكثر مبيعاً
            </div>
          </div>
        )}
        
        <CardHeader className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Badge className="absolute right-2 top-2 bg-oasis/80 text-[10px] font-bold text-white backdrop-blur-md border-none">
              {product.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-3 text-right">
          <CardTitle className="line-clamp-1 text-sm font-extrabold text-oasis">{product.name}</CardTitle>
          
          <div className="mt-3">
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
              {product.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedOption(option)}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
                    selectedOption.label === option.label
                      ? "bg-oasis text-white shadow-md shadow-oasis/20"
                      : "bg-sand-light text-oasis/60 hover:bg-oasis/5"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-sunset">{selectedOption.price.toFixed(2)} درهم</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => onAddToCart(product, selectedOption)} 
              className="h-8 w-8 rounded-full bg-oasis p-0 text-white shadow-lg shadow-oasis/20 hover:bg-oasis/90"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0">
          <Button 
            variant="outline" 
            className="h-9 w-full gap-2 rounded-xl border-oasis/10 text-[11px] font-bold text-oasis hover:bg-oasis hover:text-white transition-all"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <MessageCircle className="h-3.5 w-3.5" />
              اطلب الآن
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
