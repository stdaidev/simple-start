# Lovbeauty — Contexto do Projeto

## Produto
- Nome: Lovbeauty
- Objetivo: Loja virtual de cosméticos (skincare, cabelo e corpo).
- Usuário principal: Mulheres de 20 a 45 anos que buscam cuidados com pele, cabelo e corpo.
- Resultado esperado: Validar vitrine e experiência de compra com checkout simulado, deixando base preparada para evoluir para venda real depois.

## Plataforma
- Lovable project: este projeto (TanStack Start).
- GitHub repo: [VERIFY]
- Backend: nenhum no MVP (tudo frontend).
- Banco: nenhum no MVP.
- Auth: nenhum no MVP.
- Pagamentos: gateway simulado (checkout fake). Provedor real: [VERIFY]

## Escopo do MVP
- Vitrine/landing com identidade da marca.
- Catálogo com ~15 produtos fictícios em 3 categorias: skincare, cabelo, corpo.
- Página de detalhe do produto.
- Carrinho local (estado no client, sem persistência real).
- Checkout simulado com confirmação fake.

## Fora do escopo do MVP
- Pagamento real, gateway, Pix, cartão, boleto.
- Frete real, cálculo de CEP, integração de transportadora.
- Auth de usuário, conta, login social.
- Banco de dados, Lovable Cloud, Supabase.
- Admin real de produtos/pedidos.
- Integração com Shopify, ERP ou marketplace.
- E-mail transacional real.

## Riscos
- Dados pessoais: baixo no MVP (nenhum dado real coletado). Se aparecer formulário de checkout com nome/endereço, marcar como fictício e não enviar para lugar nenhum.
- Pagamentos: sem risco real no MVP (simulado). Alto quando evoluir para venda real. [VERIFY]
- Permissões/admin: não aplicável no MVP.
- Integrações externas: nenhuma no MVP.
- Supabase/RLS: não aplicável no MVP.
- Compliance/ANVISA: [VERIFY] antes de vender cosméticos de verdade (registro, rotulagem, claims).

## Pendências [VERIFY]
- GitHub repo conectado.
- Provedor de pagamento futuro (Stripe, Mercado Pago, Paddle, outro).
- Compliance ANVISA e claims de produto quando sair do fictício.
- Frete e logística quando evoluir para venda real.
- Necessidade de auth/conta do cliente na v2.

## Regras sempre
- Sem prova falsa.
- Nenhum segredo em bundle/log.
- Nenhuma PII real coletada no MVP.
- Não assumir Shopify, gateway real, Supabase ou frete real sem pedido explícito.
- Ao evoluir para pagamento real, tratar como risco alto (P4).
