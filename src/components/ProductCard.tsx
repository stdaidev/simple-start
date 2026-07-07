import { Link } from "@tanstack/react-router";
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

type Props = {
  product: Product;
  offset?: boolean;
};

export function ProductCard({ product, offset }: Props) {
  return (
    <article
      className={`group flex flex-col gap-5 ${offset ? "md:translate-y-8" : ""}`}
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-tr-[80px] rounded-bl-[32px] ${surfaceMap[product.surface]}`}
      >
        <div
          className="absolute inset-5 rounded-3xl opacity-80 transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: gradientMap[product.gradient] }}
          aria-hidden
        />
        <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-plum backdrop-blur">
          {categoryLabel[product.category]}
        </span>
      </div>
      <div className="space-y-2 px-1">
        <h3 className="font-display text-2xl leading-tight text-plum">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="pt-2 text-base font-semibold text-lavender">
          {formatBRL(product.price)}
        </p>
      </div>
    </article>
  );
}
