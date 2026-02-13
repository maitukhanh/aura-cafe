"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { name: "asc" },
    });
}

export async function createCategory(name: string) {
    const category = await prisma.category.create({
        data: { name },
    });
    revalidatePath("/admin");
    return category;
}

export async function updateCategory(id: string, name: string) {
    const category = await prisma.category.update({
        where: { id },
        data: { name },
    });
    revalidatePath("/admin");
    return category;
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: { id },
    });
    revalidatePath("/admin");
}
