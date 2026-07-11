import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { CartButton } from "@/components/CartButton";
import { formatBRL } from "@/data/products";
import type { OrderSnapshot } from "@/lib/checkout-schema";

export const Route = createFileRoute("/checkout/confirmado")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Pedido confirmado" },
      {
        name: "description",
        content: "Pedido simulado confirmado. Obrigada pelo ritual.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Lovbeauty — Pedido confirmado" },
      {
        property: "og:description",
        content: "Confirmação de pedido simulado da vitrine Lovbeauty.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CheckoutConfirmado,
});

function CheckoutConfirmado() {
  const state = useLocation({ select: (l) => l.state as unknown as { order?: OrderSnapshot } });
  const order = state?.order;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay-soft selection:text-ink">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-12">
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

        <main className="pt-16 md:pt-24">
          {order ? (
            <>
              <section className="rule-double grid grid-cols-12 gap-x-6 pt-8 pb-12">
                <div className="col-span-12 mb-6 flex items-baseline justify-between">
                  <span className="section-number text-sm">
                    Pedido — {order.orderNumber}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                    Simulação · sem cobrança
                  </span>
                </div>
                <div className="col-span-12 md:col-span-10">
                  <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-ink md:text-7xl">
                    Ritual <em className="text-clay">confirmado</em>
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-[1.6] text-ink-soft">
                    Este é um pedido de demonstração. Guarde o número acima
                    para referência da simulação — nenhum e-mail foi enviado.
                  </p>
                </div>
              </section>

              <section className="mt-10 border border-rule p-6 md:p-10">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-3xl text-ink">Itens</h2>
                  <span className="section-number text-sm">
                    {String(order.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-6 divide-y divide-rule border-t border-b border-rule">
                  {order.items.map((it) => (
                    <li
                      key={it.productId}
                      className="flex items-start justify-between gap-3 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-ink">{it.name}</p>
                        <p className="text-xs text-dusk">
                          {it.qty} × {formatBRL(it.unitPrice)}
                        </p>
                      </div>
                      <p className="price-display text-sm text-clay">
                        {formatBRL(it.lineTotal)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                    Total
                  </span>
                  <span className="price-display text-3xl text-ink">
                    {formatBRL(order.total)}
                  </span>
                </div>
              </section>

              <div className="mt-10 flex flex-col items-start gap-3 md:flex-row">
                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
                >
                  Continuar comprando <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center px-2 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink underline underline-offset-[6px] decoration-1 transition-colors hover:text-clay"
                >
                  Voltar para o início
                </Link>
              </div>
            </>
          ) : (
            <section className="border border-rule p-12 text-center md:p-20">
              <span className="section-number text-sm">Sem pedido</span>
              <h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">
                Nada por <em className="text-clay">aqui</em>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-dusk">
                Não encontramos um pedido para exibir. Comece um novo ritual
                pela coleção.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
              >
                Ver a coleção <span aria-hidden>→</span>
              </Link>
            </section>
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
