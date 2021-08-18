const validators = {
  getStockPrice: require('./validators/getStockPrice'),
  cancelOrder: require('./validators/cancelOrder'),
  getCurrency: require('./validators/getCurrency'),
  placeLimitOrder: require('./validators/placeLimitOrder'),
  placeMarketOrder: require('./validators/placeMarketOrder'),
  getInstrumentInfo: require('./validators/getInstrumentInfo'),
};

const validateData = ({ requestType, myDataParams }) => {
  if (validators.hasOwnProperty(requestType)) {
    const validation = validators[requestType](myDataParams);

    if (validation.ok) {
      return true;
    }

    throw new Error(validation);
  }

  return true;
};

module.exports = validateData;
