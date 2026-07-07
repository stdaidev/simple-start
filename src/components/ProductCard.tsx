import { Link } from "@tanstack/react-router";
import { formatBRL, type Product } from "@/data/products";

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
    <Link
      to="/produtos/$slug"
      params={{ slug: product.slug }}
      className={`group flex flex-col gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-4 focus-visible:ring-offset-background ${offset ? "md:translate-y-8" : ""}`}
    >
      <article className="flex flex-col gap-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-tr-[80px] rounded-bl-[32px] bg-blush-soft">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-plum backdrop-blur">
            {categoryLabel[product.category]}
          </span>
        </div>
        <div className="space-y-2 px-1">
          <h3 className="font-display text-2xl leading-tight text-plum transition-colors group-hover:text-lavender">
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
    </Link>
  );
}
