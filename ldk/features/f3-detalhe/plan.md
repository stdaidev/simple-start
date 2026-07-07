# F3 — Plano

Feature: F3 — Pagina de detalhe do produto
Risk: baixo
Proof required: P2 (abrir rota de detalhe de pelo menos um produto e validar dados renderizados + navegacao a partir do card)

## Direcao visual
- Reaproveita tokens Blush & Lavender de F1/F2 (`--blush`, `--lavender`, `--plum`, `--cream`, gradientes, shadows).
- Layout 2 colunas em desktop: bloco visual grande (aspect-square, gradient da categoria) a esquerda, conteudo (categoria chip, nome, preco, descricao, detalhes, CTA) a direita. Coluna unica no mobile.
- Chip da categoria em lavender-soft/plum, igual ao catalogo.
- Botao "Adicionar ao carrinho" com aparencia primaria porem `disabled` + micro-texto "em breve".

## Acceptance criteria
- AC1: Existe rota dinamica `/produtos/$slug` renderizada por `src/routes/produtos.$slug.tsx` que le o produto de `src/data/products.ts` por slug.
- AC2: Para um slug valido, a pagina exibe nome, categoria (label PT), preco em BRL, descricao e bloco visual coerente com o catalogo.
- AC3: Existe secao "Detalhes" com informacoes derivadas (categoria, SKU/id, "modo de uso" e "beneficios" por categoria) — nenhuma delas hardcoded fora de mapa/dataset.
- AC4: `ProductCard` navega para `/produtos/$slug` via `<Link to="/produtos/$slug" params={{ slug: product.slug }}>` (nao `<a href>`).
- AC5: Slug inexistente aciona `notFound()` e a rota renderiza `notFoundComponent` com CTA para `/produtos`.
- AC6: `head()` da rota define title e description dinamicos com o nome do produto (ex.: "Lovbeauty — <Nome>"), og:title, og:description, canonical apontando para `/produtos/<slug>`; no caso not-found, title generico + `robots: noindex`.
- AC7: Botao "Adicionar ao carrinho" existe mas esta `disabled`, com texto auxiliar informando que o carrinho chega em F4; nao ha logica de estado do carrinho nesta feature.
- AC8: Build passa e preview abre `/produtos/<slug>` sem erros no console; nenhuma cor hardcoded (`text-white`, `bg-black`, `bg-[#...]`) nos novos arquivos; navegacao SPA a partir do card do catalogo.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Criar rota `/produtos/$slug` com loader/logica de busca por slug, `head()` dinamico e `notFoundComponent` | AC1, AC5, AC6 | `src/routes/produtos.$slug.tsx` | abrir `/produtos/serum-vitamina-c-radiancia` e `/produtos/inexistente` | done |
| T2 | Montar layout do detalhe (bloco visual + nome + preco + descricao) reusando tokens de F1/F2 | AC2, AC8 | `src/routes/produtos.$slug.tsx` | preview visual e classes semanticas | done |
| T3 | Adicionar secao "Detalhes" com mapa de copy por categoria (modo de uso, beneficios) e SKU | AC3 | `src/routes/produtos.$slug.tsx` (mapa inline) ou `src/data/products.ts` (extensao pequena) | preview mostra 4 linhas de detalhe | done |
| T4 | Adicionar CTA "Adicionar ao carrinho" `disabled` + link "voltar para colecao" | AC7, AC8 | `src/routes/produtos.$slug.tsx` | botao visivel e nao clicavel | done |
| T5 | Trocar wrapper do `ProductCard` por `<Link to="/produtos/$slug" params>` mantendo estilo | AC4, AC8 | `src/components/ProductCard.tsx` | clicar em um card no catalogo navega SPA | done |

## Arquivos criados/alterados
- `src/routes/produtos.$slug.tsx` (novo)
- `src/components/ProductCard.tsx` (alterado — envolver em `<Link>`)
- (opcional) `src/data/products.ts` — apenas se o mapa de "detalhes" for centralizado no dataset

## Status no ledger
F3: `idea` → `planned` (aguardando aprovacao para `approved`).

## Cerimonia usada
baixo — plano curto.

## Modo de execucao recomendado
`ldk-build` — feature baixo risco, sem decisao aberta critica; T1–T5 executam em sequencia e uma prova P2 fecha a feature.

## Roadmap/dependencias
Depende de F2 (`done`). Destrava F4 (carrinho — botao "adicionar" saira daqui) e F5 (checkout).
