import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartButton } from "@/components/CartButton";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/data/products";
import {
  checkoutSchema,
  generateOrderNumber,
  type CheckoutForm,
  type OrderSnapshot,
} from "@/lib/checkout-schema";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Checkout" },
      {
        name: "description",
        content:
          "Finalize seu ritual Lovbeauty. Checkout simulado, sem cobrança real.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Lovbeauty — Checkout" },
      {
        property: "og:description",
        content: "Checkout simulado da vitrine Lovbeauty.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, count, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      zip: "",
      address: "",
      number: "",
      complement: "",
      city: "",
      state: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async () => {
    const snapshot: OrderSnapshot = {
      orderNumber: generateOrderNumber(),
      items: lines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        category: l.product.category,
        qty: l.qty,
        unitPrice: l.product.price,
        lineTotal: l.lineTotal,
      })),
      subtotal,
      total: subtotal,
      createdAt: new Date().toISOString(),
    };
    clear();
    await navigate({
      to: "/checkout/confirmado",
      state: ((prev: Record<string, unknown>) => ({ ...prev, order: snapshot })) as never,
    });
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay-soft selection:text-ink">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
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
              <Link to="/carrinho" className="transition-colors hover:text-ink">
                Sacola
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="pt-12 md:pt-16">
          <section className="rule-double grid grid-cols-12 gap-x-6 pt-8 pb-10">
            <div className="col-span-12 mb-6 flex items-baseline justify-between">
              <span className="section-number text-sm">Checkout — Simulação</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                Sem cobrança real
              </span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-ink md:text-7xl">
                Quase <em className="text-clay">lá</em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-[1.6] text-ink-soft">
                Preencha seus dados para simular a finalização. Nenhuma cobrança
                será realizada e nada é enviado para servidores externos.
              </p>
            </div>
          </section>

          {count === 0 ? (
            <div className="mt-12 border border-rule p-12 text-center md:p-20">
              <span className="section-number text-sm">Vazia</span>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-dusk">
                Sua sacola está vazia. Escolha itens antes de finalizar.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
              >
                Ver a coleção <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]"
              noValidate
            >
              <section className="space-y-12">
                <fieldset className="space-y-5">
                  <legend className="rule flex w-full items-baseline justify-between pt-2">
                    <span className="font-display text-3xl text-ink">Contato</span>
                    <span className="section-number text-sm">01</span>
                  </legend>
                  <Field
                    id="fullName"
                    label="Nome completo"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field
                      id="email"
                      label="E-mail"
                      type="email"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <Field
                      id="phone"
                      label="Telefone"
                      inputMode="tel"
                      autoComplete="tel"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-5">
                  <legend className="rule flex w-full items-baseline justify-between pt-2">
                    <span className="font-display text-3xl text-ink">Entrega</span>
                    <span className="section-number text-sm">02</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr]">
                    <Field
                      id="zip"
                      label="CEP"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      error={errors.zip?.message}
                      {...register("zip")}
                    />
                    <Field
                      id="address"
                      label="Endereço"
                      autoComplete="street-address"
                      error={errors.address?.message}
                      {...register("address")}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr]">
                    <Field
                      id="number"
                      label="Número"
                      error={errors.number?.message}
                      {...register("number")}
                    />
                    <Field
                      id="complement"
                      label="Complemento (opcional)"
                      error={errors.complement?.message}
                      {...register("complement")}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
                    <Field
                      id="city"
                      label="Cidade"
                      autoComplete="address-level2"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                    <Field
                      id="state"
                      label="UF"
                      maxLength={2}
                      autoComplete="address-level1"
                      error={errors.state?.message}
                      {...register("state")}
                    />
                  </div>
                </fieldset>
              </section>

              <aside className="h-fit border border-rule p-6 md:sticky md:top-8 md:p-8">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-3xl text-ink">Resumo</h2>
                  <span className="section-number text-sm">03</span>
                </div>
                <ul className="mt-6 divide-y divide-rule border-t border-rule">
                  {lines.map(({ product, qty, lineTotal }) => (
                    <li
                      key={product.id}
                      className="flex items-start justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-ink">{product.name}</p>
                        <p className="text-xs text-dusk">
                          {qty} × {formatBRL(product.price)}
                        </p>
                      </div>
                      <p className="price-display text-sm text-clay">
                        {formatBRL(lineTotal)}
                      </p>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-dusk">Subtotal</dt>
                    <dd className="text-ink">{formatBRL(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-dusk">Frete</dt>
                    <dd className="text-ink">Grátis (simulação)</dd>
                  </div>
                  <div className="rule flex items-baseline justify-between pt-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                      Total
                    </dt>
                    <dd className="price-display text-3xl text-ink">
                      {formatBRL(subtotal)}
                    </dd>
                  </div>
                </dl>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay disabled:opacity-60"
                >
                  {isSubmitting ? "Processando..." : "Confirmar pedido"}
                  {!isSubmitting && <span aria-hidden>→</span>}
                </button>
                <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-dusk">
                  Simulação — nenhuma cobrança
                </p>
                <Link
                  to="/carrinho"
                  className="mt-4 inline-flex w-full items-center justify-center py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk underline underline-offset-[6px] decoration-1 transition-colors hover:text-ink"
                >
                  Voltar para a sacola
                </Link>
              </aside>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

const Field = ({ id, label, error, className, ...rest }: FieldProps) => {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors focus:border-ink ${
          error ? "border-destructive focus:border-destructive" : ""
        } ${className ?? ""}`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};
