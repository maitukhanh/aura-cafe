"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    return await prisma.product.findMany({
        include: {
            category: true,
            unit: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createProduct(data: {
    name: string;
    price: number;
    image?: string;
    stock?: number;
    categoryId: string;
    unitId: string;
}) {
    const product = await prisma.product.create({
        data,
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return product;
}

export async function updateProduct(
    id: string,
    data: {
        name?: string;
        price?: number;
        image?: string;
        stock?: number;
        categoryId?: string;
        unitId?: string;
    }
) {
    const product = await prisma.product.update({
        where: { id },
        data,
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return product;
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/");
}
