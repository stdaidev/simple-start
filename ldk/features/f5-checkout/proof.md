# F5 — Proof

Feature: F5 — Checkout simulado
Proof level: P2 (fluxo manual observado via Playwright)

## Pre-flight
Otimista:
- F4 done; deps zod/RHF/@hookform-resolvers/sonner presentes; cart tem `clear()`; sem backend/PII persistida.

Pessimista:
- SSR: `checkout.tsx` viraria layout se houvesse filho — evitado usando `checkout.index.tsx`.
- state via router: se ausente (acesso direto), rota renderiza fallback.
- typed navigate state: usado `(prev: Record<string, unknown>) => ({...prev, order}) as never` para não conflitar com HistoryState.

## Arquivos alterados
- `src/lib/checkout-schema.ts` (novo)
- `src/routes/checkout.index.tsx` (novo)
- `src/routes/checkout.confirmado.tsx` (novo)
- `src/components/CartDrawer.tsx` (CTA habilitado)
- `src/routes/carrinho.tsx` (CTA habilitado)

## AC cobertos
- AC1 `/checkout` renderiza; sacola vazia mostra CTA `/produtos` (sem redirect) — verificado.
- AC2 form valida com zod: submit em branco exibe mensagens de erro por campo — screenshot `4_errors.png`.
- AC3 resumo lista itens, subtotal, frete "Grátis (simulação)", total em BRL — `5_filled.png`.
- AC4 `CartDrawer` e `/carrinho` levam a `/checkout` (copy "em F5" removida) — código atualizado.
- AC5 submit válido gera `LB-XXXXXX`, limpa carrinho e navega — `ORDER: LB-777BC8`, `CART_EMPTY: True`.
- AC6 `/checkout/confirmado` mostra pedido; acesso direto mostra fallback — `FALLBACK: True`, `8_confirmado_direct.png`.
- AC7 localStorage após fluxo contém apenas `lovbeauty:cart:v1 = {"items":[]}`. Nenhum campo PII persistido. Sem fetch/beacon disparado do form.
- AC8 sem erros de app no console. Único warning é hydration mismatch do atributo `data-tsd-source` do instrumentation do Lovable em `__root.tsx` (não introduzido pela F5, existente na sessão).

## Verificação executada
Playwright headless 1280x1800:
1. `/produtos` → clica card → detalhe → 2× "Adicionar ao carrinho".
2. `/checkout` → submit vazio → erros aparecem.
3. Preenche form válido → confirma → redireciona a `/checkout/confirmado` com número `LB-777BC8` e total R$ 259,80.
4. `/carrinho` mostra estado vazio (carrinho limpo).
5. Acesso direto a `/checkout/confirmado` mostra fallback "Nada por aqui".
6. `localStorage` inspecionado: sem PII.

Screenshots em `/tmp/browser/f5/shots/` (não commitados).

## Veredito otimista
Fluxo happy-path fecha o MVP: formulário → confirmação → limpeza. Design consistente com F1–F4. Zero backend, zero PII persistida.

## Veredito pessimista
- History state some em hard reload em `/checkout/confirmado` — coberto pelo fallback.
- Máscara de CEP/telefone é livre; validação é por quantidade de dígitos. Suficiente para simulação; formatação visual pode entrar depois.
- Hydration mismatch existente em `__root.tsx` não é regressão desta feature.

## LDK self-check
- Preview aberto: yes (Playwright).
- Fluxo manual: yes.
- Console: yes (só warnings pré-existentes).
- Diff: files listed acima.
- Sem segredos, PII persistida ou rede.

## Status
DONE
