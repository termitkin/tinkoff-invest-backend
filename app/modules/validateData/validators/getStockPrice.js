const getStockPrice = (params) => {
  if (typeof params !== 'string') {
    return 'incorrectParamsType';
  }
  return { ok: true };
};

module.exports = getStockPrice;
