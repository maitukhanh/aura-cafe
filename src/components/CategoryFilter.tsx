"use client";

import React from "react";

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategoryId: string | null;
    onSelect: (id: string | null) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategoryId,
    onSelect
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-3 py-8">
            <button
                onClick={() => onSelect(null)}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all border-2 
          ${selectedCategoryId === null
                        ? "bg-coffee text-gold border-coffee shadow-lg"
                        : "bg-transparent text-coffee border-gray-200 hover:border-coffee hover:text-coffee"}`}
            >
                Tất cả
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all border-2 
            ${selectedCategoryId === cat.id
                            ? "bg-coffee text-gold border-coffee shadow-lg"
                            : "bg-transparent text-coffee border-gray-200 hover:border-coffee hover:text-coffee"}`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
