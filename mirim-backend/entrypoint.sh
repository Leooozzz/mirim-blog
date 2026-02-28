#!/bin/sh

set -e

echo "Aguardando PostgreSQL..."

until pg_isready -h db -p 5432; do
  echo "Postgres ainda não está pronto... aguardando 2s"
  sleep 2
done

echo "Banco de dados ON!"

echo "Executando migrations..."
npx prisma migrate deploy

echo "Gerando Prisma Client..."
npx prisma generate

echo "Buildando aplicação..."
npm run build

echo "Iniciando servidor..."
npm run start