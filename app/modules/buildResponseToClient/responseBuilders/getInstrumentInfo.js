const getInstrumentInfo = (data, clientType) => {
  if (clientType === 'telegramApp') {
    return 'Этот метод предназначен для webApp';
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: true, data });
  }
};

module.exports = getInstrumentInfo;
