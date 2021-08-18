const api = require('./api');
const { USD_FIGI, EUR_FIGI } = require('./constants/index').figi;

const getFromCache = require('./cache/getFromCache');
const putToCache = require('./cache/putToCache');

const getCurrencyRates = async () => {
  const usdFromCache = getFromCache(USD_FIGI, ['lastUpdate', 'lastPrice']);
  const eurFromCache = getFromCache(EUR_FIGI, ['lastUpdate', 'lastPrice']);

  const currentDate = Number(new Date());
  const threeMinutes = 180000;

  let usd;
  let eur;

  if (!usdFromCache || currentDate - usdFromCache.lastUpdate > threeMinutes) {
    usd = (await api.orderbookGet({ figi: USD_FIGI, depth: 1 })).lastPrice;

    putToCache(USD_FIGI, { lastUpdate: currentDate, lastPrice: usd });
  } else {
    usd = usdFromCache.lastPrice;
  }

  if (!eurFromCache || currentDate - eurFromCache.lastUpdate > threeMinutes) {
    eur = (await api.orderbookGet({ figi: EUR_FIGI, depth: 1 })).lastPrice;

    putToCache(EUR_FIGI, { lastUpdate: currentDate, lastPrice: eur });
  } else {
    eur = eurFromCache.lastPrice;
  }

  return [usd, eur];
};

module.exports = getCurrencyRates;
