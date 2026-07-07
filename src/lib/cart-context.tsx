import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

const STORAGE_KEY = "lovbeauty:cart:v1";

export type CartItem = { productId: string; qty: number };

type State = { items: CartItem[] };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; productId: string }
  | { type: "remove"; productId: string }
  | { type: "update"; productId: string; qty: number }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const existing = state.items.find((i) => i.productId === action.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.productId ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { productId: action.productId, qty: 1 }] };
    }
    case "remove":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "update": {
      const qty = Math.max(1, Math.floor(action.qty));
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, qty } : i,
        ),
      };
    }
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

export type CartLine = { product: Product; qty: number; lineTotal: number };

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { items?: CartItem[] };
    if (!parsed?.items || !Array.isArray(parsed.items)) return [];
    return parsed.items
      .filter(
        (i): i is CartItem =>
          typeof i?.productId === "string" &&
          typeof i?.qty === "number" &&
          i.qty > 0,
      )
      .filter((i) => products.some((p) => p.id === i.productId));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const items = readStorage();
    if (items.length > 0) dispatch({ type: "hydrate", items });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items }),
      );
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [state.items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = state.items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        if (!product) return null;
        return { product, qty: i.qty, lineTotal: product.price * i.qty };
      })
      .filter((l): l is CartLine => l !== null);

    const count = lines.reduce((acc, l) => acc + l.qty, 0);
    const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);

    return {
      items: state.items,
      lines,
      count,
      subtotal,
      addItem: (product) => dispatch({ type: "add", productId: product.id }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      updateQty: (productId, qty) => dispatch({ type: "update", productId, qty }),
      clear: () => dispatch({ type: "clear" }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setOpen: setIsOpen,
    };
  }, [state.items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
