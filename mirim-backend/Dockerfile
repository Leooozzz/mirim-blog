FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache \
    netcat-openbsd \
    postgresql-client 

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["sh", "./entrypoint.sh"]