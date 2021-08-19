const getStockPrice = (params) => {
  if (typeof params !== 'string') {
    return { ok: false, errorName: 'incorrectParamsType' };
  }
  return { ok: true };
};

module.exports = getStockPrice;
