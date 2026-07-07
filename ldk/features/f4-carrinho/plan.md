# F4 — Plano

Feature: F4 — Carrinho local
Risk: baixo
Proof required: P2 (adicionar, ajustar qtd, remover, persistir no reload, subtotal em BRL correto)

## Direcao visual
- Reaproveita tokens Blush & Lavender de F1–F3 (`--blush`, `--lavender`, `--plum`, `--cream`, gradientes, shadows).
- Icone de carrinho no header (bag/sacola) com badge circular em `bg-lavender text-primary-foreground`.
- Drawer via `sheet` do shadcn, lado direito, com o mesmo tratamento de tipografia display + copy em `text-muted-foreground`.
- Botao primario "Adicionar ao carrinho" no detalhe fica com estilo cheio em `bg-lavender`; feedback via `sonner` toast discreto ("Adicionado ao carrinho").

## Acceptance criteria
- AC1: Existe `CartProvider` em `src/lib/cart-context.tsx` exportando hook `useCart()` com `items`, `addItem`, `removeItem`, `updateQty`, `clear`, `subtotal`, `count`. Provider aplicado no `RootShell` (`src/routes/__root.tsx`).
- AC2: O estado persiste em `localStorage` sob a chave `lovbeauty:cart:v1`; ao recarregar a pagina, os itens permanecem. Leitura acontece apenas no client (nenhum hydration mismatch novo alem dos ja instrumentados pelo Lovable).
- AC3: Botao "Adicionar ao carrinho" na rota `/produtos/$slug` esta habilitado, chama `addItem(product)`, incrementa `count` em 1 e dispara toast.
- AC4: Icone de carrinho aparece no header das rotas `/`, `/produtos` e `/produtos/$slug`; mostra badge com `count` quando maior que zero e abre o drawer ao clicar.
- AC5: Drawer lista todos os itens com nome, categoria, preco unitario em BRL, controle `+/-` (min 1) e botao remover. Alterar quantidade atualiza subtotal e badge; remover retira o item.
- AC6: Drawer exibe subtotal em BRL formatado (`formatBRL`), CTA "Finalizar compra" desabilitado com nota "Checkout em F5", e link "Continuar comprando" que fecha o drawer.
- AC7: Existe rota `/carrinho` (`src/routes/carrinho.tsx`) com a mesma listagem em pagina cheia, `head()` proprio (title, description, og:title, og:description, canonical) e CTA para `/produtos` quando vazio.
- AC8: Build passa; sem cores hardcoded (`text-white`, `bg-black`, `bg-[#...]`) nos novos arquivos; sem erros novos no console durante o fluxo de adicao/remocao.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Criar `CartProvider` + `useCart()` com reducer, tipos e persistencia versionada em localStorage (leitura client-only) | AC1, AC2 | `src/lib/cart-context.tsx` | testar no console: `addItem`/`updateQty`/`removeItem` afetam `count`/`subtotal` e sobrevivem ao reload | done |
| T2 | Aplicar `CartProvider` e `<Toaster />` do sonner no `RootShell` (fora do `<Outlet />` mas dentro do body) | AC1, AC8 | `src/routes/__root.tsx` | provider disponivel em todas as rotas | done |
| T3 | Criar `CartButton` (icone + badge) e `CartDrawer` (sheet lateral com lista, +/- , remover, subtotal, CTAs) | AC4, AC5, AC6 | `src/components/CartButton.tsx`, `src/components/CartDrawer.tsx` | preview: abrir drawer, ajustar qtd, remover, ver subtotal | done |
| T4 | Inserir `CartButton` no header das rotas `/`, `/produtos` (index) e `/produtos/$slug` sem duplicar codigo | AC4, AC8 | `src/routes/index.tsx`, `src/routes/produtos.index.tsx`, `src/routes/produtos.$slug.tsx` | badge aparece nas tres rotas | done |
| T5 | Habilitar o botao "Adicionar ao carrinho" no detalhe: chamar `addItem` + toast; manter estilo e remover copy "em breve" | AC3, AC8 | `src/routes/produtos.$slug.tsx` | clicar 2x no botao -> `count` = 2, toast visivel | done |
| T6 | Criar rota `/carrinho` com listagem full-page, `head()` proprio e estado vazio com CTA para `/produtos` | AC7, AC8 | `src/routes/carrinho.tsx` | abrir `/carrinho` com e sem itens | done |

## Arquivos criados/alterados
- `src/lib/cart-context.tsx` (novo)
- `src/components/CartButton.tsx` (novo)
- `src/components/CartDrawer.tsx` (novo)
- `src/routes/carrinho.tsx` (novo)
- `src/routes/__root.tsx` (alterado — provider + Toaster)
- `src/routes/index.tsx` (alterado — CartButton no header)
- `src/routes/produtos.index.tsx` (alterado — CartButton no header)
- `src/routes/produtos.$slug.tsx` (alterado — CartButton no header, habilitar CTA)

## Status no ledger
F4: `idea` -> `planned` (aguardando aprovacao para `approved`).

## Cerimonia usada
baixo — plano completo pequeno.

## Modo de execucao recomendado
`ldk-build` — feature baixo risco sem decisao aberta critica; T1–T6 executam em sequencia e uma prova P2 fecha a feature.

## Roadmap/dependencias
Depende de F2 (`done`) e F3 (`done`). Destrava F5 (checkout simulado).
