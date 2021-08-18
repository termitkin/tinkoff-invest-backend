const getInstrumentInfo = (params) => {
  if (params.length > 2 || params[0].length === 0) {
    return 'incorrectParamsQuantity';
  }

  return { ok: true };
};

module.exports = getInstrumentInfo;
