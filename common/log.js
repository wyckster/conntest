const { formatDate } = require('./format-date');

const now = () => formatDate(new Date());
const log = msg => console.log(`${now()}: ${msg}`);

module.exports = { log };