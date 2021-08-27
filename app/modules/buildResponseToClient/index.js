const responseBuilders = {
  getBalance: require('./responseBuilders/getBalance'),
  getPortfolio: require('./responseBuilders/getPortfolio'),
  getPortfolioCurrencies: require('./responseBuilders/getPortfolioCurrencies'),
  getCurrencyPrice: require('./responseBuilders/getCurrencyPrice'),
  getInstrumentInfo: require('./responseBuilders/getInstrumentInfo'),
  getStockPrice: require('./responseBuilders/getStockPrice'),
  getHelp: require('./responseBuilders/getHelp'),
  cancelOrder: require('./responseBuilders/cancelOrder'),
  getOrders: require('./responseBuilders/getOrders'),
  placeLimitOrder: require('./responseBuilders/placeLimitOrder'),
  placeMarketOrder: require('./responseBuilders/placeMarketOrder'),
};

const buildResponseToClient = ({ dataFromStock, requestType, clientType }) => {
  const { ok, error, data } = dataFromStock;

  if (error) {
    return JSON.stringify({ ok, error, data });
  }

  return responseBuilders[requestType](data, clientType);
};
module.exports = buildResponseToClient;
