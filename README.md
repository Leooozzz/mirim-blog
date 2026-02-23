🚀 Mirim Blog

Projeto fullstack de blog com:

Backend: Node.js + Express + Prisma + PostgreSQL

Frontend: Next.js

Docker + Docker Compose

▶️ Como rodar o projeto
1️⃣ Clone o repositório
git clone https://github.com/Leooozzz/mirim-blog.git
cd mirim-blog
2️⃣ Configure o .env do backend

Crie o arquivo:

mirim-backend/.env

Adicione:

DATABASE_URL=postgresql://mirim:mirim123@db:5432/mirimblog
JWT_SECRET=sua_chave_secreta
PORT=4000
3️⃣ Suba os containers
docker-compose up --build
🌍 Acesse

Frontend → http://localhost:3000

Backend → http://localhost:4000

💾 Banco de Dados

Se precisar rodar manualmente:

npm run db:setup