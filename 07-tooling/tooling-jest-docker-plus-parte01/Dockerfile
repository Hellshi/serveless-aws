FROM node:16

WORKDIR /src

COPY package.json package-lock.json /src/

RUN npm ci --silent

COPY . .

CMD npm start