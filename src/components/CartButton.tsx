import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <>
      <button
        type="button"
        onClick={openCart}
        aria-label={`Abrir sacola${count > 0 ? ` com ${count} ${count === 1 ? "item" : "itens"}` : ""}`}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-lavender-soft/60 text-plum transition-colors hover:bg-lavender-soft"
      >
        <ShoppingBag className="h-4 w-4" aria-hidden />
        {count > 0 && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-lavender px-1 text-[10px] font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
      <CartDrawer />
    </>
  );
}
