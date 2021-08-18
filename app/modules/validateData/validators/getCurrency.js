const getCurrency = (params) => {
  const [currency] = params;

  if (params.length !== 1) {
    return 'incorrectParamsQuantity';
  } else if (currency.length !== 3) {
    return 'incorrectCurrencyId';
  }
  return { ok: true };
};

module.exports = getCurrency;
