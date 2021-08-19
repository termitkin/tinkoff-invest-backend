const WebSocket = require('ws').Server;
const express = require('express');
const main = require('./routesHandlers/main');
const notFound = require('./routesHandlers/notFound');
const handleConnectionOpened = require('./webSockets/handleConnectionOpened');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const cache = require('./utils/cache/cache');
const cacheFile = existsSync('cache.json') && JSON.parse(readFileSync('cache.json'));

if (cacheFile) {
  cache.instruments = cacheFile.instruments;
}

const app = express();
app.listen(3025, () => console.log(`app started on port: 3025`));

app.use('/api', main);
app.use('*', notFound);

const wss = new WebSocket({ port: 3026 });
const clients = new Map();

wss.on('connection', (client) => handleConnectionOpened(clients, client));

if (process.platform === 'win32') {
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', function () {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function () {
  wss.close();

  writeFileSync('cache.json', JSON.stringify(cache, null, 2), (err) => {
    console.log(`При записи кеша что-то пошло не так: ${err}`);
  });

  process.exit();
});
