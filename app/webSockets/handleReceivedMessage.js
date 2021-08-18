const api = require('../utils/api');

const handleReceivedMessage = async (clients, client, m) => {
  const message = JSON.parse(m);
  const { figi } = message;

  if (clients.has(client)) {
    const { unSubscribe } = clients.get(client);
    unSubscribe();
  }

  if (!message.hasOwnProperty('figi')) {
    return client.send(JSON.stringify({ ok: false, text: 'Не присланы figi' }));
  }

  const unSubscribe = await api.orderbook({ figi, depth: 20 }, (data) => {
    client.send(JSON.stringify({ ...data }));
  });

  clients.set(client, { unSubscribe });
};

module.exports = handleReceivedMessage;
