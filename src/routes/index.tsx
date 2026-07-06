import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Cuidados para pele, cabelo e corpo" },
      {
        name: "description",
        content:
          "Descubra a Lovbeauty: cosméticos selecionados de skincare, cabelo e corpo para você cuidar de si com carinho todos os dias.",
      },
      {
        property: "og:title",
        content: "Lovbeauty — Cuidados para pele, cabelo e corpo",
      },
      {
        property: "og:description",
        content:
          "Uma vitrine de cosméticos pensada para mulheres que valorizam cuidados diários com pele, cabelo e corpo.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categorias = [
  {
    slug: "skincare",
    nome: "Skincare",
    descricao:
      "Rotina de limpeza, hidratação e proteção para uma pele saudável e viçosa.",
    emoji: "✨",
  },
  {
    slug: "cabelo",
    nome: "Cabelo",
    descricao:
      "Cuidado dos fios ao couro cabeludo: shampoos, máscaras e finalizadores.",
    emoji: "🌿",
  },
  {
    slug: "corpo",
    nome: "Corpo",
    descricao:
      "Hidratantes, óleos e cuidados especiais para uma pele macia dos pés à cabeça.",
    emoji: "🌸",
  },
];

function Index() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a
          href="/"
          className="text-2xl tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Lovbeauty
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#categorias" className="hover:text-foreground">
            Categorias
          </a>
          <a href="#sobre" className="hover:text-foreground">
            Sobre
          </a>
          <a href="#categorias" className="hover:text-foreground">
            Loja
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-widest text-secondary-foreground">
                Nova coleção
              </span>
              <h1
                className="mt-5 text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Cuidados que a<br />
                sua pele merece.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Uma seleção pensada para o seu ritual diário — do skincare ao
                banho — para você se sentir bem em cada gesto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#categorias"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Ver catálogo
                </a>
                <a
                  href="#sobre"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Conhecer a marca
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/5] w-full rounded-3xl border border-border"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(0.9 0.05 25) 0%, oklch(0.78 0.08 25) 50%, oklch(0.68 0.11 15) 100%)",
                }}
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-lg sm:block">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Ritual diário
                </p>
                <p
                  className="mt-1 text-lg text-foreground"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Skincare · Cabelo · Corpo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section
          id="categorias"
          className="border-t border-border bg-muted/40 py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Categorias
              </p>
              <h2
                className="mt-2 text-3xl tracking-tight text-foreground sm:text-4xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Um cuidado para cada momento.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categorias.map((cat) => (
                <article
                  key={cat.slug}
                  className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary"
                >
                  <div className="text-4xl">{cat.emoji}</div>
                  <h3
                    className="mt-6 text-2xl text-card-foreground"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                    }}
                  >
                    {cat.nome}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cat.descricao}
                  </p>
                  <span className="mt-6 inline-block text-sm font-medium text-primary">
                    Em breve →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Sobre a Lovbeauty
            </p>
            <h2
              className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Beleza é um cuidado gentil, todos os dias.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Selecionamos produtos que respeitam a sua pele, o seu cabelo e o
              seu tempo. Fórmulas cuidadosas, texturas gostosas e resultados que
              você sente no espelho e no toque.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <p
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            className="text-foreground"
          >
            Lovbeauty
          </p>
          <p>© {new Date().getFullYear()} Lovbeauty. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
