# F1 — Proof

Feature: F1 — Identidade & landing
Proof required: P1 (visual, screenshot do preview)
Proof achieved: P1

## Pre-flight otimista
- Tokens Blush & Lavender e fontes ja aplicados; T3 (head da rota `/`) e ajuste isolado sem risco.
- Preview local disponivel em `http://localhost:8080/` para captura de screenshot.

## Pre-flight pessimista
- Se o head do root sobrescrever meta da rota, title/description ficariam nos defaults "Lovable App".
- Console pode ter erro de hidratacao/fonte que invalide AC6.

Decisao: proceed.

## Arquivos alterados
- `src/routes/index.tsx` — `head()` com title, description, og:title, og:description, og:type, og:url e canonical especificos da Lovbeauty.
- `src/routes/__root.tsx` — link Google Fonts (Abril Fatface + Cabin) (T1).
- `src/styles.css` — tokens semanticos Blush & Lavender + tipografia (T1).

## AC cobertos
- AC1: `src/styles.css` define paleta Blush & Lavender, `--font-display` (Abril Fatface) e `--font-sans` (Cabin), radius e gradientes; nenhum `text-white`/`bg-black` hardcoded na landing.
- AC2: Hero asymmetric 60/40 renderiza com "Lov/beauty" em Abril Fatface (beauty em lavender), tagline 20–45 e dois CTAs — confirmado no screenshot.
- AC3: Tres categorias (Skincare, Cabelo, Corpo) com raios assimetricos e offset vertical no card central — confirmado no screenshot.
- AC4: Rodape com marca em display sobre borda blush — confirmado no screenshot.
- AC5: `document.title` = "Lovbeauty — Rituais de beleza autoral brasileira"; meta description especifica; canonical `/`. Verificado via Playwright.
- AC6: Console sem erros funcionais. Unico ruido e mensagem de hydration mismatch em atributo `data-tsd-source` (instrumentacao de dev-tooling, nao afeta o app).

## Verificacao executada
- Playwright abriu `http://localhost:8080/` (viewport 1280x1800), capturou `home.png`.
- Screenshot inspecionado: hero, categorias e rodape coerentes com identidade Blush & Lavender.
- Meta lidos no runtime:
  - title: `Lovbeauty — Rituais de beleza autoral brasileira`
  - description: `Lovbeauty: curadoria brasileira de skincare, cabelo e corpo para mulheres de 20 a 45 que querem cuidar de si sem complicar.`
  - canonical: `/`

## Veredito otimista
- Identidade Blush & Lavender aplicada com hierarquia editorial, tokens semanticos consistentes e head da landing pronto para compartilhamento.

## Veredito pessimista
- Fontes carregadas via `<link>` no root dependem de rede; offline cai em serif/sans genericos (aceitavel para MVP).
- Mensagem de hydration mismatch em `data-tsd-source` merece investigacao futura, mas nao afeta render nem AC.
- Sem og:image por decisao consciente (placeholder pior que ausencia).

## LDK self-check
- Preview aberto: sim.
- Console checado: sim.
- Teste automatizado: nao (P1 nao exige).
- Diff GitHub: nao inspecionado nesta etapa.

Status: DONE
