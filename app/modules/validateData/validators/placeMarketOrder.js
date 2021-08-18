const placeMarketOrder = (params) => {
  if (params.length !== 3) {
    return 'incorrectParamsQuantity';
  }

  const [_, count, operation] = params;
  const regexCheckNumbers = /^[0-9]+$/;

  if (!regexCheckNumbers.test(count)) {
    return 'incorrectParamType';
  }
  if (!/^(Sell|Buy)$/.test(operation)) {
    return 'incorrectParamType';
  }

  return { ok: true };
};

module.exports = placeMarketOrder;
