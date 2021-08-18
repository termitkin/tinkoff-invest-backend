const requestsHandlers = {
  getBalance: require('./getBalance'),
  getCurrencyPrice: require('./getCurrencyPrice'),
  getOrders: require('./getOrders'),
  getPortfolio: require('./getPortfolio'),
  getPortfolioCurrencies: require('./getPortfolioCurrencies'),
  getInstrumentInfo: require('./getInstrumentInfo'),
  getStockPrice: require('./getStockPrice'),
  getHelp: require('./getHelp'),
  placeLimitOrder: require('./placeLimitOrder'),
  placeMarketOrder: require('./placeMarketOrder'),
  cancelOrder: require('./cancelOrder'),
};

module.exports = async ({ requestType, myDataParams }) => await requestsHandlers[requestType](myDataParams);
