require('dotenv').config();
const { log } = require('../common/log');
const { requiredSetting } = require('../common/required-setting');
log(`cserver started`);

const LISTEN_PORT = requiredSetting('LISTEN_PORT');
const LISTEN_ADDR = requiredSetting('LISTEN_ADDR');

const net = require('net');
const server = net.createServer(socket => {
  log('connected');
  socket.write('Echo server\r\n');
  socket.pipe(socket);
  socket.on('error', err => {
    log(`${err}`);
  });
});

server.listen(LISTEN_PORT, LISTEN_ADDR, () => {
  log('listening');
});