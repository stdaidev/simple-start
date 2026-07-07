# F5 — Brief

Feature: F5 — Checkout simulado
Risk: baixo
Proof required: P2

## Objetivo
Fechar o MVP com um checkout **fake** (sem gateway, sem backend, sem persistir PII). Usuario revisa a sacola, preenche dados de contato/entrega em um formulario, clica "Confirmar pedido" e ve uma tela de confirmacao com numero de pedido gerado no client + resumo. Carrinho e limpo apos confirmar.

## Usuario
Visitante da vitrine Lovbeauty que ja adicionou itens ao carrinho (F4) e quer simular o fluxo ate o "obrigado".

## Escopo
- Rota `/checkout` (formulario + resumo da sacola).
- Rota `/checkout/confirmado` (tela de sucesso com numero de pedido).
- Validacao de formulario client-side com zod + react-hook-form (ja no stack shadcn).
- Numero de pedido gerado no client (ex: `LB-XXXXXX`).
- Limpar carrinho ao confirmar; se sacola vazia, redirecionar para `/produtos`.
- CTA "Finalizar compra" do `CartDrawer` e da `/carrinho` passa a levar para `/checkout` (removendo o disabled atual).

## Fora de escopo
- Pagamento real (Stripe/MP/Paddle) — F6.
- Frete real / calculo por CEP — F7.
- Auth do cliente / conta / historico de pedidos — F8, F9.
- Backend, banco, envio de email, webhook.
- Persistir pedido em qualquer lugar alem de memoria da tela de confirmacao.
- Cupom, desconto, imposto.

## Riscos
- PII (nome, email, endereco): **nao logar, nao enviar para lugar nenhum, nao persistir em localStorage**. Fica apenas em estado da tela de confirmacao (via navigate state / query effimero).
- Falsa sensacao de compra: deixar claro na tela de sucesso que e simulacao ("Pedido simulado — nenhuma cobranca foi feita").

## Prova minima
P2 — fluxo manual: adicionar item -> abrir `/checkout` -> preencher form -> confirmar -> ver `/checkout/confirmado` com numero e resumo -> voltar e confirmar que carrinho esta vazio.
