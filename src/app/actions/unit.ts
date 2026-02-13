"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUnits() {
    return await prisma.unit.findMany({
        orderBy: { name: "asc" },
    });
}

export async function createUnit(name: string) {
    const unit = await prisma.unit.create({
        data: { name },
    });
    revalidatePath("/admin");
    return unit;
}

export async function updateUnit(id: string, name: string) {
    const unit = await prisma.unit.update({
        where: { id },
        data: { name },
    });
    revalidatePath("/admin");
    return unit;
}

export async function deleteUnit(id: string) {
    await prisma.unit.delete({
        where: { id },
    });
    revalidatePath("/admin");
}
