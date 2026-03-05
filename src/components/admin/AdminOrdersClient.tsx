"use client";

import React, { useState } from "react";
import {
    Eye,
    X,
    Clock,
    CheckCircle,
    XCircle,
    Package,
    ChevronDown,
    Phone,
    MapPin,
    MessageSquare,
    User,
} from "lucide-react";
import { updateOrderStatus } from "@/app/actions/order";

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: {
        name: string;
        image?: string | null;
    };
}

interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    note: string | null;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

const STATUS_CONFIG: Record<
    string,
    { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
    PENDING: {
        label: "Chờ xác nhận",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
        icon: <Clock className="w-4 h-4" />,
    },
    CONFIRMED: {
        label: "Đã xác nhận",
        color: "text-blue-700",
        bg: "bg-blue-50 border-blue-200",
        icon: <CheckCircle className="w-4 h-4" />,
    },
    COMPLETED: {
        label: "Hoàn thành",
        color: "text-green-700",
        bg: "bg-green-50 border-green-200",
        icon: <CheckCircle className="w-4 h-4" />,
    },
    CANCELLED: {
        label: "Đã hủy",
        color: "text-red-700",
        bg: "bg-red-50 border-red-200",
        icon: <XCircle className="w-4 h-4" />,
    },
};

export default function AdminOrdersClient({
    initialOrders,
}: {
    initialOrders: Order[];
}) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingId(orderId);
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
            );
            if (selectedOrder?.id === orderId) {
                setSelectedOrder((prev) =>
                    prev ? { ...prev, status: newStatus } : null
                );
            }
        } catch {
            alert("Cập nhật thất bại!");
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-coffee text-cream text-left">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                    Mã đơn
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider hidden md:table-cell">
                                    SĐT
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider hidden lg:table-cell">
                                    Ngày tạo
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-400">Chưa có đơn hàng nào</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
                                    return (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-cream/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm font-bold text-coffee">
                                                    #{order.id.slice(-6).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-coffee">
                                                    {order.customerName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <span className="text-gray-600">{order.phone}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-gold">
                                                    {order.totalAmount.toLocaleString("vi-VN")}đ
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(order.id, e.target.value)
                                                        }
                                                        disabled={updatingId === order.id}
                                                        className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${config.bg} ${config.color} focus:outline-none focus:ring-2 focus:ring-gold/30`}
                                                    >
                                                        <option value="PENDING">Chờ xác nhận</option>
                                                        <option value="CONFIRMED">Đã xác nhận</option>
                                                        <option value="COMPLETED">Hoàn thành</option>
                                                        <option value="CANCELLED">Đã hủy</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-coffee/5 text-coffee rounded-lg hover:bg-coffee/10 transition-colors text-sm font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 bg-coffee text-cream flex items-center justify-between rounded-t-2xl">
                            <h3 className="text-lg font-bold">
                                Đơn hàng #{selectedOrder.id.slice(-6).toUpperCase()}
                            </h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Customer Info */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-coffee uppercase tracking-wider">
                                    Thông tin khách hàng
                                </h4>
                                <div className="bg-cream/50 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="w-4 h-4 text-gold" />
                                        <span className="font-medium">
                                            {selectedOrder.customerName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-gold" />
                                        <span>{selectedOrder.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-gold" />
                                        <span>{selectedOrder.address}</span>
                                    </div>
                                    {selectedOrder.note && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <MessageSquare className="w-4 h-4 text-gold mt-0.5" />
                                            <span className="italic text-gray-600">
                                                {selectedOrder.note}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-coffee uppercase tracking-wider">
                                    Sản phẩm đã đặt
                                </h4>
                                <ul className="space-y-2">
                                    {selectedOrder.items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between p-3 bg-cream/30 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-coffee text-sm">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    x{item.quantity} ·{" "}
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </p>
                                            </div>
                                            <span className="font-bold text-coffee text-sm">
                                                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="font-bold text-coffee uppercase tracking-wider">
                                    Tổng cộng
                                </span>
                                <span className="text-2xl font-black text-gold">
                                    {selectedOrder.totalAmount.toLocaleString("vi-VN")}đ
                                </span>
                            </div>

                            {/* Status */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Trạng thái:</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_CONFIG[selectedOrder.status]?.bg
                                        } ${STATUS_CONFIG[selectedOrder.status]?.color}`}
                                >
                                    {STATUS_CONFIG[selectedOrder.status]?.label}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Ngày đặt:</span>
                                <span className="text-sm font-medium">
                                    {formatDate(selectedOrder.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
