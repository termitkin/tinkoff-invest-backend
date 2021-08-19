const placeMarketOrder = (params) => {
  if (params.length !== 3) {
    return { ok: false, errorName: 'incorrectParamsQuantity' };
  }

  const [_, count, operation] = params;
  const regexCheckNumbers = /^[0-9]+$/;

  if (!regexCheckNumbers.test(count)) {
    return { ok: false, errorName: 'incorrectParamType' };
  }
  if (!/^(sell|buy)$/i.test(operation)) {
    return { ok: false, errorName: 'incorrectParamType' };
  }

  return { ok: true };
};

module.exports = placeMarketOrder;
