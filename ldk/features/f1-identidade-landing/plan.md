# F1 — Plano

Feature: F1 — Identidade & landing
Risk: baixo
Proof required: P1 (visual, screenshot do preview)

## Acceptance criteria
- AC1: `src/styles.css` define tokens semânticos da Lovbeauty (paleta feminina/cosmética, tipografia com heading + body distintos, radius, sem `text-white`/`bg-black` hardcoded em componentes).
- AC2: Rota `/` renderiza hero com nome "Lovbeauty", tagline dirigida ao público 20–45, CTA visível.
- AC3: Rota `/` mostra 3 blocos de categorias (skincare, cabelo, corpo) usando os tokens definidos.
- AC4: Rota `/` tem rodapé mínimo (marca + copyright fictício).
- AC5: `head()` da rota `/` usa título e description específicos da Lovbeauty (não "Testando LDK", não defaults).
- AC6: Build passa e preview abre sem erros no console.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Definir tokens semanticos (paleta Lovbeauty, tipografia display+sans, radius) e carregar fontes via `<link>` no head do root | AC1 | `src/styles.css`, `src/routes/__root.tsx` | inspecionar `:root`/`.dark` e preview sem erros | proof-pending |
| T2 | Reescrever a rota `/` com hero (nome + tagline + CTA), 3 blocos de categorias (skincare, cabelo, corpo) e rodape minimo usando tokens | AC2, AC3, AC4 | `src/routes/index.tsx` | preview renderiza secoes, screenshot desktop | ready |
| T3 | Ajustar `head()` da rota `/` com title, description, og:title, og:description especificos da Lovbeauty | AC5 | `src/routes/index.tsx` | `document.title` e meta tags conferidos no preview | ready |

## Arquivos alterados
- `src/styles.css`
- `src/routes/__root.tsx` (link de fontes, se aplicável)
- `src/routes/index.tsx`

## Verificação global
- Screenshot do preview em desktop mostrando hero, categorias e rodapé com identidade coerente.
- Console limpo.

## Status no ledger
F1: `idea` → `approved`.

## Cerimônia
baixo — plano curto.

## Roadmap/dependências
Sem dependências. Destrava F2 (Catálogo) reaproveitando tokens.
