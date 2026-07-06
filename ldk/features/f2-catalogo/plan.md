# F2 — Plano

Feature: F2 — Catalogo (15 produtos ficticios em 3 categorias)
Risk: baixo
Proof required: P2 (fluxo manual — abrir `/produtos`, filtrar por categoria, ver 15 produtos)

## Direcao visual
- Reaproveita tokens Blush & Lavender de F1 (`--blush`, `--lavender`, `--plum`, `--cream`, gradientes, shadows).
- Cards com raio assimetrico consistente com a landing; imagem = bloco com gradiente por categoria (skincare=blush, cabelo=iris, corpo=blush-soft).
- Grid 3 colunas desktop / 2 tablet / 1 mobile, com offset opcional no card central por linha (mantendo identidade editorial).
- Chip de filtro em pill lavender com estado ativo em plum.

## Acceptance criteria
- AC1: Existe `src/data/products.ts` exportando 15 produtos ficticios com id, slug, nome, categoria (`skincare` | `cabelo` | `corpo`), preco (BRL), descricao curta e paleta/gradient token; 5 por categoria.
- AC2: Rota `/produtos` renderiza os 15 cards em grid responsivo usando `ProductCard`, com preco formatado em BRL (R$).
- AC3: Filtro por categoria (todos, skincare, cabelo, corpo) funciona no cliente e atualiza a lista visivel sem recarregar a pagina.
- AC4: CTA "Descobrir a colecao" da landing (`/`) navega para `/produtos` via `<Link>` do TanStack Router (nao `<a href>`).
- AC5: `head()` da rota `/produtos` define title, description, og:title, og:description especificos ("Lovbeauty — Colecao ..."), diferentes da home.
- AC6: Build passa e preview abre `/produtos` sem erros no console; nao ha `text-white`/`bg-black`/cores hardcoded nos novos componentes.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Criar dataset ficticio com 15 produtos (5 por categoria) tipado | AC1 | `src/data/products.ts` | inspecionar array com 15 itens e 3 categorias | ready |
| T2 | Criar componente `ProductCard` reutilizando tokens Blush & Lavender e formatacao BRL | AC2, AC6 | `src/components/ProductCard.tsx` | preview do card no grid | ready |
| T3 | Criar rota `/produtos` com grid responsivo, filtro por categoria (chips) e head() proprio | AC2, AC3, AC5, AC6 | `src/routes/produtos.tsx` | abrir `/produtos`, clicar filtros, ver title | ready |
| T4 | Trocar CTA "Descobrir a colecao" da landing por `<Link to="/produtos">` | AC4 | `src/routes/index.tsx` | clicar CTA, ver navegacao SPA | ready |

## Arquivos criados/alterados
- `src/data/products.ts` (novo)
- `src/components/ProductCard.tsx` (novo)
- `src/routes/produtos.tsx` (novo)
- `src/routes/index.tsx` (alterado — CTA)

## Status no ledger
F2: `idea` → `planned` (aguardando aprovacao para `approved`).

## Cerimonia usada
baixo — plano curto.

## Modo de execucao recomendado
`ldk-build` — feature baixo risco, sem decisao aberta critica; T1–T4 executam em sequencia e uma prova P2 fecha a feature.

## Roadmap/dependencias
Destrava F3 (detalhe), F4 (carrinho) e F5 (checkout), que consumirao `products.ts` e `ProductCard`.
