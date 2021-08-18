const api = require('../../utils/api');
const CONSTANTS = require('../../utils/constants').figi;

const getCurrencyPrice = async (curr) => {
  const [currency] = curr;

  try {
    const lastPrice = (await api.orderbookGet({ figi: CONSTANTS[`${currency}_FIGI`], depth: 1 })).lastPrice;
    return { ok: true, data: lastPrice };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`getCurrencyPrice: ${errorMessage}`);
    }

    throw new Error('В getCurrencyPrice что-то пошло не так');
  }
};

module.exports = getCurrencyPrice;
