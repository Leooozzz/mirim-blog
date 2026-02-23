#!/bin/sh


echo "Aguardadno banco de dados em db:5432"

sleep 12

echo "Banco de dados ON! executando migrations"

npm run db:setup

echo "Iniciando a aplicação"
npm run dev