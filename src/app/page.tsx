import Header from "@/components/Header";
import StoreFront from "@/components/StoreFront";
import { getProducts } from "./actions/product";
import { getCategories } from "./actions/category";
import { Coffee } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-coffee">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Placeholder for background image or gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-coffee via-transparent to-gold/20" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-cream uppercase tracking-[0.2em] mb-4">
            Tỉnh Thức
          </h1>
          <p className="text-gold italic text-xl md:text-2xl font-light mb-8">
            Hương vị nguyên bản, tâm hồn an nhiên
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-gold/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background">
        <StoreFront initialProducts={products} categories={categories} />
      </section>

      {/* Footer */}
      <footer className="bg-coffee text-cream/50 py-12 border-t border-gold/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Coffee className="w-8 h-8 text-gold opacity-50 transition-opacity hover:opacity-100" />
          </div>
          <p className="text-sm uppercase tracking-widest">&copy; 2026 Aura Cafe Management System</p>
          <p className="text-[10px] mt-2 opacity-30">Designed for Premium Experience</p>
        </div>
      </footer>
    </main>
  );
}
