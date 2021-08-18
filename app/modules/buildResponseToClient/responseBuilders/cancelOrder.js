const cancelOrder = (data, clientType) => {
  if (clientType === 'telegramApp') {
    return `Заявка успешно отменена: ${data}`;
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: true, data: `Заявка успешно отменена: ${data}` });
  }
};

module.exports = cancelOrder;
