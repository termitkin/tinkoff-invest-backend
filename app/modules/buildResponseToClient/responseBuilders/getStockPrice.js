const currencySigns = require('../../../utils/constants').currencySigns;

const getStockPrice = (data, clientType) => {
  const { name, lastPrice, currency } = data;

  if (clientType === 'telegramApp') {
    return `${name}: ${lastPrice} ${currencySigns[currency]}`;
  } else if (clientType === 'webApp') {
    data.currencySign = currencySigns[currency];
    return JSON.stringify({ ok: true, data });
  }
};

module.exports = getStockPrice;
