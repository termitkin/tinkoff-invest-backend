const api = require('../../utils/api');

const getOrders = async () => {
  const orders = await api.orders();

  if (!orders.length) {
    return { ok: true, data: [] };
  }

  const uniqueFigies = new Set();
  let uniqueInstruments = [];

  orders.forEach((order) => {
    if (!uniqueFigies.has(order.figi)) {
      uniqueFigies.add(order.figi);
      uniqueInstruments.push(api.searchOne({ figi: order.figi }));
    }
  });

  uniqueInstruments = await Promise.all(uniqueInstruments);

  return {
    ok: true,
    data: orders.map((order) => {
      return { ...order, ...uniqueInstruments.find((instrument) => instrument.figi === order.figi) };
    }),
  };
};

module.exports = getOrders;
