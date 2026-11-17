# lili-unhas

Site institucional da nail designer Liliane Andrade: portfólio, serviços e pedido de horário.

Reconstruído a partir do projeto exportado do Base44, agora como aplicação
independente: Vite + React 18 no frontend e uma pequena API Express + Postgres
para guardar os pedidos de agendamento.

## Estrutura

- `src/` — aplicação React (páginas, componentes do site em `src/components/site`, UI kit).
- `src/lib/siteContent.js` — textos, serviços e portfólio do site.
- `server/index.js` — API: `POST /api/appointment-requests` grava o pedido em
  `appointment_requests` (tabela criada na inicialização) e `GET /health`.
- `vite.config.js` — dev server na porta 3000, proxy de `/api` para a API.

## Rodando localmente

```bash
npm install
npm run dev     # frontend em http://localhost:3000
npm run api     # API em http://localhost:3001 (precisa de DATABASE_URL)
```

Variáveis de ambiente:

- `DATABASE_URL` — string de conexão do Postgres (apenas para a API).
- `API_PORT` — porta da API (padrão `3001`).
- `API_URL` — destino do proxy `/api` do Vite (padrão `http://localhost:3001`).

## Scripts

- `npm run dev` — Vite em modo desenvolvimento.
- `npm run api` — API de agendamentos.
- `npm run build` — build de produção em `dist/`.
- `npm run lint` / `npm run typecheck` — checagens.
