import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Rituais de beleza autoral brasileira" },
      {
        name: "description",
        content:
          "Lovbeauty: curadoria brasileira de skincare, cabelo e corpo para mulheres de 20 a 45 que querem cuidar de si sem complicar.",
      },
      {
        property: "og:title",
        content: "Lovbeauty — Rituais de beleza autoral brasileira",
      },
      {
        property: "og:description",
        content:
          "Curadoria brasileira de skincare, cabelo e corpo. Beleza autêntica, fórmulas eficazes e ritual sem complicação.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  {
    name: "Skincare",
    tagline: "Rituais de pele que respeitam o seu tempo",
    description:
      "Séruns, hidratantes e protetores para uma rotina simples e eficaz.",
    surface: "bg-blush",
    accent: "bg-blush-soft",
    radius: "rounded-tr-[100px] rounded-bl-[40px]",
  },
  {
    name: "Cabelo",
    tagline: "Fios com brilho, movimento e cuidado real",
    description:
      "Do shampoo ao finalizador, fórmulas pensadas para cada textura.",
    surface: "bg-iris-soft",
    accent: "bg-lavender-soft",
    radius: "rounded-tl-[100px] rounded-br-[40px]",
    offset: true,
  },
  {
    name: "Corpo",
    tagline: "Cuidado sensorial da cabeça aos pés",
    description:
      "Óleos, hidratantes e esfoliantes para transformar o banho em ritual.",
    surface: "bg-blush-soft",
    accent: "bg-blush",
    radius: "rounded-tr-[40px] rounded-bl-[100px]",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-lavender-soft selection:text-plum">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-12 md:py-12">
        <header className="flex items-center justify-between">
          <span className="font-display text-2xl text-plum">Lovbeauty</span>
          <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#categorias" className="transition-colors hover:text-lavender">
              Categorias
            </a>
            <a href="#sobre" className="transition-colors hover:text-lavender">
              Sobre
            </a>
          </nav>
        </header>

        <main className="space-y-24 md:space-y-32">
          {/* HERO — Asymmetric 60/40 */}
          <section className="grid grid-cols-1 items-center gap-12 pt-16 md:pt-24 lg:grid-cols-[1.5fr_1fr]">
            {/* Coluna visual 60% */}
            <div className="relative">
              <div
                className="absolute -top-6 -left-6 h-32 w-32 rounded-full opacity-60 blur-3xl"
                style={{ background: "var(--lavender-soft)" }}
                aria-hidden
              />
              <div
                className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[40px] shadow-[var(--shadow-elegant)]"
                style={{ backgroundImage: "var(--gradient-blush)" }}
              >
                <div className="flex h-full flex-col justify-between p-10">
                  <span className="inline-flex w-fit rounded-full bg-background/70 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-plum backdrop-blur">
                    Beleza autoral · 20 a 45
                  </span>
                  <div
                    className="ml-auto h-40 w-40 rounded-full opacity-80"
                    style={{ backgroundImage: "var(--gradient-lavender)" }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            {/* Coluna copy 40% — sobrepõe */}
            <div className="relative z-20 flex flex-col gap-8 lg:-ml-24">
              <h1 className="font-display text-6xl leading-[0.9] text-plum md:text-7xl lg:text-8xl">
                Lov
                <br />
                <span className="text-lavender">beauty</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                O ritual que sua pele merece. Curadoria brasileira de skincare,
                cabelo e corpo para quem quer cuidar de si sem complicar.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#categorias"
                  className="inline-flex items-center rounded-full bg-lavender-soft px-8 py-4 text-sm font-bold tracking-wide text-plum shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:bg-lavender hover:text-primary-foreground"
                >
                  Descobrir a coleção
                </a>
                <a
                  href="#sobre"
                  className="inline-flex items-center rounded-full border border-border px-8 py-4 text-sm font-semibold tracking-wide text-plum transition-colors hover:border-lavender hover:text-lavender"
                >
                  Conhecer a marca
                </a>
              </div>
            </div>
          </section>

          {/* CATEGORIAS */}
          <section id="categorias" className="space-y-16">
            <div className="flex flex-col gap-4 border-b border-blush pb-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-4xl text-plum md:text-5xl">
                Categorias
              </h2>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-lavender">
                Um ritual para cada parte de você
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {categories.map((cat) => (
                <article
                  key={cat.name}
                  className={`group flex flex-col gap-6 ${
                    cat.offset ? "md:translate-y-12" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[3/4] overflow-hidden ${cat.radius} ${cat.surface}`}
                  >
                    <div
                      className={`absolute inset-6 rounded-3xl opacity-70 transition-transform duration-700 group-hover:scale-105 ${cat.accent}`}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex items-end p-8">
                      <h3 className="font-display text-3xl text-plum">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3 px-1">
                    <p className="text-sm font-semibold text-lavender">
                      {cat.tagline}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-plum transition-colors hover:text-lavender"
                    >
                      Ver produtos
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RODAPÉ */}
          <footer id="sobre" className="pt-16 pb-8">
            <div className="flex flex-col items-start justify-between gap-10 border-t border-blush pt-12 md:flex-row md:items-end">
              <div className="space-y-4">
                <div className="font-display text-4xl text-plum">Lovbeauty</div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Beleza autêntica, inspirada pela natureza brasileira e formulada
                  para resultados reais.
                </p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                © {new Date().getFullYear()} Lovbeauty. Feito com amor.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
