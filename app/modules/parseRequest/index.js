const parseRequest = (req, state) => {
  const { clientType } = state;
  let myData;

  if (clientType === 'telegramApp') {
    myData = req.body.message.text;
  } else if (clientType === 'webApp') {
    myData = req.body.myData;
  }

  if (myData.startsWith('/getBalance')) {
    state.requestType = 'getBalance';
    state.myDataParams = [];
    return state;
  }
  if (myData.startsWith('/getOrders')) {
    state.requestType = 'getOrders';
    state.myDataParams = [];
    return state;
  }
  if (myData.startsWith('/getPortfolioCurrencies')) {
    state.requestType = 'getPortfolioCurrencies';
    state.myDataParams = [];
    return state;
  }
  if (myData.startsWith('/getPortfolio')) {
    state.requestType = 'getPortfolio';
    state.myDataParams = [];
    return state;
  }
  if (myData.startsWith('/getInstrumentInfo')) {
    state.requestType = 'getInstrumentInfo';
    const params = myData.split(' ');
    state.myDataParams = [...params.slice(1)];
    return state;
  }
  if (myData.startsWith('/getStockPrice')) {
    state.requestType = 'getStockPrice';
    const params = myData.split(' ');
    state.myDataParams = params[1];
    return state;
  }
  if (myData.startsWith('/getCurrencyPrice')) {
    state.requestType = 'getCurrencyPrice';
    const params = myData.split(' ');
    state.myDataParams = [...params.slice(1)];
    return state;
  }
  if (myData.startsWith('/getHelp')) {
    state.requestType = 'getHelp';
    state.myDataParams = [];
    return state;
  }
  if (myData.startsWith('/placeLimitOrder')) {
    state.requestType = 'placeLimitOrder';
    const params = myData.split(' ');
    state.myDataParams = [...params.slice(1)];
    return state;
  }
  if (myData.startsWith('/placeMarketOrder')) {
    state.requestType = 'placeMarketOrder';
    const params = myData.split(' ');
    state.myDataParams = [...params.slice(1)];
    return state;
  }
  if (myData.startsWith('/cancelOrder')) {
    state.requestType = 'cancelOrder';
    const params = myData.split(' ');
    state.myDataParams = [...params.slice(1)];
    return state;
  }

  throw new Error('cantIdentifyDataType');
};

module.exports = parseRequest;
