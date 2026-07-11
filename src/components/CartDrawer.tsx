import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatBRL, type Product } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const categoryLabel: Record<Product["category"], string> = {
  skincare: "Skincare",
  cabelo: "Cabelo",
  corpo: "Corpo",
};

export function CartDrawer() {
  const { isOpen, setOpen, closeCart, lines, count, subtotal, updateQty, removeItem } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-rule bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="rule px-6 pt-6 pb-4 text-left">
          <div className="flex items-baseline justify-between">
            <SheetTitle className="font-display text-3xl leading-none text-ink">
              Sacola
            </SheetTitle>
            <span className="section-number text-sm">
              {count === 0 ? "—" : String(count).padStart(2, "0")}
            </span>
          </div>
          <SheetDescription className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
            {count === 0
              ? "Nenhum item ainda"
              : `${count} ${count === 1 ? "item" : "itens"}`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <span className="section-number text-sm">Vazia</span>
            <p className="text-sm leading-relaxed text-dusk">
              Sua sacola está vazia. Descubra a coleção para começar seu ritual.
            </p>
            <Link
              to="/produtos"
              onClick={closeCart}
              className="inline-flex items-center gap-3 bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
            >
              Explorar coleção <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-rule overflow-y-auto px-6">
            {lines.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex gap-4 py-5">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-blush-soft">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-dusk">
                        {categoryLabel[product.category]}
                      </p>
                      <p className="truncate font-display text-lg leading-tight text-ink">
                        {product.name}
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
                    <p className="price-display text-base text-clay">
                      {formatBRL(lineTotal)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="rule-double px-6 pt-5 pb-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                Subtotal
              </span>
              <span className="price-display text-3xl text-ink">
                {formatBRL(subtotal)}
              </span>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full bg-ink px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
              >
                Finalizar compra →
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk underline underline-offset-[6px] decoration-1 transition-colors hover:text-ink"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
