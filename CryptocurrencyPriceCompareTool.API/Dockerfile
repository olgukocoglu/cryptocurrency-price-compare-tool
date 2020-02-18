FROM node:12.13.0
EXPOSE 5000

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . /app

CMD npm start