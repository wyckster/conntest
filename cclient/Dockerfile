FROM node:16

COPY cclient/package.json /usr/src/cclient/package.json
WORKDIR /usr/src/cclient
RUN npm install
COPY common /usr/src/common
COPY cclient /usr/src/cclient

CMD ["node", "client.js"]
