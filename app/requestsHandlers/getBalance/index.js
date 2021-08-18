const api = require('../../utils/api');
const getCurrencyRates = require('../../utils/getCurrencyRates');

const getBalance = async () => {
  const { positions } = await api.portfolio();
  const [usd, eur] = await getCurrencyRates();
  let sum = 0;

  for (const position of positions) {
    const currency = position.expectedYield.currency;
    const value = position.expectedYield.value;

    if (currency === 'RUB') {
      sum += value;
    } else if (currency === 'USD') {
      sum += value * usd;
    } else if (currency === 'EUR') {
      sum += value * eur;
    } else {
      throw new Error('Нет курса этой валюты');
    }
  }

  return { ok: true, data: sum.toFixed(2) };
};

module.exports = getBalance;
