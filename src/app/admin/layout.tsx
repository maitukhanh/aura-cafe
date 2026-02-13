import React from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Tags,
    SquareStack,
    Coffee,
    ArrowLeft,
    Settings
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-coffee text-cream hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
                <div className="p-8 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Coffee className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
                        <span className="text-xl font-black uppercase tracking-tighter">Aura Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gold transition-all"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Tổng quan</span>
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gold transition-all"
                    >
                        <Tags className="w-5 h-5" />
                        <span className="font-medium">Danh mục</span>
                    </Link>
                    <Link
                        href="/admin/units"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gold transition-all"
                    >
                        <SquareStack className="w-5 h-5" />
                        <span className="font-medium">Đơn vị tính</span>
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gold transition-all"
                    >
                        <Coffee className="w-5 h-5" />
                        <span className="font-medium">Sản phẩm</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-white/5 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gold transition-all bg-white/5"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium italic">Về trang chủ</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
