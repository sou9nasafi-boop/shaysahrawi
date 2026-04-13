import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'tea', label: 'الشاي' },
  { id: 'gum', label: 'الصمغ العربي' },
  { id: 'perfume', label: 'العطور' },
  { id: 'melhafa', label: 'الملحفة' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-3 md:gap-6 mb-8 md:mb-16 pb-4 sm:pb-0 no-scrollbar">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            "px-6 md:px-10 py-2.5 md:py-4 rounded-full text-[10px] md:text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 border whitespace-nowrap",
            activeCategory === cat.id
              ? "bg-[#C8973A] text-black border-[#C8973A] shadow-[0_10px_30px_rgba(200,151,58,0.4)]"
              : "bg-white/5 text-[#F0E8D8]/40 border-white/5 hover:border-[#C8973A]/30 hover:text-[#F0E8D8]"
          )}
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
