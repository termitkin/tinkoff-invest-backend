const api = require('../../utils/api');

const getPortfolioCurrencies = async () => {
  try {
    const portfolioCurrencies = await api.portfolioCurrencies();

    return { ok: true, data: portfolioCurrencies };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`getPortfolioCurrencies: ${errorMessage}`);
    }
    throw new Error('В getPortfolioCurrencies что-то пошло не так');
  }
};

module.exports = getPortfolioCurrencies;
