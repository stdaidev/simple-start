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
              <Link to="/produtos" className="transition-colors hover:text-lavender">
                Coleção
              </Link>
              <Link to="/carrinho" className="transition-colors hover:text-lavender">
                Sacola
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="pt-12 md:pt-16">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-lavender-soft px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum">
              Checkout
            </span>
            <h1 className="font-display text-5xl leading-[0.95] text-plum md:text-6xl">
              Quase lá
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Preencha seus dados para simular a finalização. Nenhuma cobrança
              será realizada e nada é enviado para servidores externos.
            </p>
          </div>

          {count === 0 ? (
            <div className="mt-12 rounded-[40px] bg-blush-soft/60 p-10 text-center md:p-16">
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
                Sua sacola está vazia. Escolha itens antes de finalizar.
              </p>
              <Link
                to="/produtos"
                className="mt-8 inline-flex rounded-full bg-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Ver a coleção
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]"
              noValidate
            >
              <section className="space-y-8">
                <fieldset className="space-y-5">
                  <legend className="font-display text-2xl text-plum">
                    Contato
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
                  <legend className="font-display text-2xl text-plum">
                    Entrega
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

              <aside className="h-fit rounded-3xl border border-blush/60 p-6 md:sticky md:top-8 md:p-8">
                <h2 className="font-display text-2xl text-plum">Resumo</h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {lines.map(({ product, qty, lineTotal }) => (
                    <li
                      key={product.id}
                      className="flex items-start justify-between gap-3 border-b border-blush/40 pb-3 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-plum">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {qty} × {formatBRL(product.price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-lavender">
                        {formatBRL(lineTotal)}
                      </p>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="text-plum">{formatBRL(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Frete</dt>
                    <dd className="text-plum">Grátis (simulação)</dd>
                  </div>
                  <div className="flex justify-between border-t border-blush/60 pt-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      Total
                    </dt>
                    <dd className="font-display text-2xl text-plum">
                      {formatBRL(subtotal)}
                    </dd>
                  </div>
                </dl>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full rounded-full bg-lavender px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSubmitting ? "Processando..." : "Confirmar pedido"}
                </button>
                <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Simulação — nenhuma cobrança
                </p>
                <Link
                  to="/carrinho"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-lavender px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-plum transition-colors hover:bg-lavender-soft/60"
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
        className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-2xl border border-blush bg-background px-4 py-3 text-sm text-plum outline-none transition-colors focus:border-lavender focus:ring-2 focus:ring-lavender-soft ${
          error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
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
