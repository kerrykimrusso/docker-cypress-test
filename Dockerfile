FROM node:8
COPY package.json ./package.json
RUN npm i --silent
COPY . .
EXPOSE 3000 3001