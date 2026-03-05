"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Coffee,
    User,
    Phone,
    MapPin,
    MessageSquare,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/actions/order";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        address: "",
        note: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4">
                <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gold/40" />
                </div>
                <h1 className="text-2xl font-bold text-coffee">Giỏ hàng trống</h1>
                <p className="text-gray-500">Hãy chọn một vài món rồi quay lại nhé!</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-coffee text-gold font-bold px-8 py-3 rounded-lg hover:bg-coffee/90 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại menu
                </Link>
            </main>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createOrder({
                customerName: form.customerName,
                phone: form.phone,
                address: form.address,
                note: form.note || undefined,
                items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });

            if (result.success) {
                clearCart();
                router.push("/order-success");
            } else {
                alert(result.message || "Đã xảy ra lỗi, vui lòng thử lại!");
            }
        } catch (error) {
            alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-coffee text-cream shadow-lg">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-gold" />
                        <span className="text-lg font-bold tracking-wider uppercase">
                            Thanh toán
                        </span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Form Section */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 bg-gradient-to-r from-coffee to-coffee/90 text-cream">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <User className="w-5 h-5 text-gold" />
                                    Thông tin giao hàng
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-coffee mb-2">
                                        <User className="w-4 h-4 text-gold" />
                                        Họ tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.customerName}
                                        onChange={(e) =>
                                            setForm({ ...form, customerName: e.target.value })
                                        }
                                        placeholder="Nguyễn Văn A"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all bg-cream/30"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-coffee mb-2">
                                        <Phone className="w-4 h-4 text-gold" />
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                        placeholder="0901 234 567"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all bg-cream/30"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-coffee mb-2">
                                        <MapPin className="w-4 h-4 text-gold" />
                                        Địa chỉ <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.address}
                                        onChange={(e) =>
                                            setForm({ ...form, address: e.target.value })
                                        }
                                        placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all bg-cream/30"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-coffee mb-2">
                                        <MessageSquare className="w-4 h-4 text-gold" />
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={form.note}
                                        onChange={(e) =>
                                            setForm({ ...form, note: e.target.value })
                                        }
                                        placeholder="Ví dụ: Ít đường, nhiều đá..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all bg-cream/30 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-coffee text-gold font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wider uppercase flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            ĐANG XỬ LÝ...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            ĐẶT HÀNG · {total.toLocaleString("vi-VN")}đ
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-6 bg-gradient-to-r from-gold/10 to-transparent border-b border-gray-100">
                                <h2 className="text-lg font-bold text-coffee flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-gold" />
                                    Đơn hàng ({items.length} món)
                                </h2>
                            </div>

                            <div className="p-4 max-h-[50vh] overflow-y-auto">
                                <ul className="space-y-3">
                                    {items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-cream/30"
                                        >
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Coffee className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-coffee text-sm truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    x{item.quantity} ·{" "}
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </p>
                                            </div>
                                            <p className="font-bold text-coffee text-sm whitespace-nowrap">
                                                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-cream/30">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                                        Tổng cộng
                                    </span>
                                    <span className="text-2xl font-bold text-coffee">
                                        {total.toLocaleString("vi-VN")}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
