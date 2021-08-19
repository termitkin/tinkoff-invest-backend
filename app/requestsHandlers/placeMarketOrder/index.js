const api = require('../../utils/api');

const getFromCache = require('../../utils/cache/getFromCache');
const putToCache = require('../../utils/cache/putToCache');
const capitalizeFirstLetter = require('../../utils/capitalizeFirstLetter');

const placeMarketOrder = async (myDataParams) => {
  const [ticker, lots, operation] = myDataParams;

  let figi;

  try {
    const dataFromCache = getFromCache(ticker, ['figi']);

    if (!dataFromCache) {
      figi = (await api.searchOne({ ticker })).figi;
    } else {
      figi = dataFromCache.figi;
      putToCache(ticker, { figi });
    }
  } catch (e) {
    throw new Error('instrumentNotFound');
  }

  try {
    return {
      ok: true,
      data: {
        ...(await api.marketOrder({
          figi,
          lots: Number.parseInt(lots, 10),
          operation: capitalizeFirstLetter(operation),
        })),
      },
    };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`placeMarketOrder: ${errorMessage}`);
    }

    throw new Error('В placeMarketOrder что-то пошло не так');
  }
};

module.exports = placeMarketOrder;
