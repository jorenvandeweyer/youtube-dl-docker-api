FROM node:10-stretch

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
