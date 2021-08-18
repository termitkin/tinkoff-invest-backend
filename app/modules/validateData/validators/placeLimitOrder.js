const placeLimitOrder = (params) => {
  if (params.length !== 4) {
    return 'incorrectParamsQuantity';
  }

  const [_, count, operation, price] = params;
  const regexCheckNumbers = /^[0-9\.]+$/;

  if (!regexCheckNumbers.test(count) || !regexCheckNumbers.test(price)) {
    return 'incorrectParamType';
  }
  if (!/^(Sell|Buy)$/.test(operation)) {
    return 'incorrectParamType';
  }

  return { ok: true };
};

module.exports = placeLimitOrder;
