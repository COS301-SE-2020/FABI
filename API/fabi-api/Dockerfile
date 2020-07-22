from node:10

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run start
