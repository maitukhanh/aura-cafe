"use client";

import React from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string | null;
        category: { name: string };
        unit: { name: string };
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-cream">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold opacity-30">
                        <ShoppingBag className="w-20 h-20" />
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <span className="bg-coffee/80 backdrop-blur-md text-cream text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                        {product.category.name}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-coffee mt-1 line-clamp-1 group-hover:text-gold transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1">Đơn vị: {product.unit.name}</p>

                <div className="mt-auto pt-4 flex justify-between items-center">
                    <span className="text-xl font-black text-coffee">
                        {product.price.toLocaleString("vi-VN")}
                        <span className="text-xs ml-0.5 underline">đ</span>
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-gold text-coffee p-2 rounded-lg shadow-md hover:bg-gold-hover hover:scale-110 transition-all active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
