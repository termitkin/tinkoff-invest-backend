const placeLimitOrder = (params) => {
  if (params.length !== 4) {
    return { ok: false, errorName: 'incorrectParamsQuantity' };
  }

  const [_, count, operation, price] = params;
  const regexCheckNumbers = /^[0-9\.]+$/;

  if (!regexCheckNumbers.test(count) || !regexCheckNumbers.test(price)) {
    return { ok: false, errorName: 'incorrectParamType' };
  }
  if (!/^(sell|buy)$/i.test(operation)) {
    return { ok: false, errorName: 'incorrectParamType' };
  }

  return { ok: true };
};

module.exports = placeLimitOrder;
