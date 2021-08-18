const getBalance = (data, clientType) => {
  if (clientType === 'telegramApp') {
    return `Баланс: ${data} ₽`;
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: true, data: `Баланс: ${data} ₽` });
  }
};

module.exports = getBalance;
