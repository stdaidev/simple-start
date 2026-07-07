import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CartButton } from "@/components/CartButton";
import { CATEGORIES, products, type Category } from "@/data/products";

type Filter = Category | "todos";

export const Route = createFileRoute("/produtos/")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Coleção completa de skincare, cabelo e corpo" },
      {
        name: "description",
        content:
          "Explore a coleção Lovbeauty: 15 produtos autorais de skincare, cabelo e corpo em uma curadoria brasileira feita para o seu ritual diário.",
      },
      {
        property: "og:title",
        content: "Lovbeauty — Coleção completa de skincare, cabelo e corpo",
      },
      {
        property: "og:description",
        content:
          "Curadoria brasileira de skincare, cabelo e corpo. Fórmulas eficazes para um ritual sensorial e sem complicação.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/produtos" },
    ],
    links: [{ rel: "canonical", href: "/produtos" }],
  }),
  component: Produtos,
});

function Produtos() {
  const [filter, setFilter] = useState<Filter>("todos");

  const visible = useMemo(
    () =>
      filter === "todos"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-lavender-soft selection:text-plum">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-12 md:py-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-plum">
            Lovbeauty
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:flex">
              <Link to="/" className="transition-colors hover:text-lavender">
                Início
              </Link>
              <Link
                to="/produtos"
                className="transition-colors hover:text-lavender"
              >
                Coleção
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="space-y-16 pt-16 md:pt-20">
          <section className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-lavender-soft px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum">
                Coleção · 15 produtos
              </span>
              <h1 className="font-display text-5xl leading-[0.95] text-plum md:text-6xl lg:text-7xl">
                O ritual <span className="text-lavender">completo</span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Curadoria de skincare, cabelo e corpo pensada para o dia a dia
                de mulheres que querem cuidar de si sem abrir mão do prazer
                sensorial.
              </p>
            </div>
            <div
              className="hidden aspect-square rounded-[40px] shadow-[var(--shadow-elegant)] md:block"
              style={{ backgroundImage: "var(--gradient-lavender)" }}
              aria-hidden
            />
          </section>

          <section className="space-y-10">
            <div
              role="tablist"
              aria-label="Filtrar por categoria"
              className="flex flex-wrap gap-3 border-b border-blush pb-6"
            >
              {CATEGORIES.map((cat) => {
                const active = filter === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat.value)}
                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                      active
                        ? "bg-lavender text-primary-foreground shadow-[var(--shadow-soft)]"
                        : "bg-lavender-soft/60 text-plum hover:bg-lavender-soft"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              <span className="ml-auto self-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {visible.length}{" "}
                {visible.length === 1 ? "produto" : "produtos"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  offset={i % 3 === 1}
                />
              ))}
            </div>
          </section>

          <footer className="pt-16 pb-8">
            <div className="flex flex-col items-start justify-between gap-10 border-t border-blush pt-12 md:flex-row md:items-end">
              <div className="space-y-4">
                <Link to="/" className="font-display text-4xl text-plum">
                  Lovbeauty
                </Link>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Beleza autêntica, inspirada pela natureza brasileira e
                  formulada para resultados reais.
                </p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                © {new Date().getFullYear()} Lovbeauty. Feito com amor.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
