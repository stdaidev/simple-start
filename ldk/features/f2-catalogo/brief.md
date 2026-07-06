# F2 — Catalogo

## Objetivo
Entregar uma vitrine com ~15 produtos ficticios em 3 categorias (skincare, cabelo, corpo) para validar navegacao e apresentacao antes de detalhe, carrinho e checkout.

## Usuario
Mulher, 20–45, chegando da landing querendo ver a coleção Lovbeauty e explorar por categoria.

## Escopo
- Fonte de dados ficticia em `src/data/products.ts` (id, slug, nome, categoria, preco, descricao curta, imagem/placeholder, tags).
- ~15 produtos distribuidos entre skincare, cabelo e corpo (5 por categoria).
- Rota `/produtos` com grid responsivo dos produtos.
- Filtro por categoria (skincare / cabelo / corpo / todos) via querystring ou estado local.
- Card de produto reutilizavel (`ProductCard`) usando tokens Blush & Lavender.
- Link da landing (CTA "Descobrir a colecao") aponta para `/produtos`.
- `head()` da rota `/produtos` com title/description especificos.

## Fora de escopo
- Pagina de detalhe (F3).
- Carrinho e "adicionar ao carrinho" (F4).
- Busca textual, ordenacao avancada, paginacao.
- Backend, banco, imagens geradas por IA (usar placeholders CSS/gradientes por enquanto).
- Estoque, variantes, preco promocional.

## Riscos
- Baixo. Frontend puro, sem PII, sem backend.

