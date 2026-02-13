"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Coffee, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-coffee text-cream shadow-md">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gold p-2 rounded-full transition-transform group-hover:rotate-12">
                            <Coffee className="w-6 h-6 text-coffee" />
                        </div>
                        <span className="text-2xl font-bold tracking-wider uppercase text-gold">
                            Aura <span className="text-cream">Cafe</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
                        <Link href="/" className="hover:text-gold transition-colors">Trang chủ</Link>
                        <Link href="/admin" className="hover:text-gold transition-colors">Quản trị</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gold text-coffee text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-coffee">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden p-2 hover:bg-white/10 rounded-full">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
