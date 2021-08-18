const buildGetHelp = () => {
  return `
      Список команд:

      /get_balance - Узнать баланс (доход за всё время)
      /get_portfolio - Получить ожидаемый доход по каждой бумаге в портфеле
      /get_orders - Получить список активных заявок
      /get_stock_price %stock_ticker% - Получить последнюю цену бумаги по тикеру
      /cancel_order %order_id% - Отменить заявку. order_id можно взять из /get_orders
      /place_limit_order %ticker% %count% %sell|buy% %price% - Разместить лимитную заявку. Порядок параметров важен, регистр нет. Пример - /place_limit_order ozon 1 sell 4200
      /place_market_order %ticker% %count% %sell|buy% - Разместить рыночную заявку. Порядок параметров важен, регистр нет. Пример - /place_market_order ozon 1 sell
      /get_usd - Получить последнюю цену доллара
      /get_eur - Получить последнюю цену евро
      /get_help - Вывести список всех команд
  `;
};

module.exports = buildGetHelp;
