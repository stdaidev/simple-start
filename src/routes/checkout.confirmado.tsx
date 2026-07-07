import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground selection:bg-lavender-soft selection:text-plum">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 md:px-12 md:py-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-plum">
            Lovbeauty
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:flex">
              <Link to="/" className="transition-colors hover:text-lavender">
                Início
              </Link>
              <Link to="/produtos" className="transition-colors hover:text-lavender">
                Coleção
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="pt-16 md:pt-24">
          {order ? (
            <section className="rounded-[40px] border border-blush/60 bg-blush-soft/40 p-8 md:p-14">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-14 w-14 text-lavender" aria-hidden />
                <span className="mt-6 inline-flex rounded-full bg-lavender-soft px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum">
                  Simulação — nenhuma cobrança foi realizada
                </span>
                <h1 className="mt-6 font-display text-5xl leading-[0.95] text-plum md:text-6xl">
                  Ritual confirmado
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Este é um pedido de demonstração. Guarde o número abaixo para
                  referência da simulação.
                </p>
                <p className="mt-8 font-display text-3xl tracking-widest text-lavender md:text-4xl">
                  {order.orderNumber}
                </p>
              </div>

              <div className="mt-10 rounded-3xl border border-blush/60 bg-background p-6 md:p-8">
                <h2 className="font-display text-2xl text-plum">Itens</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {order.items.map((it) => (
                    <li
                      key={it.productId}
                      className="flex items-start justify-between gap-3 border-b border-blush/40 pb-3 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-plum">{it.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {it.qty} × {formatBRL(it.unitPrice)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-lavender">
                        {formatBRL(it.lineTotal)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-baseline justify-between border-t border-blush/60 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Total
                  </span>
                  <span className="font-display text-2xl text-plum">
                    {formatBRL(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center gap-3 md:flex-row md:justify-center">
                <Link
                  to="/produtos"
                  className="inline-flex rounded-full bg-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
                >
                  Continuar comprando
                </Link>
                <Link
                  to="/"
                  className="inline-flex rounded-full border border-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-plum transition-colors hover:bg-lavender-soft/60"
                >
                  Voltar para o início
                </Link>
              </div>
            </section>
          ) : (
            <section className="rounded-[40px] bg-blush-soft/60 p-10 text-center md:p-16">
              <h1 className="font-display text-4xl text-plum md:text-5xl">
                Nada por aqui
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Não encontramos um pedido para exibir. Comece um novo ritual
                pela coleção.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex rounded-full bg-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Ver a coleção
              </Link>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
