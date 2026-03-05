"use server";

import { prisma } from "@/lib/db";
import { sendTelegram } from "@/lib/telegram";
import { sendEmail } from "@/lib/email";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CreateOrderInput {
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    items: CartItem[];
}

export async function createOrder(input: CreateOrderInput) {
    const totalAmount = input.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    try {
        const order = await prisma.order.create({
            data: {
                customerName: input.customerName,
                phone: input.phone,
                address: input.address,
                note: input.note || null,
                totalAmount,
                items: {
                    create: input.items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        // Send Telegram notification (non-blocking)
        sendTelegram(
            `🛒 <b>Đơn hàng mới</b>\nKhách: ${order.customerName}\nSĐT: ${order.phone}\nTổng tiền: ${order.totalAmount.toLocaleString("vi-VN")}đ`
        ).catch(() => { });

        // Send Email notification (non-blocking)
        sendEmail(order).catch(() => { });

        return { success: true, orderId: order.id };
    } catch (error: any) {
        console.error("Lỗi khi tạo đơn hàng:", error);

        // Check if it's a Prisma Foreign Key Constraint error
        if (error?.code === "P2003") {
            return {
                success: false,
                message: "Một số sản phẩm trong giỏ hàng không còn tồn tại. Vui lòng xóa giỏ hàng và chọn lại!"
            };
        }

        return { success: false, message: "Không thể tạo đơn hàng, vui lòng thử lại sau!" };
    }
}

export async function getOrders() {
    return prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getOrderById(id: string) {
    return prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
}

export async function updateOrderStatus(id: string, status: string) {
    return prisma.order.update({
        where: { id },
        data: { status: status as any },
    });
}
