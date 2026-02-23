# Mirim Blog 🚀

Sistema de blog fullstack com painel administrativo, controle de permissões (RBAC) e autenticação JWT.

---

## 🧱 Stack Tecnológica

### 🔹 Backend
- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- CASL (controle de permissões)
- Multer (upload de imagens)
- Zod (validação)

### 🔹 Frontend
- Next.js 16
- React 19
- TailwindCSS 4
- Shadcn UI
- Zustand (estado global)
- Axios

### 🔹 DevOps
- Docker
- Docker Compose
- Volumes persistentes

---

## 📁 Estrutura do Projeto


mirim-blog/
│
├── mirim-backend/
├── mirim-frontend/
├── docker-compose.yml
└── README.md


---

## 🐳 Executando com Docker

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Leooozzz/mirim-blog.git
cd mirim-blog
2️⃣ Configure o .env do backend
DATABASE_URL=postgresql://mirim:mirim123@db:5432/mirimblog
JWT_SECRET=sua_chave_secreta
PORT=4000
3️⃣ Suba os containers
docker-compose up --build
🌍 Portas
Serviço	Porta
Frontend	3000
Backend	4000
PostgreSQL	5433
🔐 Sistema de Autenticação e Permissões

O sistema utiliza:

JWT para autenticação

CASL para controle de habilidades (abilities)

Middleware PrivateRoute

Middleware checkAbility

🔑 Exemplo de proteção de rota
AdminPostRoutes.post(
  '/posts',
  PrivateRoute,
  checkAbility('create', 'Post'),
  upload.single('cover'),
  AdminController.AddPost
);
👤 Papéis do Sistema

Admin

Gerencia posts

Gerencia categorias

Cria e remove editores

Visualiza métricas

Editor

Cria e edita posts

📌 Principais Rotas
🔐 Autenticação

POST /auth/singup

POST /auth/singin

POST /auth/validate

📝 Posts (Admin)

POST /posts

GET /posts

GET /post/:slug

PUT /post/:slug

DELETE /post/:slug

GET /post/countPublished

GET /post/countDraft

📂 Categorias

GET /category

GET /category/:id

POST /category

PUT /category/:id

DELETE /category/:id

📊 Métricas

GET /countViews

GET /post/countPublished

GET /post/countDraft

💾 Banco de Dados

PostgreSQL 16

Prisma ORM

Migrations automatizadas

Script de seed disponível:

npm run seed

Ou:

npm run db:setup
🖼 Upload de Imagens

As imagens de posts são armazenadas via volume Docker:

imagenspost:/app/public/images/covers
🚀 Funcionalidades

Registro e login

Controle de permissões por papel

CRUD completo de posts

Upload de capa

Categorias

Contagem de visualizações

Métricas administrativas