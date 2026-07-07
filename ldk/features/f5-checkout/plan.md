# F5 — Plano

Feature: F5 — Checkout simulado
Risk: baixo
Proof required: P2

## Direcao visual
- Reaproveita tokens Blush & Lavender de F1–F4.
- Layout duas colunas em desktop: form (esquerda) + resumo da sacola sticky (direita); coluna unica no mobile.
- Inputs shadcn (`Input`, `Label`, `Textarea`) com foco em `--lavender`; erros em `text-destructive`.
- Botao "Confirmar pedido" primario cheio em `bg-lavender`.
- Tela de sucesso: cartao grande com icone de check em `text-lavender`, numero de pedido em fonte display, banner discreto avisando "simulacao".

## Acceptance criteria
- AC1: Rota `/checkout` existe (`src/routes/checkout.index.tsx`) com `head()` proprio (title, description, og:*). Se `cart.count === 0`, renderiza estado vazio com CTA `/produtos` (sem redirect forcado para evitar loop no SSR).
- AC2: Formulario com campos: nome completo, email, telefone, CEP, endereco, numero, complemento (opcional), cidade, UF. Validacao com zod: nome min 3, email valido, telefone digitos+mask livre min 8, CEP 8 digitos, endereco min 3, numero obrigatorio, cidade min 2, UF 2 letras. Erros mostrados abaixo de cada campo.
- AC3: Resumo mostra itens (nome, qtd, subtotal por item em BRL), subtotal geral em BRL, frete "Gratis (simulacao)" e total = subtotal.
- AC4: `CartDrawer` e `/carrinho`: botao "Finalizar compra" fica habilitado quando ha itens e navega para `/checkout`. Copy "Checkout em F5" removida.
- AC5: Submit valido: gera `orderNumber` no client (`LB-` + 6 hex uppercase), captura snapshot da sacola + total, chama `cart.clear()`, e navega para `/checkout/confirmado` passando o snapshot via `useNavigate` state (nao querystring, nao localStorage).
- AC6: Rota `/checkout/confirmado` (`src/routes/checkout.confirmado.tsx`) le o state via `useRouterState`/`history.state`; se ausente (acesso direto), renderiza fallback com CTA `/produtos`. Mostra numero do pedido, itens, total, aviso "Pedido simulado — nenhuma cobranca foi realizada", e CTAs "Continuar comprando" (`/produtos`) e "Voltar para o inicio" (`/`).
- AC7: Nenhum dado do formulario (nome, email, endereco) e gravado em localStorage, cookie, console.log, analytics ou enviado por rede. Apenas o snapshot (itens + total + orderNumber) fica em memoria da rota de confirmacao.
- AC8: Build passa; sem cores hardcoded nos novos arquivos; sem novos erros no console durante o fluxo.

## Tasks

| ID | Descricao | AC | Arquivos esperados | Verificacao | State |
|----|-----------|----|--------------------|-------------|-------|
| T1 | Instalar/confirmar deps `react-hook-form`, `@hookform/resolvers`, `zod` (ja presentes) e criar schema+tipos em `src/lib/checkout-schema.ts` | AC2 | `src/lib/checkout-schema.ts` | tsgo passa; schema valida ok/erro em unit-check manual | ready |
| T2 | Criar rota `/checkout` com form (RHF+zod) + resumo, estado vazio, e submit que gera orderNumber, faz snapshot, limpa carrinho e navega para `/checkout/confirmado` com state | AC1, AC2, AC3, AC5, AC7, AC8 | `src/routes/checkout.index.tsx` | preview: preencher form invalido -> erros; valido -> navega e limpa | ready |
| T3 | Criar rota `/checkout/confirmado` com leitura do state, fallback e CTAs; head() proprio | AC6, AC8 | `src/routes/checkout.confirmado.tsx` | preview: acessar direto mostra fallback; via fluxo mostra pedido | ready |
| T4 | Habilitar CTA "Finalizar compra" em `CartDrawer` e `/carrinho`, removendo copy "em F5" e disabled | AC4, AC8 | `src/components/CartDrawer.tsx`, `src/routes/carrinho.tsx` | clicar leva a `/checkout` com itens | ready |
| T5 | Auditar que nenhum campo PII e persistido/logado (grep) e checar console limpo | AC7, AC8 | (nenhum novo) | grep + preview | ready |

## Arquivos criados/alterados
- `src/lib/checkout-schema.ts` (novo)
- `src/routes/checkout.index.tsx` (novo)
- `src/routes/checkout.confirmado.tsx` (novo)
- `src/components/CartDrawer.tsx` (alterado — habilitar CTA)
- `src/routes/carrinho.tsx` (alterado — habilitar CTA)

## Status no ledger
F5: `idea` -> `planned` (aguardando aprovacao para `approved`).

## Cerimonia usada
baixo — plano completo pequeno.

## Modo de execucao recomendado
`ldk-build` — sem decisao aberta critica, risco baixo, sem backend/PII persistida.

## Roadmap/dependencias
- Depende de F4 (done). Fecha o MVP definido no roadmap.
- Nao desbloqueia F6/F7/F8/F9 (esses continuam `[VERIFY]` / fora do MVP).
