FROM node:12-alpine

ENV PORT=8080
COPY package* ./

RUN npm install 

COPY . .

RUN npm run build
CMD [ "npm", "run", "serve" ]

EXPOSE $PORT