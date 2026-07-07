import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartButton } from "@/components/CartButton";
import { useCart } from "@/lib/cart-context";
import { formatBRL, type Product } from "@/data/products";

const surfaceMap: Record<Product["surface"], string> = {
  blush: "bg-blush",
  "blush-soft": "bg-blush-soft",
  "iris-soft": "bg-iris-soft",
  "lavender-soft": "bg-lavender-soft",
};

const gradientMap: Record<Product["gradient"], string> = {
  blush: "var(--gradient-blush)",
  lavender: "var(--gradient-lavender)",
  hero: "var(--gradient-hero)",
};

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
    <div className="min-h-screen bg-background text-foreground selection:bg-lavender-soft selection:text-plum">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-12 md:py-12">
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
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-lavender-soft px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum">
              Sacola
            </span>
            <h1 className="font-display text-5xl leading-[0.95] text-plum md:text-6xl">
              Seu ritual
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {count === 0
                ? "Nenhum item por enquanto"
                : `${count} ${count === 1 ? "item" : "itens"}`}
            </p>
          </div>

          {lines.length === 0 ? (
            <div className="mt-12 rounded-[40px] bg-blush-soft/60 p-10 text-center md:p-16">
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
                Sua sacola está vazia. Explore a coleção completa para começar a
                montar seu ritual Lovbeauty.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex rounded-full bg-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Ver a coleção
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
              <ul className="space-y-4">
                {lines.map(({ product, qty, lineTotal }) => (
                  <li
                    key={product.id}
                    className="flex gap-5 rounded-3xl border border-blush/60 p-4 md:p-5"
                  >
                    <Link
                      to="/produtos/$slug"
                      params={{ slug: product.slug }}
                      className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-28 ${surfaceMap[product.surface]}`}
                    >
                      <div
                        className="absolute inset-2 rounded-xl opacity-80"
                        style={{ backgroundImage: gradientMap[product.gradient] }}
                        aria-hidden
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {categoryLabel[product.category]}
                          </p>
                          <Link
                            to="/produtos/$slug"
                            params={{ slug: product.slug }}
                            className="mt-1 block truncate font-display text-lg text-plum transition-colors hover:text-lavender md:text-xl"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatBRL(product.price)} un.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remover ${product.name}`}
                          className="text-muted-foreground transition-colors hover:text-plum"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="inline-flex items-center gap-2 rounded-full bg-lavender-soft/60 px-2 py-1"
                          role="group"
                          aria-label={`Quantidade de ${product.name}`}
                        >
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, qty - 1)}
                            disabled={qty <= 1}
                            aria-label="Diminuir quantidade"
                            className="rounded-full p-1 text-plum transition-opacity disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-semibold text-plum">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, qty + 1)}
                            aria-label="Aumentar quantidade"
                            className="rounded-full p-1 text-plum"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-base font-semibold text-lavender">
                          {formatBRL(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="h-fit rounded-3xl border border-blush/60 p-6 md:p-8">
                <h2 className="font-display text-2xl text-plum">Resumo</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Itens</dt>
                    <dd className="text-plum">{count}</dd>
                  </div>
                  <div className="flex justify-between border-t border-blush/60 pt-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      Subtotal
                    </dt>
                    <dd className="font-display text-2xl text-plum">
                      {formatBRL(subtotal)}
                    </dd>
                  </div>
                </dl>
                <Link
                  to="/checkout"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-lavender px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
                >
                  Finalizar compra
                </Link>
                <Link
                  to="/produtos"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-lavender px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-plum transition-colors hover:bg-lavender-soft/60"
                >
                  Continuar comprando
                </Link>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
