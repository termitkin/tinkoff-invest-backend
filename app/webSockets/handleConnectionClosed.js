const handleConnectionClosed = (clients, client) => {
  if (clients.has(client)) {
    const { unSubscribe } = clients.get(client);
    unSubscribe();
    clients.delete(client);
  }
};

module.exports = handleConnectionClosed;
