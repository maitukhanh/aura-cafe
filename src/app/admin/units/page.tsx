"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, Search } from "lucide-react";
import { getUnits, createUnit, updateUnit, deleteUnit } from "../../actions/unit";

export default function UnitsAdmin() {
    const [units, setUnits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const [editName, setEditName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUnits();
    }, []);

    const loadUnits = async () => {
        setLoading(true);
        const data = await getUnits();
        setUnits(data);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!newName.trim()) return;
        await createUnit(newName);
        setNewName("");
        setIsAdding(false);
        loadUnits();
    };

    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return;
        await updateUnit(id, editName);
        setEditingId(null);
        loadUnits();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bạn có chắc muốn xóa đơn vị này?")) {
            await deleteUnit(id);
            loadUnits();
        }
    };

    const filtered = units.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-coffee uppercase">Đơn vị tính</h1>
                    <p className="text-gray-500 mt-1">Quản lý các loại đơn vị tính (Ly, Gói, Cái...).</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-coffee text-gold hover:bg-coffee/90 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    THÊM ĐƠN VỊ
                </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn vị..."
                        className="bg-transparent border-none focus:ring-0 text-sm flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
                            <th className="px-6 py-4">Tên đơn vị</th>
                            <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {isAdding && (
                            <tr className="animate-in fade-in slide-in-from-top-4">
                                <td className="px-6 py-4">
                                    <input
                                        autoFocus
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gold/50 outline-none"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Nhập tên đơn vị mới..."
                                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                    />
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={handleAdd} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Save className="w-5 h-5" /></button>
                                    <button onClick={() => setIsAdding(false)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><X className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        )}

                        {loading ? (
                            <tr><td colSpan={2} className="p-10 text-center text-gray-400 italic">Đang tải...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={2} className="p-10 text-center text-gray-400 italic">Không tìm thấy đơn vị nào.</td></tr>
                        ) : filtered.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    {editingId === item.id ? (
                                        <input
                                            autoFocus
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gold/50 outline-none"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdate(item.id)}
                                        />
                                    ) : (
                                        <span className="font-bold text-coffee">{item.name}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    {editingId === item.id ? (
                                        <>
                                            <button onClick={() => handleUpdate(item.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Save className="w-5 h-5" /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><X className="w-5 h-5" /></button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setEditingId(item.id); setEditName(item.name); }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
