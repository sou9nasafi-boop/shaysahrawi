import React from 'react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'tea', label: 'الشاي' },
  { id: 'perfume', label: 'العطور' },
  { id: 'melhafa', label: 'الملحفة' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-3 md:gap-4 mb-10 md:mb-16 pb-4 sm:pb-0 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            "px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all border whitespace-nowrap text-sm md:text-base",
            activeCategory === cat.id
              ? "bg-[#C8973A] text-black border-[#C8973A] shadow-lg shadow-[#C8973A]/20"
              : "bg-transparent text-[#F0E8D8] border-white/10 hover:border-[#C8973A]/50"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
