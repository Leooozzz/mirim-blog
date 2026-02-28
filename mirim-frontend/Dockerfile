FROM node:20-alpine

WORKDIR /app

# Recebe variável na build
ARG INTERNAL_API_BASE
ENV INTERNAL_API_BASE=$INTERNAL_API_BASE

COPY package*.json ./
RUN npm install

COPY . .

# Build de produção
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]