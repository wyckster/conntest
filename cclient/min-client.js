const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

console.log('I am a client.');

const CONNECT_PORT = 8337;
const CONNECT_ADDR = 'host.docker.internal';

const net = require('net');

function connect() {
  const client = new net.Socket();
  console.log('connecting...');
  client.on('error', err => {
    console.log(err);
  });
  client.on('close', () => {
    console.log('disconnected');
    delay(500).then(() => {
      connect();
    });
  });
  client.on('connect', () => {
    console.log('connected');
  });
  client.connect(CONNECT_PORT, CONNECT_ADDR, () => {
    console.log('connect callback');
  });
}


connect();