FROM node:alpine
WORKDIR D:\projects\Backend-task
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./index.js ./
COPY ./connect.js ./
COPY ./limiter.js ./
COPY ./routes ./routes
COPY ./models ./models
COPY ./controllers ./controllers
COPY ./.env ./
CMD ["npm", "start"]
