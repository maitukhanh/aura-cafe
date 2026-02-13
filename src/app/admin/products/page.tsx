"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Search, Coffee, Filter } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../actions/product";
import { getCategories } from "../../actions/category";
import { getUnits } from "../../actions/unit";
import ProductForm from "@/components/admin/ProductForm";

export default function ProductsAdmin() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [units, setUnits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [p, c, u] = await Promise.all([getProducts(), getCategories(), getUnits()]);
        setProducts(p);
        setCategories(c);
        setUnits(u);
        setLoading(false);
    };

    const handleSubmit = async (data: any) => {
        if (editingProduct) {
            await updateProduct(editingProduct.id, data);
        } else {
            await createProduct(data);
        }
        setShowForm(false);
        setEditingProduct(null);
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            await deleteProduct(id);
            loadData();
        }
    };

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || p.categoryId === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-coffee uppercase">Danh sách sản phẩm</h1>
                    <p className="text-gray-500 mt-1">Quản lý thực đơn và kho hàng Aura Cafe.</p>
                </div>
                <button
                    onClick={() => { setEditingProduct(null); setShowForm(true); }}
                    className="bg-coffee text-gold hover:bg-coffee/90 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    THÊM SẢN PHẨM
                </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm tên sản phẩm..."
                            className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-gold/50 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            className="px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-gold/50 outline-none appearance-none pr-8 cursor-pointer"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Tất cả danh mục</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
                                <th className="px-6 py-4">Sản phẩm</th>
                                <th className="px-6 py-4">Giá bán</th>
                                <th className="px-6 py-4">Danh mục</th>
                                <th className="px-6 py-4">Đơn vị</th>
                                <th className="px-6 py-4">Tồn kho</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {loading ? (
                                <tr><td colSpan={6} className="p-10 text-center text-gray-400 italic">Đang tải dữ liệu...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="p-10 text-center text-gray-400 italic">Không tìm thấy sản phẩm nào.</td></tr>
                            ) : filtered.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cream rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                {product.image ? (
                                                    <img src={product.image} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Coffee className="w-5 h-5 text-gold" />
                                                )}
                                            </div>
                                            <span className="font-bold text-coffee">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">{product.price.toLocaleString("vi-VN")}đ</td>
                                    <td className="px-6 py-4 text-gray-600 italic">{product.category.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{product.unit.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${product.stock > 5 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => { setEditingProduct(product); setShowForm(true); }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <ProductForm
                    initialData={editingProduct}
                    categories={categories}
                    units={units}
                    onSubmit={handleSubmit}
                    onCancel={() => { setShowForm(false); setEditingProduct(null); }}
                />
            )}
        </div>
    );
}
