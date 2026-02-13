const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.unit.deleteMany({});

    // Create Categories
    const caphe = await prisma.category.create({ data: { name: "Cà phê" } });
    const tra = await prisma.category.create({ data: { name: "Trà & Trà Sữa" } });
    const banh = await prisma.category.create({ data: { name: "Bánh Ngọt" } });

    // Create Units
    const ly = await prisma.unit.create({ data: { name: "Ly" } });
    const cai = await prisma.unit.create({ data: { name: "Cái" } });
    const goi = await prisma.unit.create({ data: { name: "Gói" } });

    // Create Products
    const products = [
        {
            name: "Cà phê Muối",
            price: 35000,
            categoryId: caphe.id,
            unitId: ly.id,
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
            stock: 50,
        },
        {
            name: "Bạc Xỉu Aura",
            price: 29000,
            categoryId: caphe.id,
            unitId: ly.id,
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400",
            stock: 50,
        },
        {
            name: "Trà Đào Cam Sả",
            price: 45000,
            categoryId: tra.id,
            unitId: ly.id,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400",
            stock: 30,
        },
        {
            name: "Croissant Phô Mai",
            price: 32000,
            categoryId: banh.id,
            unitId: cai.id,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
            stock: 15,
        },
        {
            name: "Matcha Latte",
            price: 49000,
            categoryId: tra.id,
            unitId: ly.id,
            image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400",
            stock: 25,
        },
        {
            name: "Espresso Đậm Đà",
            price: 25000,
            categoryId: caphe.id,
            unitId: ly.id,
            image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400",
            stock: 100,
        },
    ];

    for (const product of products) {
        await prisma.product.create({ data: product });
    }

    console.log("Seeding finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
