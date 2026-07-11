import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { CartButton } from "@/components/CartButton";
import { useCart } from "@/lib/cart-context";
import { formatBRL, products, type Product } from "@/data/products";

const categoryLabel: Record<Product["category"], string> = {
  skincare: "Skincare",
  cabelo: "Cabelo",
  corpo: "Corpo",
};


type CategoryCopy = {
  uso: string;
  beneficios: string;
};

const categoryCopy: Record<Product["category"], CategoryCopy> = {
  skincare: {
    uso: "Aplique na pele limpa e seca, de manhã e/ou à noite, em movimentos suaves.",
    beneficios:
      "Hidrata, uniformiza o tom e prepara a pele para o restante do ritual.",
  },
  cabelo: {
    uso: "Use nos fios úmidos após a lavagem; distribua no comprimento e nas pontas.",
    beneficios:
      "Nutre, sela cutículas e devolve brilho e maciez sem pesar nos fios.",
  },
  corpo: {
    uso: "Aplique na pele limpa após o banho, massageando até completa absorção.",
    beneficios:
      "Hidrata profundamente e perfuma a pele com um toque sensorial e delicado.",
  },
};

export const Route = createFileRoute("/produtos/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Lovbeauty — Produto não encontrado" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `Lovbeauty — ${product.name}`;
    const description = product.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produtos/${product.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produtos/${product.slug}` }],
    };
  },
  component: ProdutoDetalhe,
  notFoundComponent: ProdutoNaoEncontrado,
});

function ProdutoDetalhe() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addItem, openCart } = useCart();
  const copy = categoryCopy[product.category];

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
              <Link
                to="/produtos"
                className="transition-colors hover:text-lavender"
              >
                Coleção
              </Link>
            </nav>
            <CartButton />
          </div>
        </header>

        <main className="pt-12 md:pt-16">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-lavender"
          >
            <span aria-hidden>←</span> Voltar para coleção
          </Link>

          <article className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-square overflow-hidden bg-blush-soft">
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper mix-blend-difference">
                {categoryLabel[product.category]}
              </span>
            </div>

            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-5">
                <span className="section-number text-sm">
                  {categoryLabel[product.category]}
                </span>
                <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-6xl">
                  {product.name}
                </h1>
                <p className="text-lg leading-[1.6] text-ink-soft">
                  {product.description}
                </p>
                <p className="price-display rule pt-4 text-3xl text-clay">
                  {formatBRL(product.price)}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product);
                    toast.success("Adicionado à sacola", {
                      description: product.name,
                      action: {
                        label: "Ver sacola",
                        onClick: () => openCart(),
                      },
                    });
                  }}
                  className="inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay md:w-auto"
                >
                  Adicionar ao carrinho <span aria-hidden>→</span>
                </button>
              </div>

              <section
                aria-label="Detalhes do produto"
                className="space-y-4 border-t border-blush pt-8"
              >
                <h2 className="font-display text-xl text-plum">Detalhes</h2>
                <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Categoria
                    </dt>
                    <dd className="mt-1 text-plum">
                      {categoryLabel[product.category]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      SKU
                    </dt>
                    <dd className="mt-1 text-plum">{product.id.toUpperCase()}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Modo de uso
                    </dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">
                      {copy.uso}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Benefícios
                    </dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">
                      {copy.beneficios}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

function ProdutoNaoEncontrado() {
  const { slug } = Route.useParams();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16 md:px-12">
        <span className="inline-flex rounded-full bg-lavender-soft px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum">
          Produto não encontrado
        </span>
        <h1 className="font-display text-4xl leading-[1.05] text-plum md:text-5xl">
          Não encontramos "{slug}"
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          Esse produto pode ter saído da coleção ou o link está incorreto.
          Explore a coleção completa para descobrir outros rituais.
        </p>
        <Link
          to="/produtos"
          className="rounded-full bg-lavender px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Ver a coleção
        </Link>
      </div>
    </div>
  );
}
