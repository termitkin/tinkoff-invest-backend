const api = require('../../utils/api');
const getFromCache = require('../../utils/cache/getFromCache');
const putToCache = require('../../utils/cache/putToCache');

const getStockPrice = async (ticker) => {
  try {
    let figi;
    let name;
    let currency;

    const dataFromCache = getFromCache(ticker, ['figi', 'name', 'currency']);

    if (!dataFromCache) {
      const data = await api.searchOne({ ticker: ticker });

      figi = data.figi;
      name = data.name;
      currency = data.currency;

      putToCache(ticker, { figi, name, currency });
    } else {
      figi = dataFromCache.figi;
      name = dataFromCache.name;
      currency = dataFromCache.currency;
    }

    const { lastPrice } = await api.orderbookGet({ figi, depth: 1 });

    return { ok: true, data: { name, currency, lastPrice } };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`getStockPrice: ${errorMessage}`);
    }

    throw new Error('В getStockPrice что-то пошло не так');
  }
};

module.exports = getStockPrice;
