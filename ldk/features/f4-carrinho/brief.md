# F4 — Carrinho local

## Objetivo
Permitir que a usuaria adicione produtos ao carrinho, ajuste quantidades, remova itens e revise o total antes do checkout (F5). Estado 100% local, sem backend.

## Usuario
Mulher, 20–45, que ja viu produto no detalhe e quer montar seu ritual antes de finalizar.

## Escopo
- Estado global do carrinho via React Context + `useReducer` em `src/lib/cart-context.tsx`.
- Persistencia em `localStorage` (chave `lovbeauty:cart:v1`) com hidratacao no mount (client-only, sem SSR mismatch).
- API do hook `useCart()`: `items`, `addItem(product)`, `removeItem(id)`, `updateQty(id, qty)`, `clear()`, `subtotal`, `count`.
- Botao "Adicionar ao carrinho" da pagina de detalhe (F3) sai de `disabled` e passa a chamar `addItem`, com feedback visual (toast/estado local "adicionado").
- Card do catalogo mantem link para detalhe; nao adiciona direto (menos confusao).
- Icone de carrinho no header (landing, /produtos, /produtos/$slug) com badge de quantidade; abre drawer/sheet lateral.
- Drawer do carrinho reusando `sheet` do shadcn: lista de itens (thumb visual do produto, nome, categoria, preco, controle de quantidade +/-, remover), subtotal em BRL, CTA "Finalizar compra" (por enquanto desabilitado com nota "checkout em F5") e "Continuar comprando" que fecha o drawer.
- Rota `/carrinho` como fallback acessivel (mesma UI em pagina cheia) — usuaria sem JS/drawer fechado consegue ver.
- Head() proprio em `/carrinho`.

## Fora de escopo
- Checkout real ou simulado (F5).
- Cupom, frete, taxas, estoque.
- Auth, salvar carrinho no backend, sincronizar entre dispositivos.
- Wishlist/favoritos.
- Variantes de produto (tamanho, cor).

## Riscos
- Baixo. Frontend puro; unica superficie sensivel e `localStorage` (sem PII, apenas ids/qtd).
- Cuidado com SSR: leitura de `localStorage` so no client para evitar hydration mismatch.

## Decisoes
- Persistencia: `localStorage` versionado (`v1`) para permitir invalidar depois sem quebrar sessoes antigas.
- Formato armazenado: `{ items: { productId: string; qty: number }[] }` — produtos sao resolvidos por id via `src/data/products.ts`; se um id nao existir mais, o item e ignorado na leitura.
- Toast: usar `sonner` (ja presente no shadcn ecosystem se disponivel) ou feedback inline; decidir na T2 conforme dependencia existente.
