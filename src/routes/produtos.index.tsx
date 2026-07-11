import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CartButton } from "@/components/CartButton";
import { CATEGORIES, products, type Category } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";

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

        <main className="pt-12 md:pt-16">
          <section className="rule-double grid grid-cols-12 gap-x-6 pt-8 pb-16">
            <div className="col-span-12 mb-6 flex items-baseline justify-between">
              <span className="section-number text-sm">Coleção — 15 produtos</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                Estação · Verão 26
              </span>
            </div>
            <div className="col-span-12 md:col-span-7">
              <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-ink md:text-7xl lg:text-8xl">
                O ritual <em className="text-clay">completo</em>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-[1.55] text-ink-soft">
                Curadoria de skincare, cabelo e corpo pensada para o dia a dia
                de mulheres que querem cuidar de si sem abrir mão do prazer
                sensorial.
              </p>
            </div>
            <div className="col-span-12 mt-8 aspect-[4/5] overflow-hidden bg-blush-soft md:col-span-4 md:col-start-9 md:mt-0 md:aspect-auto">
              <img
                src={heroBanner}
                alt="Coleção Lovbeauty"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          <section className="space-y-10 pt-16">
            <div
              role="tablist"
              aria-label="Filtrar por categoria"
              className="rule flex flex-wrap items-center gap-2 pt-4"
            >
              {CATEGORIES.map((cat) => {
                const active = filter === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat.value)}
                    className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors ${
                      active
                        ? "bg-ink text-paper"
                        : "text-dusk hover:text-ink"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              <span className="ml-auto self-center text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                {visible.length}{" "}
                {visible.length === 1 ? "produto" : "produtos"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
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
