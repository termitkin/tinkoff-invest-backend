FROM node:14-alpine

WORKDIR /app
COPY . /app
RUN npm install

CMD ["node", "./app/index.js"]
