const getCurrencyPrice = (data, clientType) => {
  if (clientType === 'telegramApp') {
    return `Цена: ${data} ₽`;
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: false, data: `Этот метод предназначен только для бота` });
  }
};

module.exports = getCurrencyPrice;
