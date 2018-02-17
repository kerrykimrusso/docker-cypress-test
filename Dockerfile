FROM node:8
WORKDIR /ui
COPY package.json ./package.json
RUN npm i --silent
COPY . .
EXPOSE 3000 3001
CMD ["npm","start"]