"use client";

import React, { useState } from "react";
import { Save, X, Image as ImageIcon } from "lucide-react";

interface ProductFormProps {
    initialData?: any;
    categories: any[];
    units: any[];
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

export default function ProductForm({
    initialData,
    categories,
    units,
    onSubmit,
    onCancel
}: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        price: initialData?.price || "",
        image: initialData?.image || "",
        stock: initialData?.stock || 10,
        categoryId: initialData?.categoryId || (categories[0]?.id || ""),
        unitId: initialData?.unitId || (units[0]?.id || ""),
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                price: parseFloat(formData.price.toString()),
                stock: parseInt(formData.stock.toString()),
            });
        } catch (error) {
            console.error(error);
            alert("Đã có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <header className="p-6 border-b bg-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-black text-coffee uppercase">
                        {initialData ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                    </h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Tên sản phẩm</label>
                            <input
                                required
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="vd: Cà phê Muối"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Giá bán (VNĐ)</label>
                            <input
                                required
                                type="number"
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="vd: 35000"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Danh mục</label>
                            <select
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all appearance-none bg-white"
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            >
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Đơn vị tính</label>
                            <select
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all appearance-none bg-white"
                                value={formData.unitId}
                                onChange={(e) => setFormData({ ...formData, unitId: e.target.value })}
                            >
                                {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Số lượng tồn</label>
                            <input
                                type="number"
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-wider">URL Hình ảnh</label>
                            <div className="relative">
                                <input
                                    className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-gold/50 outline-none transition-all"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                            HỦY BỎ
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-10 py-3 rounded-xl font-bold bg-coffee text-gold hover:bg-coffee/90 shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? "ĐANG LƯU..." : <><Save className="w-5 h-5" /> LƯU SẢN PHẨM</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
