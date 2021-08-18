const responseBuilders = {
  getBalance: require('./responseBuilders/getBalance'),
  getPortfolio: require('./responseBuilders/getPortfolio'),
  getPortfolioCurrencies: require('./responseBuilders/getPortfolioCurrencies'),
  getInstrumentInfo: require('./responseBuilders/getInstrumentInfo'),
  getStockPrice: require('./responseBuilders/getStockPrice'),
  getHelp: require('./responseBuilders/getHelp'),
  cancelOrder: require('./responseBuilders/cancelOrder'),
  getOrders: require('./responseBuilders/getOrders'),
  placeLimitOrder: require('./responseBuilders/placeLimitOrder'),
  placeMarketOrder: require('./responseBuilders/placeMarketOrder'),
  errorResponse: require('./responseBuilders/errorResponse'),
};

const buildResponseToClient = ({ data, requestType, errorType, clientType }) =>
  responseBuilders[requestType](data, clientType, errorType);
module.exports = buildResponseToClient;
