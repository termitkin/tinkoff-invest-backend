module.exports = {
  noRequiredData: {
    statusCode: 400,
    text: 'Данные нужно передать в body в поле myData',
  },
  incorrectParamsQuantity: {
    statusCode: 400,
    text: 'Неверное количество параметров',
  },
  incorrectOrderId: {
    statusCode: 400,
    text: 'Некорректный номер заявки',
  },
  incorrectCurrencyId: {
    statusCode: 400,
    text: 'Некорректный идентификатор валюты',
  },
  incorrectParamType: {
    statusCode: 400,
    text: 'Некорректный параметр или некорректный порядок параметров',
  },
  permissionDenied: {
    statusCode: 401,
    text: 'Пользоваться приложением может только владелец',
  },
  cantIdentifyClientType: {
    statusCode: 500,
    text: 'Тип клиента не определён',
  },
  cantIdentifyDataType: {
    statusCode: 501,
    text: 'Тип запроса не определён',
  },
  instrumentNotFound: {
    statusCode: 500,
    text: 'Инструмент не найден',
  },
};
