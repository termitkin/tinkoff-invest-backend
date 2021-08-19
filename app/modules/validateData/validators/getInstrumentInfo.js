const getInstrumentInfo = (params) => {
  if (params.length > 2 || params[0].length === 0) {
    return { ok: false, errorName: 'incorrectParamsQuantity' };
  }

  return { ok: true };
};

module.exports = getInstrumentInfo;
