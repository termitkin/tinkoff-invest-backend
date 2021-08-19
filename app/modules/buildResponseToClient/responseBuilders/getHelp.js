const getHelp = () => {
  return `
      Список команд:

      /get_balance - Доход за всё время
      /get_portfolio - Ожидаемый доход по каждой бумаге в портфеле
      /get_orders - Список активных заявок
      /get_usd - Последняя цена доллара
      /get_eur - Последняя цена евро
      /get_stock_price %stock_ticker% - Последняя цена бумаги по тикеру
      /cancel_order %order_id% - Отменить заявку. order_id можно взять из /get_orders
      /place_limit_order %ticker% %count% %sell|buy% %price% - Разместить лимитную заявку. Пример - /place_limit_order ozon 1 sell 4200
      /place_market_order %ticker% %count% %sell|buy% - Разместить рыночную заявку. Пример - /place_market_order ozon 1 sell
      /get_help - Вывести список всех команд
  `
    .replace(/^ +/gim, '')
    .trim();
};

module.exports = getHelp;
