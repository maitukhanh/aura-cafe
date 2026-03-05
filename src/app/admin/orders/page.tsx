import { getOrders } from "@/app/actions/order";
import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-coffee uppercase tracking-tight">
                    Quản lý đơn hàng
                </h1>
                <p className="text-gray-500 mt-1">
                    {orders.length} đơn hàng
                </p>
            </div>

            <AdminOrdersClient initialOrders={JSON.parse(JSON.stringify(orders))} />
        </div>
    );
}
