# F2 — Proof

Feature: F2 — Catalogo (15 produtos ficticios em 3 categorias)
Proof required: P2
Proof achieved: P2

## Pre-flight otimista
- Tokens Blush & Lavender ja consolidados em F1; catalogo reaproveita paleta e tipografia.
- Escopo restrito: dataset local + card + rota + filtro client-side. Sem backend, sem PII.

## Pre-flight pessimista
- Filtro poderia zerar contagem por bug de estado; validado via Playwright.
- CTA da landing poderia manter `#categorias` e nao navegar; validado com clique real.
- Sem risco de dados sensiveis nem integracoes externas.

Decisao: proceed.

## Arquivos alterados
- `src/data/products.ts` — novo dataset com 15 produtos tipados (5 por categoria) e `formatBRL`.
- `src/components/ProductCard.tsx` — novo card usando tokens semanticos.
- `src/routes/produtos.tsx` — nova rota com hero, chips de filtro, grid responsivo e head() proprio.
- `src/routes/index.tsx` — CTA "Descobrir a colecao" agora usa `<Link to="/produtos">`.

## AC cobertos
- AC1: `src/data/products.ts` exporta 15 produtos tipados, 5 por categoria (skincare/cabelo/corpo), com preco em BRL.
- AC2: `/produtos` renderiza 15 cards (`article`) — confirmado via Playwright (`cards todos: 15`); preco formatado com `Intl.NumberFormat('pt-BR')` (ex: `R$ 129,90`).
- AC3: Filtro por chip funciona client-side; clicar "Skincare" reduz a 5 cards — confirmado (`cards skincare: 5`).
- AC4: CTA "Descobrir a colecao" navega para `/produtos` via `<Link>` do TanStack Router; Playwright clicou e URL final `http://localhost:8080/produtos`.
- AC5: `document.title` = "Lovbeauty — Coleção completa de skincare, cabelo e corpo"; description especifica; distinta da home.
- AC6: Console sem erros funcionais (`errors: []` apos filtrar `data-tsd-source`); nenhuma cor hardcoded nos novos componentes.

## Verificacao executada
- Playwright headless 1280x1800 em `http://localhost:8080/produtos`.
- Screenshots: `/tmp/browser/f2/produtos_todos.png`, `/tmp/browser/f2/produtos_skincare.png`.
- Contagem de `article`: 15 (todos), 5 (skincare) — bate com dataset.
- Navegacao SPA da home para `/produtos` validada por clique real no CTA.
- Console de erros filtrado: vazio.

## Veredito otimista
- Catalogo entregue com identidade coerente com a landing, filtro fluido e head proprio pronto para compartilhamento.
- Base tipada em `products.ts` destrava F3 (detalhe), F4 (carrinho) e F5 (checkout).

## Veredito pessimista
- Imagens sao placeholders em gradiente; substituir por fotos reais fica para feature futura.
- Sem paginacao/busca — aceitavel para MVP com 15 SKUs.
- Filtro nao persiste em querystring; refresh volta para "todos". Aceitavel para P2; pode virar melhoria em F3+.

## LDK self-check
- Preview aberto: sim (Playwright).
- Console checado: sim.
- Teste automatizado: script Playwright reproduzivel em `/tmp/browser/f2/run.py` (nao committed).
- Diff GitHub: nao inspecionado nesta etapa.

Status: DONE
