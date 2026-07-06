# F1 — Plano

Feature: F1 — Identidade & landing
Risk: baixo
Proof required: P1 (visual, screenshot do preview)

## Direção visual (aplicada)
- Paleta: Blush & Lavender (`#f8e8ee`, `#e8c5d0`, `#c9a0dc`, `#9b72cf`) mapeada em tokens semanticos (`--blush`, `--blush-soft`, `--lavender`, `--lavender-soft`, `--iris-soft`, `--plum`, `--cream`).
- Tipografia: Abril Fatface (display) + Cabin (body), carregadas via `<link>` no head do root.
- Layout: asymmetric 60/40 no hero (coluna visual + coluna copy sobreposta); grid staggered de categorias com raios assimetricos e offset vertical na card do meio.
- Referencias: editorial romantico feminino, capa de revista de beleza, embalagens tipo Byredo/Sunday Riley.

## Acceptance criteria
- AC1: `src/styles.css` define tokens semânticos da Lovbeauty na paleta Blush & Lavender, com `--font-display` (Abril Fatface) e `--font-sans` (Cabin) distintos, radius e gradientes; sem `text-white`/`bg-black` hardcoded em componentes.
- AC2: Rota `/` renderiza hero asymmetric 60/40 com nome "Lovbeauty" em Abril Fatface (com "beauty" em lavender), tagline dirigida ao público 20–45 e CTAs visíveis.
- AC3: Rota `/` mostra 3 blocos de categorias (skincare, cabelo, corpo) com raios assimétricos, offset vertical no card central e cores derivadas dos tokens Blush & Lavender.
- AC4: Rota `/` tem rodapé mínimo (marca em display + copyright fictício) sobre borda blush.
- AC5: `head()` da rota `/` usa título e description específicos da Lovbeauty (não "Testando LDK", não defaults).
- AC6: Build passa e preview abre sem erros no console.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Definir tokens semanticos Blush & Lavender (paleta, tipografia Abril Fatface + Cabin, radius, gradientes) e carregar fontes via `<link>` no head do root | AC1 | `src/styles.css`, `src/routes/__root.tsx` | inspecionar `:root`/`.dark` e preview sem erros | proof-pending |
| T2 | Reescrever a rota `/` com hero asymmetric 60/40 (nome Lov/beauty, tagline, CTAs), 3 categorias com raios assimetricos e offset central, rodape minimo usando tokens Blush & Lavender | AC2, AC3, AC4 | `src/routes/index.tsx` | preview renderiza secoes, screenshot desktop | proof-pending |
| T3 | Ajustar `head()` da rota `/` com title, description, og:title, og:description especificos da Lovbeauty | AC5 | `src/routes/index.tsx` | `document.title` e meta tags conferidos no preview | ready |

## Arquivos alterados
- `src/styles.css`
- `src/routes/__root.tsx` (link de fontes)
- `src/routes/index.tsx`

## Verificação global
- Screenshot do preview em desktop mostrando hero, categorias e rodapé com identidade coerente.
- Console limpo.

## Status no ledger
F1: `idea` → `approved` → `building`.

## Cerimônia
baixo — plano curto.

## Roadmap/dependências
Sem dependências. Destrava F2 (Catálogo) reaproveitando tokens.
