
FROM node:20

WORKDIR /code

RUN mkdir -p /root/workspace

COPY package*.json ./

RUN "npm insall --only=production"

COPY . .

RUN npm run build

EXPOSE 7007
EXPOSE 7008

CMD ["node", "dist/index.js"]