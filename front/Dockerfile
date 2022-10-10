FROM node:12.18.1-alpine

WORKDIR /app
COPY package*.json ./app/
RUN npm install --only=production
COPY ./ ./app/
CMD npm start