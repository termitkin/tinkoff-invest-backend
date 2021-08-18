const api = require('../../utils/api');
const CONSTANTS = require('../../utils/constants/index').currencySigns;
const getFromCache = require('../../utils/cache/getFromCache');
const putToCache = require('../../utils/cache/putToCache');

const getInstrumentInfo = async (myDataParams) => {
  const [instrumentId, type] = myDataParams;
  let figi;
  let instrumentData;

  try {
    if (type === 'ticker') {
      const dataFromCache = getFromCache(instrumentId, [
        'figi',
        'ticker',
        'minPriceIncrement',
        'quantityInOneLot',
        'instrumentType',
        'lot',
        'currency',
        'currencySign',
        'name',
        'type',
      ]);

      if (!dataFromCache) {
        instrumentData = await api.searchOne({ ticker: instrumentId });

        figi = instrumentData.figi;

        putToCache(instrumentId, {
          ...instrumentData,
          instrumentType: instrumentData.type,
          quantityInOneLot: instrumentData.lot,
          currencySign: CONSTANTS[instrumentData.currency],
        });
      } else {
        figi = dataFromCache.figi;
        instrumentData = dataFromCache;
      }
    } else if (type === 'figi') {
      figi = instrumentId;
    }

    const { tradeStatus, minPriceIncrement, lastPrice } = await api.orderbookGet({
      figi,
      depth: 0,
    });

    let decimalPlaces = 0;

    if (minPriceIncrement) {
      const dotIndex = minPriceIncrement.toString().indexOf('.');
      decimalPlaces = minPriceIncrement.toString().length - (dotIndex + 1);
    }

    if (type === 'figi') {
      return { ok: true, data: { figi, tradeStatus, minPriceIncrement, lastPrice, decimalPlaces } };
    }
    return { ok: true, data: { figi, tradeStatus, minPriceIncrement, lastPrice, decimalPlaces, ...instrumentData } };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`getInstrumentInfo: ${errorMessage}`);
    }

    throw new Error('В getInstrumentInfo что-то пошло не так');
  }
};

module.exports = getInstrumentInfo;
