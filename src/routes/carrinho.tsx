import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartButton } from "@/components/CartButton";
import { useCart } from "@/lib/cart-context";
import { formatBRL, type Product } from "@/data/products";

const categoryLabel: Record<Product["category"], string> = {
  skincare: "Skincare",
  cabelo: "Cabelo",
  corpo: "Corpo",
};

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Sua sacola" },
      {
        name: "description",
        content:
          "Revise os itens do seu ritual antes de finalizar. Sua sacola Lovbeauty com skincare, cabelo e corpo.",
      },
      { property: "og:title", content: "Lovbeauty — Sua sacola" },
      {
        property: "og:description",
        content: "Revise seu ritual antes de finalizar a compra na Lovbeauty.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/carrinho" },
    ],
    links: [{ rel: "canonical", href: "/carrinho" }],
  }),
  component: Carrinho,
});

function Carrinho() {
  const { lines, count, subtotal, updateQty, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay-soft selection:text-ink">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
        <header className="rule-double flex items-center justify-between py-6">
          <Link to="/" className="font-display text-2xl text-ink">
            Lovbeauty<span className="text-clay">.</span>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden gap-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk md:flex">
              <Link to="/" className="transition-colors hover:text-ink">
                Início
              </Link>
              <Link to="/produtos" className="transition-colors hover:text-ink">
                Coleção
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="pt-12 md:pt-16">
          <section className="rule-double grid grid-cols-12 gap-x-6 pt-8 pb-10">
            <div className="col-span-12 mb-6 flex items-baseline justify-between">
              <span className="section-number text-sm">Sacola</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                {count === 0
                  ? "Nenhum item por enquanto"
                  : `${count} ${count === 1 ? "item" : "itens"}`}
              </span>
            </div>
            <div className="col-span-12">
              <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-ink md:text-7xl">
                Seu <em className="text-clay">ritual</em>
              </h1>
            </div>
          </section>

          {lines.length === 0 ? (
            <div className="mt-12 border border-rule p-12 text-center md:p-20">
              <span className="section-number text-sm">Vazia</span>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-dusk">
                Sua sacola está vazia. Explore a coleção completa para começar a
                montar seu ritual Lovbeauty.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
              >
                Ver a coleção <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
              <ul className="divide-y divide-rule border-t border-b border-rule">
                {lines.map(({ product, qty, lineTotal }) => (
                  <li key={product.id} className="flex gap-5 py-6">
                    <Link
                      to="/produtos/$slug"
                      params={{ slug: product.slug }}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-blush-soft md:h-28 md:w-28"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-dusk">
                            {categoryLabel[product.category]}
                          </p>
                          <Link
                            to="/produtos/$slug"
                            params={{ slug: product.slug }}
                            className="mt-1 block truncate font-display text-xl leading-tight text-ink transition-colors hover:text-clay md:text-2xl"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-dusk">
                            {formatBRL(product.price)} un.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remover ${product.name}`}
                          className="text-dusk transition-colors hover:text-clay"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="inline-flex items-center gap-2 border border-rule px-2 py-1"
                          role="group"
                          aria-label={`Quantidade de ${product.name}`}
                        >
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, qty - 1)}
                            disabled={qty <= 1}
                            aria-label="Diminuir quantidade"
                            className="p-1 text-ink transition-opacity disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-semibold text-ink">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, qty + 1)}
                            aria-label="Aumentar quantidade"
                            className="p-1 text-ink"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="price-display text-lg text-clay">
                          {formatBRL(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="h-fit border border-rule p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-3xl text-ink">Resumo</h2>
                  <span className="section-number text-sm">↳</span>
                </div>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-dusk">Itens</dt>
                    <dd className="text-ink">{count}</dd>
                  </div>
                  <div className="rule flex items-baseline justify-between pt-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                      Subtotal
                    </dt>
                    <dd className="price-display text-3xl text-ink">
                      {formatBRL(subtotal)}
                    </dd>
                  </div>
                </dl>
                <Link
                  to="/checkout"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
                >
                  Finalizar compra <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/produtos"
                  className="mt-4 inline-flex w-full items-center justify-center py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk underline underline-offset-[6px] decoration-1 transition-colors hover:text-ink"
                >
                  Continuar comprando
                </Link>
              </aside>
            </div>
          )}

          <footer className="rule-double mt-24 flex flex-col items-start justify-between gap-6 pt-8 pb-12 md:flex-row md:items-end">
            <Link to="/" className="font-display text-3xl text-ink">
              Lovbeauty<span className="text-clay">.</span>
            </Link>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dusk">
              © {new Date().getFullYear()} Lovbeauty · MVP demonstrativo
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
