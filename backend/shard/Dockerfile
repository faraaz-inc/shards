
FROM node:22.6.0

WORKDIR /code

RUN mkdir /workspace

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7007
EXPOSE 7008

CMD ["node", "dist/index.js"]