"use client";

import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, updateQuantity, removeFromCart, total } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                    <div className="p-6 bg-coffee text-cream flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-gold" />
                            Giỏ hàng của bạn
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                                <ShoppingBag className="w-16 h-16 opacity-20" />
                                <p>Chưa có món nào trong giỏ</p>
                                <button
                                    onClick={onClose}
                                    className="text-gold font-bold hover:underline"
                                >
                                    Tiếp tục chọn món
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {items.map((item) => (
                                    <li key={item.id} className="flex gap-4 border-b pb-6 last:border-0">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ShoppingBag className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between font-bold text-coffee">
                                                <h3>{item.name}</h3>
                                                <p>{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium uppercase tracking-wider">Tổng cộng</span>
                                <span className="text-2xl font-bold text-coffee">{total.toLocaleString("vi-VN")}đ</span>
                            </div>
                            <button
                                className="w-full bg-coffee text-gold font-bold py-4 rounded-md shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                                onClick={() => alert("Chức năng thanh toán đang phát triển")}
                            >
                                THANH TOÁN NGAY
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
