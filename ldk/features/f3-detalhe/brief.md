# F3 — Pagina de detalhe do produto

## Objetivo
Entregar uma pagina de detalhe por produto com rota propria, para o usuario ver mais informacoes antes do futuro "adicionar ao carrinho" (F4).

## Usuario
Mulher, 20–45, vinda do catalogo, querendo entender um produto especifico antes de decidir.

## Escopo
- Rota dinamica `/produtos/$slug` consumindo `src/data/products.ts`.
- Layout com visual coerente com o catalogo (tokens Blush & Lavender): bloco visual (gradient/surface), nome, categoria, preco em BRL, descricao.
- Bloco de detalhes "estaticos" derivados do produto (categoria, id/SKU, "modo de uso" e "beneficios" com copy generica por categoria).
- Botao placeholder "Adicionar ao carrinho" desabilitado com nota "em breve" (F4).
- Link "voltar para colecao" para `/produtos`.
- Card do catalogo navega para `/produtos/$slug` via `<Link>` do TanStack Router.
- `head()` proprio por produto: title e description usando o nome do produto; og:title, og:description, canonical.
- Rota lida com slug invalido via `notFound()` + `notFoundComponent` da rota.

## Fora de escopo
- Carrinho real e "adicionar ao carrinho" funcional (F4).
- Variantes, estoque, resenhas, galeria de imagens reais.
- Backend, banco, PII.
- Recomendados/relacionados algoritmicos.

## Riscos
- Baixo. Frontend puro, dados locais.
