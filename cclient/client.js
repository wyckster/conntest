require('dotenv').config();
const net = require('net');
const { log } = require('../common/log');
const { delay } = require('../common/delay');
const { requiredSetting } = require('../common/required-setting');

log('I am cclient.');

const CONNECT_PORT = requiredSetting('CONNECT_PORT');
const CONNECT_ADDR = requiredSetting('CONNECT_ADDR');

function connect() {
  const client = new net.Socket();
  log('connecting...');
  client.on('error', err => {
    log(`${err}`);
  });
  client.on('close', () => {
    log('disconnected');
    delay(500).then(() => {
      connect();
    });
  });
  client.on('connect', () => {
    log('connected');
  });
  client.connect(CONNECT_PORT, CONNECT_ADDR, () => {
    log('connect callback');
  });
}

connect();