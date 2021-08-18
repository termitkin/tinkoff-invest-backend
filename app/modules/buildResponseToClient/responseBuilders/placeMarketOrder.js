const dic = {
  limitOrderWrongParamsCount: 'Команде нужно передать 4 параметра: тикер, количество лотов, операцию и цену за лот',
  marketOrderWrongParamsCount: 'Команде нужно передать 3 параметра: тикер, количество лотов и операцию',
  instrumentNotFound: 'Инструмент с таким тикером не найден',
  orderId: 'Номер заявки',
  operation: 'Операция',
  status: 'Статус',
  requestedLots: 'Запрошено лотов',
  executedLots: 'Исполнено лотов',
  message: 'Сообщение',
  commission: 'Комиссия',

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

  // Возможные операции над бумагой:
  Sell: 'Продажа',
  Buy: 'Покупка',
};

const buildResponseForTelegram = ({ orderId, operation, status, requestedLots, executedLots, message }) => {
  return `
    ${dic.orderId}: ${orderId}
    ${dic.operation}: ${dic[operation]}
    ${dic.status}: ${dic[status]}
    ${dic.requestedLots}: ${requestedLots}
    ${dic.executedLots}: ${executedLots}
    ${typeof message === 'undefined' ? '' : `${dic.message}: ${message}`}
  `.replace(/^ +/gim, '');
};

const placeMarketOrder = (data, clientType) => {
  const { orderId, operation, status, requestedLots, executedLots, message } = data;

  if (clientType === 'telegramApp') {
    return buildResponseForTelegram({ orderId, operation, status, requestedLots, executedLots, message });
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: true, data });
  }
};

module.exports = placeMarketOrder;
