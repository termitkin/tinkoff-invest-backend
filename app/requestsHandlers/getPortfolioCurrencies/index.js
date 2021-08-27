const api = require('../../utils/api');

const getPortfolioCurrencies = async () => {
  try {
    const portfolioCurrencies = await api.portfolioCurrencies();

    return { ok: true, data: portfolioCurrencies };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      return { ok: true, error: true, data: { text: errorMessage } };
    }
    throw new Error('В getPortfolioCurrencies что-то пошло не так');
  }
};

module.exports = getPortfolioCurrencies;
