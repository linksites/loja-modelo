# Loja Modelo — E-commerce demonstrativo

Loja-modelo (vitrine) com **catálogo**, **carrinho client-side** e **checkout
demonstrativo**. Serve como base para lojas reais: troque produtos, cores e
textos e publique.

> Desenvolvido por **LinkSites**.

## Stack

- **Vite + React** — SPA rápida
- **React Router** (`HashRouter`) — rotas compatíveis com hospedagem estática
- **Tailwind CSS** — estilos utilitários e tema da marca
- **Framer Motion** — micro-interações e animações do drawer
- **react-icons**

## Funcionalidades

- **Catálogo** com filtro por categoria e ordenação (`/catalogo`)
- **Página de produto** com quantidade, preço/oferta e relacionados (`/produto/:id`)
- **Carrinho** em gaveta lateral (drawer), persistido em `localStorage`
- Cálculo de **frete grátis** acima de um valor configurável
- **Checkout** com validação de formulário e resumo do pedido (`/checkout`)
- **Confirmação** com número de pedido (`/confirmacao`)
- Página **404** para rotas/produtos inexistentes

> Loja demonstrativa: **nenhum pagamento real é processado**. O checkout apenas
> simula o fechamento do pedido e limpa o carrinho.

## Conteúdo (produtos e textos)

Tudo é centralizado em `src/lib/`:

- `site.js` — marca, contato, redes, regras de frete
- `products.js` — catálogo (`PRODUTOS`) e categorias (`CATEGORIAS`)

Preços são armazenados em **centavos** (inteiros) e formatados em BRL por
`src/lib/format.js`. As imagens usam `picsum.photos` como placeholder — troque
por fotos reais em `public/assets/` ao adaptar para um cliente.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # pré-visualiza o build
npm run lint     # ESLint
```

## Deploy

Deploy automático para **GitHub Pages** a cada push na branch `main`, via GitHub
Actions (`.github/workflows/deploy.yml`). O build usa **base relativa
(`base: './'`)**, então o mesmo artefato funciona em qualquer subcaminho do Pages
(ex.: `/loja-modelo/`). Como usamos `HashRouter`, recarregar qualquer rota
funciona sem configuração extra de servidor.
