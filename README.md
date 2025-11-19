# Checkin App

Checkin App é um projeto desenvolvido com Next.js, Node.js e PostgreSQL.

O projeto consiste em uma aplicação Web e uma API, para gerenciar solicitações de check-ins de usuários em turmas, permitindo criação de conta, visualização de turmas, e solicitação de check-ins, também possuindo uma pagina dedicada a administradores, possibilitando controle de turmas, check-ins e alunos.

## Estrutura do Projeto

```text
apps/
├── web/          # Aplicação frontend Next.js
├── backend/      # API backend Nodejs
└── README.md     # Este arquivo
```

## Projetos

### Web (Frontend)

- **Localização**: `/web`
- **Tecnologia**: Next.js, React 19, TypeScript
- **Scripts**:
  - `npm run dev` - Inicia o servidor de desenvolvimento
  - `npm run build` - Build da aplicação
  - `npm run start` - Inicia o servidor de produção

### Backend (API)

- **Localização**: `/backend`
- **Tecnologia**: Node.js, Express.js e PostgreSQL
- **Scripts**:
  - `npm run dev` - Inicia o servidor de desenvolvimento da API
  - `npm run build` - Build da aplicação
  - `npm run start` - Inicia o servidor de produção
