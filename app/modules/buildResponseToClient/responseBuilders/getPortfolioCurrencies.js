const currencySigns = require('../../../utils/constants').currencySigns;

const getPortfolioCurrencies = (data, clientType) => {
  const { currencies } = data;

  if (clientType === 'telegramApp') {
    return 'Этот метод предназначен для webApp';
  } else if (clientType === 'webApp') {
    return JSON.stringify({
      ok: true,
      data: currencies.map((currency) => {
        currency.currencySign = currencySigns[currency.currency];
        return currency;
      }),
    });
  }
};

module.exports = getPortfolioCurrencies;
