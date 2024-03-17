FROM node:18.12.1-alpine

WORKDIR /app

COPY pakage.json .

RUN npm install -f 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
