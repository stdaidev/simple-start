# Roadmap

Ordem por dependência. Regra: catálogo antes de carrinho, carrinho antes de checkout, checkout fake antes de pagamento real, auth antes de conta/pedidos por usuário.

## Next recommended feature
`landing-inicial` — página inicial simples da marca enquanto decidimos o setup do Shopify. Baixo risco, prova P1.

## Ready now
- landing-inicial — hero + intro da marca de cosméticos (sem carrinho ainda)

## Blocked
- catalogo-produtos — depende da decisão sobre Shopify (nova loja vs. existente) e das categorias/SKUs iniciais
- carrinho — depende de catalogo-produtos
- checkout-pagamento — depende de carrinho + Shopify habilitado
- conta-cliente — depende de decisão sobre auth (Shopify Customer Accounts vs. Lovable Cloud)

## Later
- Cupons, reviews, blog, admin custom, programa de fidelidade

## Ledger updates
- Todas as features acima criadas como `idea` no ledger.

## Próximo passo seguro
`ldk-plan` para `landing-inicial` (baixo risco, plano curto, prova P1),
**ou** decidir agora o setup do Shopify para desbloquear `catalogo-produtos`.
