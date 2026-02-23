#!/bin/sh

set -e

echo "Aguardando PostgreSQL..."

until pg_isready -h db -p 5432; do
  echo "Postgres ainda não está pronto... aguardando 2s"
  sleep 2
done

echo "Banco de dados ON! Executando migrations..."

npm run db:setup

echo "Iniciando a aplicação..."
npm run dev