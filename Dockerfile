FROM node:10-alpine

WORKDIR /usr/src/app
VOLUME [ "/usr/src/app" ]

# RUN npm install -g nodemon

EXPOSE 3000

CMD [ "node", "todo/app.js" ]