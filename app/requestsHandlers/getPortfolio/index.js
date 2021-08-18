const api = require('../../utils/api');
const getCurrencyRates = require('../../utils/getCurrencyRates');
const currencySigns = require('../../utils/constants/currencySigns');

const getFromCache = require('../../utils/cache/getFromCache');
const putToCache = require('../../utils/cache/putToCache');

const sortPortfolioByYield = async (pos) => {
  const positions = pos.slice();

  const [usd, eur] = await getCurrencyRates();

  return positions.sort((a, b) => {
    if (a.expectedYield.currency === b.expectedYield.currency) {
      return b.expectedYield.value - a.expectedYield.value;
    }

    let aValueInRub;
    let bValueInRub;

    if (a.expectedYield.currency === 'USD') {
      aValueInRub = a.expectedYield.value * usd;
    } else if (a.expectedYield.currency === 'EUR') {
      aValueInRub = a.expectedYield.value * eur;
    } else {
      aValueInRub = a.expectedYield.value;
    }

    if (b.expectedYield.currency === 'USD') {
      bValueInRub = b.expectedYield.value * usd;
    } else if (b.expectedYield.currency === 'EUR') {
      bValueInRub = b.expectedYield.value * eur;
    } else {
      bValueInRub = b.expectedYield.value;
    }

    return bValueInRub - aValueInRub;
  });
};

const groupPortfolioByType = (positions) => {
  return positions.reduce((acc, curr) => {
    if (curr.instrumentType === 'Stock') {
      if (!('stocks' in acc)) {
        acc.stocks = [];
      }
      acc.stocks.push({ ...curr });
    } else if (curr.instrumentType === 'Bond') {
      if (!'bonds' in acc) {
        acc.bonds = [];
      }
      acc.bonds.push({ ...curr });
    } else if (curr.instrumentType === 'Etf') {
      if (!('etfs' in acc)) {
        acc.etfs = [];
      }
      acc.etfs.push({ ...curr });
    } else if (curr.instrumentType === 'Currency') {
      if (!('currencies' in acc)) {
        acc.currencies = [];
      }
      acc.currencies.push({ ...curr });
    }
    return acc;
  }, {});
};

const addRequiredFields = async (positions) => {
  return await Promise.all(
    positions.map(async (position) => {
      let minPriceIncrement;
      let decimalPlaces = 0;

      const dataFromCache = getFromCache(position.ticker, ['minPriceIncrement', 'decimalPlaces']);

      if (!dataFromCache) {
        const { minPriceIncrement } = await api.orderbookGet({
          figi: position.figi,
          depth: 0,
        });

        dotIndex = minPriceIncrement.toString().indexOf('.');
        decimalPlaces = minPriceIncrement.toString().length - (dotIndex + 1);

        putToCache(position.ticker, { figi: position.figi, minPriceIncrement, decimalPlaces });
      } else {
        minPriceIncrement = dataFromCache.minPriceIncrement;
        decimalPlaces = dataFromCache.decimalPlaces;
      }

      const averagePositionPriceValue = position.averagePositionPrice.value;
      const expectedYieldValue = position.expectedYield.value;
      const currency = position.averagePositionPrice.currency;
      const quantityInOneLot = position.balance / position.lots;
      const currencySign = currencySigns[currency];

      position = {
        ...position,
        minPriceIncrement,
        decimalPlaces,
        averagePositionPriceValue,
        expectedYieldValue,
        quantityInOneLot,
        currency,
        currencySign,
      };

      delete position.averagePositionPrice;
      delete position.expectedYield;

      return position;
    })
  );
};

const getPortfolio = async () => {
  const { positions } = await api.portfolio();
  const instrumentsQuantity = positions.length;

  const data = groupPortfolioByType(await addRequiredFields(await sortPortfolioByYield(positions)));

  return { ok: true, data: { ...data, instrumentsQuantity } };
};

module.exports = getPortfolio;
