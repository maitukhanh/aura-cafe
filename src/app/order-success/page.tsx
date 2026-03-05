import Link from "next/link";
import { CheckCircle, Coffee, ArrowLeft, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="bg-coffee text-cream shadow-lg">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-gold" />
                        <span className="text-lg font-bold tracking-wider uppercase">
                            Aura Cafe
                        </span>
                    </div>
                </div>
            </header>

            {/* Success Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    {/* Animated Check Icon */}
                    <div className="relative mx-auto w-28 h-28 mb-8">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                        <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-200">
                            <CheckCircle className="w-14 h-14 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-coffee mb-4 uppercase tracking-wide">
                        Đặt hàng thành công!
                    </h1>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                        <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                            <Coffee className="w-6 h-6 text-gold" />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Chúng tôi đã nhận được đơn hàng của bạn.
                            <br />
                            <span className="font-semibold text-coffee">
                                Nhân viên sẽ liên hệ xác nhận sớm nhất.
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-coffee text-gold font-bold px-8 py-3 rounded-xl hover:bg-coffee/90 transition-all active:scale-[0.98] shadow-lg"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
