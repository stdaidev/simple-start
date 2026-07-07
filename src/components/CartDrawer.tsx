import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
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
        className="flex w-full flex-col gap-0 border-blush bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-blush px-6 py-5 text-left">
          <SheetTitle className="font-display text-2xl text-plum">
            Sua sacola
          </SheetTitle>
          <SheetDescription className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {count === 0
              ? "Nenhum item ainda"
              : `${count} ${count === 1 ? "item" : "itens"}`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-lavender" aria-hidden />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sua sacola está vazia. Descubra a coleção para começar seu ritual.
            </p>
            <Link
              to="/produtos"
              onClick={closeCart}
              className="rounded-full bg-lavender px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              Explorar coleção
            </Link>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {lines.map(({ product, qty, lineTotal }) => (
              <li
                key={product.id}
                className="flex gap-4 rounded-2xl border border-blush/60 p-3"
              >
                <div
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl ${surfaceMap[product.surface]}`}
                >
                  <div
                    className="absolute inset-2 rounded-lg opacity-80"
                    style={{ backgroundImage: gradientMap[product.gradient] }}
                    aria-hidden
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {categoryLabel[product.category]}
                      </p>
                      <p className="truncate font-display text-base leading-tight text-plum">
                        {product.name}
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
                    <p className="text-sm font-semibold text-lavender">
                      {formatBRL(lineTotal)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="border-t border-blush px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Subtotal
              </span>
              <span className="font-display text-2xl text-plum">
                {formatBRL(subtotal)}
              </span>
            </div>
            <div className="mt-5 space-y-3">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full rounded-full bg-lavender px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Finalizar compra
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full rounded-full border border-lavender px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-plum transition-colors hover:bg-lavender-soft/60"
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
