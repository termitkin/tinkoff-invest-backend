const handleReceivedMessage = require('./handleReceivedMessage');
const handleConnectionError = require('./handleConnectionError');
const handleConnectionClosed = require('./handleConnectionClosed');

const handleConnectionOpened = (clients, client) => {
  client.on('message', async (message) => await handleReceivedMessage(clients, client, message));
  client.on('close', () => handleConnectionClosed(clients, client));
  client.on('error', handleConnectionError);
};

module.exports = handleConnectionOpened;
