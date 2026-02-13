"use client";

import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

interface StoreFrontProps {
    initialProducts: any[];
    categories: any[];
}

export default function StoreFront({ initialProducts, categories }: StoreFrontProps) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const filteredProducts = selectedCategoryId
        ? initialProducts.filter((p) => p.categoryId === selectedCategoryId)
        : initialProducts;

    return (
        <div className="container mx-auto px-4 pb-20">
            <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
            />

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-cream/30 rounded-3xl border border-dashed border-gold/30">
                    <p className="text-coffee/50 text-xl font-medium">Hiện tại chưa có sản phẩm nào trong danh mục này</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
