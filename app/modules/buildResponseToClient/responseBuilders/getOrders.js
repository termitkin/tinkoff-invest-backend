const currencySigns = require('../../../utils/constants').currencySigns;

const dic = {
  orderId: 'Номер заявки',
  operation: 'Операция',
  status: 'Статус',
  requestedLots: 'Запрошено лотов',
  executedLots: 'Исполнено лотов',
  name: 'Имя',
  type: 'Тип',
  price: 'Цена',
  currency: 'Валюта',
  minPriceIncrement: 'Минимальный шаг',
  lot: 'Бумаг в лоте',
  priceTotal: 'Цена заявки',
  ordersNotFound: 'Активных заявок нет',

  // Возможные статусы заявки:
  New: 'Новая',
  PendingNew: 'Создаётся',
  PartiallyFill: 'Частично исполнена',
  Fill: 'Исполнена',
  Cancelled: 'Отменена',
  PendingCancel: 'Ожидается отмена',
  Replaced: 'Перевыставление',
  PendingReplace: 'Ожидание перевыставления',
  Rejected: 'Не создана',

  // Возможные типы бумаг:
  Stock: 'Акция',
  Bond: 'Облигация',
  Etf: 'Фонд',
  Currency: 'Валюта',

  // Возможные операции над бумагой:
  Sell: 'Продажа',
  Buy: 'Покупка',
};

const buildResponseForTelegram = (data) => {
  if (typeof data === 'string') {
    return data;
  }

  let response = '';

  response += data.map((order) => {
    const {
      name,
      operation,
      status,
      type,
      requestedLots,
      price,
      currency,
      orderId,
      ticker,
      minPriceIncrement,
      executedLots,
      lot,
    } = order;

    const requestedCount = lot * requestedLots;
    const priceTotal = price * requestedCount;

    return `
      ${ticker} ${name}
      ${dic.requestedLots}: ${requestedLots}, ${dic.executedLots}: ${executedLots}
      ${dic.price}: ${price} ${currencySigns[currency]}
      ${dic.priceTotal}: ${priceTotal} ${currencySigns[currency]}
      ${dic.operation}: ${dic[operation]}, ${dic.status}: ${dic[status]}, ${dic.type}: ${dic[type]}
      ${dic.minPriceIncrement}: ${minPriceIncrement}
      ${dic.orderId}: ${orderId}
    `.replace(/^ +/gim, '');
  });

  return JSON.stringify(response);
};

const buildResponseForWebApp = (data) => {
  if (typeof data === 'string') {
    return JSON.stringify({ ok: true, data });
  }

  return JSON.stringify({
    ok: true,
    data: data.map((order) => {
      const requestedCount = order.lot * order.requestedLots;
      const priceTotal = order.price * requestedCount;

      return { ...order, priceTotal, currencySign: currencySigns[order.currency] };
    }),
  });
};

const getOrders = (data, clientType) => {
  if (!data.length) {
    data = 'Активных заявок нет';
  }

  if (clientType === 'telegramApp') {
    return buildResponseForTelegram(data);
  } else if (clientType === 'webApp') {
    return buildResponseForWebApp(data);
  }
};

module.exports = getOrders;
