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

        const instrumentType = instrumentData.type;
        const quantityInOneLot = instrumentData.lot;
        const currencySign = CONSTANTS[instrumentData.currency];

        instrumentData = { ...instrumentData, instrumentType, quantityInOneLot, currencySign };

        figi = instrumentData.figi;

        putToCache(instrumentId, {
          ...instrumentData,
          instrumentType,
          quantityInOneLot,
          currencySign,
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
      return { ok: true, error: true, data: { text: errorMessage } };
    }

    throw new Error('?? getInstrumentInfo ??????-???? ?????????? ???? ??????');
  }
};

module.exports = getInstrumentInfo;
