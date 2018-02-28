FROM node:8
RUN apt-get -qq update
RUN apt-get -qq -y install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
COPY package.json ./package.json
RUN npm i --silent
COPY . .
EXPOSE 3000 3001