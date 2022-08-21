FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 5000
#CMD ["npm","run", "dev"]
CMD ["npm","start"]
#CMD ["node","server.js"]