# Roadmap — Lovbeauty

Ordenacao por dependencia. MVP e vitrine + catalogo + carrinho + checkout simulado. Pagamento/frete/auth/admin reais ficam fora do MVP.

## Next recommended feature
F2 — Catalogo (15 produtos ficticios em 3 categorias)

Por que:
- F1 (identidade & landing) esta `done` e ja estabelece tokens Blush & Lavender reaproveitaveis.
- F2 e pre-requisito de F3 (detalhe), F4 (carrinho) e F5 (checkout).
- Risco baixo, sem PII, sem backend; puro frontend com dados ficticios.

## Ready now
- F2 — Catalogo (15 produtos ficticios em 3 categorias) — risco baixo, P2.

## Blocked
- F3 — Pagina de detalhe do produto — depende de F2 (modelo de produto e dados ficticios).
- F4 — Carrinho local — depende de F2 (produto) e idealmente F3 (adicionar do detalhe).
- F5 — Checkout simulado — depende de F4 (carrinho).

## Later
- F6 — Pagamento real — fora do MVP; exige provedor `[VERIFY]` (Stripe/Mercado Pago/Paddle) e compliance.
- F7 — Frete real — fora do MVP; exige transportadora/CEP `[VERIFY]`.
- F8 — Auth do cliente — fora do MVP; exige Lovable Cloud/Supabase `[VERIFY]`.
- F9 — Admin de produtos/pedidos — depende de F8 (auth/permissoes) e backend real.

## Verify
- Provedor de pagamento (F6).
- Transportadora/logica de frete (F7).
- Necessidade real de auth do cliente na v2 (F8).
- Compliance ANVISA antes de vender cosmeticos reais.

## Sequencia sugerida do MVP
1. F2 — Catalogo
2. F3 — Detalhe do produto
3. F4 — Carrinho local
4. F5 — Checkout simulado

Depois do MVP, reabrir F6/F7/F8/F9 apenas com decisao explicita do usuario.

## Ledger updates
- Nenhuma linha nova. F2-F9 ja registradas no ledger com estado `idea` e prova minima correta.
