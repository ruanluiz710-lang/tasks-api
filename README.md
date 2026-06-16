# Portfolio - Tasks API (Node.js + Express + SQLite)

API REST simples para gerenciar tarefas (CRUD) usando **Node.js**, **Express** e **SQLite**.

## O que este projeto faz
- cria, lê, atualiza e exclui tarefas
- armazena tarefas em um banco de dados SQLite local
- expõe rotas HTTP para consumir a API
- tem validação básica de dados e tratamento de erros

## Tecnologias usadas
- JavaScript
- Node.js
- Express
- SQLite
- dotenv

## Estrutura de rotas
Base da API: `/api`

- `GET /api/tasks` → lista todas as tarefas
- `GET /api/tasks/:id` → retorna uma tarefa por ID
- `POST /api/tasks` → cria uma nova tarefa
- `PUT /api/tasks/:id` → atualiza uma tarefa existente
- `DELETE /api/tasks/:id` → exclui uma tarefa
- `GET /health` → verifica se o servidor está ativo

## Requisitos
- Node.js 18+ instalado

## Como rodar localmente
No terminal:

```powershell
cd api
npm install
npm run dev
```

Isso inicia o servidor em:

- `http://localhost:3000`
- `http://localhost:3000/health`

Se quiser usar no modo de produção:

```powershell
npm start
```

## Variáveis de ambiente (opcional)
O projeto suporta variáveis de ambiente via `.env`:

- `PORT` — porta onde o servidor roda
- `SQLITE_PATH` — caminho do arquivo do banco SQLite

Se quiser, crie um arquivo `.env` com essas configurações.

## Exemplos de uso
### Verificar se o servidor está ativo
```powershell
curl http://localhost:3000/health
```

### Listar todas as tarefas
```powershell
curl http://localhost:3000/api/tasks
```

### Criar uma tarefa
```powershell
curl -Method POST `
  -Uri http://localhost:3000/api/tasks `
  -ContentType application/json `
  -Body '{ "title": "Estudar Node", "description": "Criar API REST", "completed": false }'
```

### Atualizar uma tarefa
```powershell
curl -Method PUT http://localhost:3000/api/tasks/1 `
  -ContentType application/json `
  -Body '{ "title": "Estudar Node", "description": "Atualizar tarefa", "completed": true }'
```

### Excluir uma tarefa
```powershell
curl -Method DELETE http://localhost:3000/api/tasks/1
```

## Como o código está organizado
- `src/server.js` → inicializa o servidor, configura middlewares e liga as rotas
- `src/routes` → define os caminhos da API
- `src/controllers` → contém a lógica de cada rota e validação de dados
- `src/repositories` → faz a comunicação com o banco SQLite
- `src/db` → cria e abre o banco de dados local
- `src/middlewares` → trata erros e envia resposta adequada

## Por que é bom para portfólio
Este projeto é uma boa demonstração para vagas de nível júnior porque mostra:
- controle de rotas REST
- organização do backend em camadas
- integração com banco de dados
- uso de boas práticas básicas de API
- capacidade de construir uma aplicação funcional do início ao fim

## Próximas melhorias possíveis
- adicionar testes automatizados
- incluir validação mais robusta
- documentar a API com Swagger ou Postman
- criar frontend simples para consumir essa API

