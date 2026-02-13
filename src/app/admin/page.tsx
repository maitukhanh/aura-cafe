import { Coffee, Tags, SquareStack, BarChart3 } from "lucide-react";
import { prisma } from "@/lib/db";
import SeedButton from "@/components/admin/SeedButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [productCount, categoryCount, unitCount] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.unit.count(),
    ]);

    const stats = [
        { label: "Sản phẩm", value: productCount, icon: Coffee, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Danh mục", value: categoryCount, icon: Tags, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Đơn vị tính", value: unitCount, icon: SquareStack, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <div className="p-8">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-coffee uppercase tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2">Chào mừng bạn quay lại hệ thống quản lý Aura Cafe.</p>
                </div>
                <SeedButton />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h2 className="text-3xl font-black text-coffee mt-1">{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                    <BarChart3 className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-coffee">Thống kê chi tiết</h3>
                <p className="text-gray-500 mt-2 max-w-md">Dữ liệu bán hàng và biểu đồ sẽ được cập nhật trong phiên bản tiếp theo khi có lịch sử giao dịch.</p>
            </div>
        </div>
    );
}
