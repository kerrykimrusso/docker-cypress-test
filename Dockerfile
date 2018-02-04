FROM node:8
WORKDIR /ui
COPY . .
RUN npm i
EXPOSE 3000 3001
CMD ["npm","start"]