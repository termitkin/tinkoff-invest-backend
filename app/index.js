const WebSocket = require('ws').Server;
const express = require('express');
const main = require('./routesHandlers/main');
const notFound = require('./routesHandlers/notFound');
const handleConnectionOpened = require('./webSockets/handleConnectionOpened');
const getCurrentDate = require('./utils/getCurrentDate');

const app = express();
app.listen(3025, () => console.log(`app started on port: 3025 ${getCurrentDate()}`));

app.use('/api', main);
app.use('*', notFound);

const wss = new WebSocket({ port: 3026 });
const clients = new Map();

wss.on('connection', (client) => handleConnectionOpened(clients, client));
