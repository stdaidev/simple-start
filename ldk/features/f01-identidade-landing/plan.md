# F1 — Plan

**Feature:** F1 — Identidade & landing
**Risk:** baixo
**Proof required:** P1
**Cerimônia:** baixo (plano curto)

## Acceptance criteria
- AC1: `/` renderiza landing com hero, categorias (3 cards) e footer, sem placeholder do template.
- AC2: Paleta e tipografia da marca aplicadas via tokens em `src/styles.css`.
- AC3: `head()` da rota `/` com title/description próprios da Lovbeauty.
- AC4: Layout legível em mobile (≥375px) e desktop, sem overflow horizontal.

## Tasks
- T1 — Tokens de marca (paleta rosa/nude/off-white/grafite + fontes Playfair Display / Inter). Arquivos: `src/styles.css`, `src/routes/__root.tsx` (link de fontes + og defaults).
- T2 — Landing (header + hero + categorias + sobre + footer + head próprio). Arquivos: `src/routes/index.tsx`.

## Verificação
Abrir preview em desktop e mobile; conferir hero, categorias e footer com paleta/tipografia da marca.

## Status
approved → building → proof-pending após execução.
