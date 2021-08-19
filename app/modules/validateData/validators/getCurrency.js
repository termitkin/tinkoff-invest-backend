const getCurrency = (params) => {
  const [currency] = params;

  if (params.length !== 1) {
    return { ok: false, errorName: 'incorrectParamsQuantity' };
  } else if (currency.length !== 3) {
    return { ok: false, errorName: 'incorrectCurrencyId' };
  }
  return { ok: true };
};

module.exports = getCurrency;
