const api = require('../../utils/api');

const getFromCache = require('../../utils/cache/getFromCache');
const putToCache = require('../../utils/cache/putToCache');

const placeLimitOrder = async (myDataParams) => {
  const [ticker, lots, operation, price] = myDataParams;

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
        ...(await api.limitOrder({
          figi,
          lots: Number.parseInt(lots, 10),
          operation,
          price: Number.parseFloat(price, 10),
        })),
      },
    };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`placeLimitOrder: ${errorMessage}`);
    }

    throw new Error('В placeLimitOrder что-то пошло не так');
  }
};

module.exports = placeLimitOrder;
