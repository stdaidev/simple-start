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
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-4 focus-visible:ring-offset-background ${offset ? "md:translate-y-8" : ""}`}
    >
      <article className="flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-blush-soft">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper mix-blend-difference">
            {categoryLabel[product.category]}
          </span>
        </div>

        <div className="rule mt-5 pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl leading-[1.05] text-ink transition-colors group-hover:text-clay">
              {product.name}
            </h3>
            <span className="price-display shrink-0 text-lg text-clay">
              {formatBRL(product.price)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-dusk">
            {product.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
