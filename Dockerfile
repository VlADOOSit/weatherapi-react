
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=build /usr/src/app/build ./build

CMD ["serve", "-s", "build", "-l", "3000"]