# Brev.ly 🔗

Aplicação **full stack** de encurtamento de URLs. Permite criar links curtos, listar e remover links, redirecionar para a URL original e exportar um relatório dos links em formato CSV (armazenado em object storage).

O projeto é dividido em dois módulos:

- **`server/`** — API REST responsável pelas regras de negócio, persistência e geração de relatórios.
- **`web/`** — Aplicação web (SPA) que consome a API.

---

## 🚀 Tecnologias

### Back-end (`server`)

- **Node.js** + **TypeScript**
- **Fastify** — servidor HTTP
- **Zod** — validação de schemas e variáveis de ambiente (`fastify-type-provider-zod`)
- **Drizzle ORM** + **drizzle-kit** — ORM e migrations
- **PostgreSQL** (`postgres`) — banco de dados
- **AWS SDK (S3)** — upload dos relatórios para object storage (compatível com **Cloudflare R2**)
- **csv-stringify** — geração dos relatórios em CSV
- **@fastify/swagger** + **Scalar API Reference** — documentação da API (`/docs`)
- **Biome** — lint e formatação
- **tsx** / **tsup** — execução em desenvolvimento e build

### Front-end (`web`)

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **Tailwind CSS** — estilização
- **React Router** — rotas
- **TanStack React Query** — gerenciamento de dados assíncronos
- **React Hook Form** + **Zod** — formulários e validação
- **Axios** — cliente HTTP
- **Sonner** — notificações (toasts)
- **Phosphor Icons** / **Radix UI** — ícones e componentes de UI

---

## 📦 Pré-requisitos

- **Node.js** (versão 20+)
- **pnpm** (gerenciador de pacotes utilizado no projeto)
- **Docker** (para subir o banco PostgreSQL local)
- Conta em um object storage compatível com S3 (ex.: **Cloudflare R2**) para os relatórios

---

## ⚙️ Variáveis de ambiente

Crie os arquivos `.env` a partir dos respectivos `.env.example`.

### `server/.env`

| Variável | Descrição |
|---|---|
| `PORT` | Porta da API (padrão: `3333`) |
| `DATABASE_URL` | String de conexão do PostgreSQL (deve iniciar com `postgresql://`) |
| `FRONTEND_URL` | URL do front-end, usada na configuração de CORS |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare |
| `CLOUDFLARE_ACCESS_KEY_ID` | Access Key do bucket |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Secret Key do bucket |
| `CLOUDFLARE_BUCKET` | Nome do bucket onde os relatórios são salvos |
| `CLOUDFLARE_PUBLIC_URL` | URL pública de acesso aos arquivos do bucket |

Exemplo:

```env
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly"
FRONTEND_URL="http://localhost:5173"

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### `web/.env`

| Variável | Descrição |
|---|---|
| `VITE_FRONTEND_URL` | URL base do front-end |
| `VITE_BACKEND_URL` | URL base da API (back-end) |

Exemplo:

```env
VITE_FRONTEND_URL="http://localhost:5173"
VITE_BACKEND_URL="http://localhost:3333"
```

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd "Avaliação Final"
```

### 2. Subir o banco de dados (PostgreSQL via Docker)

Na pasta `server`:

```bash
# cria a rede utilizada pelo container (apenas na primeira vez)
docker network create brevly-network

docker compose up -d
```

### 3. Back-end (`server`)

```bash
cd server

# instalar dependências
pnpm install

# rodar as migrations do banco
pnpm db:migrate

# iniciar a API em modo desenvolvimento
pnpm dev
```

A API ficará disponível em `http://localhost:3333` e a documentação em `http://localhost:3333/docs`.

Scripts úteis:

| Script | Descrição |
|---|---|
| `pnpm dev` | Inicia a API em modo watch |
| `pnpm db:generate` | Gera novas migrations a partir dos schemas |
| `pnpm db:migrate` | Aplica as migrations no banco |
| `pnpm db:studio` | Abre o Drizzle Studio |
| `pnpm build` | Gera o build de produção |

### 4. Front-end (`web`)

Em outro terminal:

```bash
cd web

# instalar dependências
pnpm install

# iniciar a aplicação em modo desenvolvimento
pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173`.

Scripts úteis:

| Script | Descrição |
|---|---|
| `pnpm dev` | Inicia o dev server (Vite) |
| `pnpm build` | Gera o build de produção |
| `pnpm preview` | Visualiza o build de produção |
| `pnpm lint` | Executa o ESLint |

---

## ✨ Funcionalidades

- Criar link encurtado com URL personalizada
- Listar todos os links cadastrados
- Redirecionar do link curto para a URL original
- Remover links
- Exportar relatório dos links em CSV (armazenado no object storage)

---

## 👨‍💻 Autor

Projeto desenvolvido pelo aluno **Guilherme Ferreira** como **projeto final da Fase 01** do curso de **Pós-graduação em Desenvolvimento Full Stack integrado com IA** da **Rocketseat**.
