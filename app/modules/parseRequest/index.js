const parseRequest = (req, client) => {
  const { clientType } = client;
  const request = {};
  let myData;

  if (clientType === 'telegramApp') {
    myData = req.body.message.text;
  } else if (clientType === 'webApp') {
    myData = req.body.myData;
  }

  if (myData.startsWith('/getBalance')) {
    request.requestType = 'getBalance';
    request.myDataParams = [];
    return request;
  }
  if (myData.startsWith('/getOrders')) {
    request.requestType = 'getOrders';
    request.myDataParams = [];
    return request;
  }
  if (myData.startsWith('/getPortfolioCurrencies')) {
    request.requestType = 'getPortfolioCurrencies';
    request.myDataParams = [];
    return request;
  }
  if (myData.startsWith('/getPortfolio')) {
    request.requestType = 'getPortfolio';
    request.myDataParams = [];
    return request;
  }
  if (myData.startsWith('/getInstrumentInfo')) {
    request.requestType = 'getInstrumentInfo';
    const params = myData.split(' ');
    request.myDataParams = [...params.slice(1)];
    return request;
  }
  if (myData.startsWith('/getStockPrice')) {
    request.requestType = 'getStockPrice';
    const params = myData.split(' ');
    request.myDataParams = params[1];
    return request;
  }
  if (myData.startsWith('/getCurrencyPrice')) {
    request.requestType = 'getCurrencyPrice';
    const params = myData.split(' ');
    request.myDataParams = [...params.slice(1)];
    return request;
  }
  if (myData.startsWith('/getHelp')) {
    request.requestType = 'getHelp';
    request.myDataParams = [];
    return request;
  }
  if (myData.startsWith('/placeLimitOrder')) {
    request.requestType = 'placeLimitOrder';
    const params = myData.split(' ');
    request.myDataParams = [...params.slice(1)];
    return request;
  }
  if (myData.startsWith('/placeMarketOrder')) {
    request.requestType = 'placeMarketOrder';
    const params = myData.split(' ');
    request.myDataParams = [...params.slice(1)];
    return request;
  }
  if (myData.startsWith('/cancelOrder')) {
    request.requestType = 'cancelOrder';
    const params = myData.split(' ');
    request.myDataParams = [...params.slice(1)];
    return request;
  }

  throw new Error('cantIdentifyDataType');
};

module.exports = parseRequest;
