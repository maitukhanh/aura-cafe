"use client";

import React, { useState } from "react";
import { Database, RefreshCw } from "lucide-react";
import { seedDatabase } from "@/app/actions/seed";

export default function SeedButton() {
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        if (!confirm("Thao tác này sẽ xóa toàn bộ dữ liệu hiện tại và tạo dữ liệu mẫu mới. Bạn có chắc chắn?")) return;
        setLoading(true);
        try {
            await seedDatabase();
            alert("Cài đặt dữ liệu mẫu thành công!");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Đã có lỗi xảy ra khi cài đặt dữ liệu mẫu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSeed}
            disabled={loading}
            className="bg-gold/10 text-gold hover:bg-gold hover:text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-gold/20 transition-all active:scale-95 disabled:opacity-50"
        >
            {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
                <Database className="w-5 h-5" />
            )}
            CÀI ĐẶT DỮ LIỆU MẪU (PREMIUM)
        </button>
    );
}
