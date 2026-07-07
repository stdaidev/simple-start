# Roadmap — Lovbeauty

Ordenacao por dependencia. MVP e vitrine + catalogo + carrinho + checkout simulado. Pagamento/frete/auth/admin reais ficam fora do MVP.

## Next recommended feature
F4 — Carrinho local

Por que:
- F1, F2 e F3 estao `done`; catalogo e detalhe do produto ja entregam a base.
- F4 e pre-requisito de F5 (checkout simulado).
- Risco baixo, sem PII, sem backend; estado local com persistencia leve.

## Ready now
- F4 — Carrinho local — risco baixo, P2.

## Blocked
- F5 — Checkout simulado — depende de F4 (carrinho).

## Later
- F6 — Pagamento real — fora do MVP; exige provedor `[VERIFY]` (Stripe/Mercado Pago/Paddle) e compliance.
- F7 — Frete real — fora do MVP; exige transportadora/CEP `[VERIFY]`.
- F8 — Auth do cliente — fora do MVP; exige Lovable Cloud/Supabase `[VERIFY]`.
- F9 — Admin de produtos/pedidos — depende de F8 (auth/permissoes) e backend real.

## Done
- F1 — Identidade & landing (P1).
- F2 — Catalogo (15 produtos ficticios em 3 categorias) (P2).
- F3 — Pagina de detalhe do produto (P2).

## Verify
- Provedor de pagamento (F6).
- Transportadora/logica de frete (F7).
- Necessidade real de auth do cliente na v2 (F8).
- Compliance ANVISA antes de vender cosmeticos reais.

## Sequencia sugerida do MVP
1. F2 — Catalogo (done)
2. F3 — Detalhe do produto (done)
3. F4 — Carrinho local
4. F5 — Checkout simulado

Depois do MVP, reabrir F6/F7/F8/F9 apenas com decisao explicita do usuario.

## Ledger updates
- Nenhuma linha nova.
