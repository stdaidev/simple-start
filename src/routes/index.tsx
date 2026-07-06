import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Testando LDK" },
      { name: "description", content: "Testando LDK" },
    ],
  }),
  component: Index,
});

const categories = [
  {
    name: "Skincare",
    tagline: "Rituais de pele que respeitam o seu tempo",
    description:
      "Séruns, hidratantes e protetores para uma rotina simples e eficaz.",
  },
  {
    name: "Cabelo",
    tagline: "Fios com brilho, movimento e cuidado real",
    description:
      "Do shampoo ao finalizador, fórmulas pensadas para cada textura.",
  },
  {
    name: "Corpo",
    tagline: "Cuidado sensorial da cabeça aos pés",
    description:
      "Óleos, hidratantes e esfoliantes para transformar o banho em ritual.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl font-semibold tracking-tight text-primary">
          Lovbeauty
        </span>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#categorias" className="transition-colors hover:text-primary">
            Categorias
          </a>
          <a href="#sobre" className="transition-colors hover:text-primary">
            Sobre
          </a>
        </nav>
      </header>

      <main>
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:py-32">
            <span className="rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              Beleza autoral · 20 a 45 anos
            </span>
            <h1 className="font-display text-5xl leading-[1.05] text-plum md:text-7xl">
              Beleza que combina
              <br />
              <span className="text-primary">com o seu ritmo.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              A Lovbeauty reúne curadoria de skincare, cabelo e corpo para
              mulheres que querem cuidar de si sem complicar. Produtos
              selecionados, rituais reais.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#categorias"
                className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
              >
                Explorar categorias
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center rounded-full border border-primary/30 px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Conhecer a marca
              </a>
            </div>
          </div>
        </section>

        <section
          id="categorias"
          className="mx-auto max-w-6xl px-6 py-24"
        >
          <div className="mb-14 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary-soft">
              Categorias
            </span>
            <h2 className="mt-3 font-display text-4xl text-plum md:text-5xl">
              Um ritual para cada parte de você.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((cat) => (
              <article
                key={cat.name}
                className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
              >
                <div>
                  <div
                    className="mb-8 h-40 w-full rounded-2xl"
                    style={{ backgroundImage: "var(--gradient-blush)" }}
                    aria-hidden
                  />
                  <h3 className="font-display text-2xl text-plum">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-primary">
                    {cat.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Ver produtos
                  <span aria-hidden>→</span>
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="sobre"
        className="border-t border-border"
        style={{ backgroundImage: "var(--gradient-blush)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <div>
            <span className="font-display text-xl font-semibold text-primary">
              Lovbeauty
            </span>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Curadoria brasileira de beleza. Produtos que respeitam sua pele,
              seus fios e seu tempo.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lovbeauty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
