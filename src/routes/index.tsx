import { createFileRoute, Link } from "@tanstack/react-router";
import { CartButton } from "@/components/CartButton";
import heroBanner from "@/assets/hero-banner.jpg";
import catSkincare from "@/assets/cat-skincare.jpg";
import catCabelo from "@/assets/cat-cabelo.jpg";
import catCorpo from "@/assets/cat-corpo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lovbeauty — Rituais de beleza autoral brasileira" },
      {
        name: "description",
        content:
          "Lovbeauty: curadoria brasileira de skincare, cabelo e corpo para mulheres de 20 a 45 que querem cuidar de si sem complicar.",
      },
      { property: "og:title", content: "Lovbeauty — Rituais de beleza autoral brasileira" },
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
    n: "01",
    name: "Skincare",
    tagline: "Rituais de pele que respeitam o seu tempo",
    description:
      "Séruns, hidratantes e protetores para uma rotina simples e eficaz.",
    image: catSkincare,
  },
  {
    n: "02",
    name: "Cabelo",
    tagline: "Fios com brilho, movimento e cuidado real",
    description:
      "Do shampoo ao finalizador, fórmulas pensadas para cada textura.",
    image: catCabelo,
  },
  {
    n: "03",
    name: "Corpo",
    tagline: "Cuidado sensorial da cabeça aos pés",
    description:
      "Óleos, hidratantes e esfoliantes para transformar o banho em ritual.",
    image: catCorpo,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay-soft selection:text-ink">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Header — ruled */}
        <header className="rule-double flex items-center justify-between py-6">
          <span className="font-display text-2xl tracking-tight text-ink">
            Lovbeauty<span className="text-clay">.</span>
          </span>
          <div className="flex items-center gap-8">
            <nav className="hidden gap-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk md:flex">
              <a href="#categorias" className="transition-colors hover:text-ink">
                Categorias
              </a>
              <a href="#sobre" className="transition-colors hover:text-ink">
                Sobre
              </a>
            </nav>
            <CartButton />
          </div>
        </header>

        <main>
          {/* HERO — editorial ruled */}
          <section className="grid grid-cols-12 gap-x-6 pt-12 pb-24 md:pt-20 md:pb-32">
            <div className="col-span-12 mb-6 flex items-baseline justify-between md:col-span-12">
              <span className="section-number text-sm">01 — Ritual</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk">
                Estação · Verão 26
              </span>
            </div>

            <div className="col-span-12 md:col-span-7">
              <h1 className="font-display text-[16vw] leading-[0.85] tracking-[-0.04em] text-ink md:text-[9.5rem] lg:text-[11rem]">
                Lov
                <span className="italic text-clay">beauty</span>
              </h1>
            </div>

            <div className="col-span-12 mt-8 flex flex-col gap-8 md:col-span-5 md:mt-16">
              <p className="max-w-md text-lg leading-[1.55] text-ink-soft">
                O ritual que sua pele merece. Curadoria brasileira de skincare,
                cabelo e corpo para quem quer cuidar de si sem complicar.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-paper transition-colors hover:bg-clay"
                >
                  Descobrir a coleção
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="#sobre"
                  className="inline-flex items-center px-2 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink underline underline-offset-[6px] decoration-1 transition-colors hover:text-clay"
                >
                  Conhecer a marca
                </a>
              </div>
            </div>

            <div className="col-span-12 mt-12 md:mt-16">
              <figure className="relative aspect-[21/9] w-full overflow-hidden">
                <img
                  src={heroBanner}
                  alt="Composição de produtos Lovbeauty sobre linho amarrotado com pétalas de rosa e lavanda seca"
                  width={1920}
                  height={1080}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </figure>
              <figcaption className="rule mt-3 flex items-baseline justify-between pt-2 text-[11px] uppercase tracking-[0.25em] text-dusk">
                <span>Fig. 01 — Still life, linho e pétala seca</span>
                <span className="section-number">↳ 20–45</span>
              </figcaption>
            </div>
          </section>

          {/* CATEGORIAS — editorial rows */}
          <section id="categorias" className="rule-double pt-10">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <span className="section-number text-sm">02 — Categorias</span>
                <h2 className="mt-2 font-display text-5xl leading-[0.95] text-ink md:text-6xl">
                  Um ritual para cada <em className="text-clay">parte de você</em>
                </h2>
              </div>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-dusk md:block">
                Três coleções
              </span>
            </div>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
              {categories.map((cat) => (
                <article key={cat.name} className="group flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush-soft">
                    <img
                      src={cat.image}
                      alt={`Composição ${cat.name.toLowerCase()} Lovbeauty`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="rule mt-5 flex items-baseline justify-between pt-3">
                    <h3 className="font-display text-3xl text-ink">
                      {cat.name}
                    </h3>
                    <span className="section-number text-sm">{cat.n}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-clay">
                    {cat.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dusk">
                    {cat.description}
                  </p>
                  <Link
                    to="/produtos"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ink underline underline-offset-[6px] decoration-1 transition-colors hover:text-clay"
                  >
                    Ver produtos <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* MANIFESTO */}
          <section id="sobre" className="rule-double mt-24 grid grid-cols-12 gap-x-6 pt-10 md:mt-32">
            <div className="col-span-12 mb-8">
              <span className="section-number text-sm">03 — Manifesto</span>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-2">
              <p className="font-display text-3xl leading-[1.15] text-ink md:text-4xl">
                Beleza que respeita <em className="text-clay">o tempo</em> — sem
                pressa, sem promessa vazia, sem ruído. Fórmulas honestas,
                embalagem simples, ritual seu.
              </p>
              <p className="mt-8 max-w-xl text-base leading-[1.6] text-ink-soft">
                Lovbeauty é curadoria autoral brasileira. Cada produto é
                escolhido para caber em uma rotina real de quem tem pouco tempo
                e muito desejo de se cuidar. Nada mais, nada menos.
              </p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="rule-double mt-24 flex flex-col items-start justify-between gap-8 pt-8 pb-12 md:mt-32 md:flex-row md:items-end">
            <div>
              <div className="font-display text-4xl text-ink">
                Lovbeauty<span className="text-clay">.</span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-dusk">
                Beleza autêntica, inspirada pela natureza brasileira e formulada
                para resultados reais.
              </p>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dusk">
              © {new Date().getFullYear()} Lovbeauty · MVP demonstrativo
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
