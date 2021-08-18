const currencySigns = require('../../../utils/constants').currencySigns;

const dic = {
  positionsNotFound: 'В портфеле нет бумаг',
  instrumentsQuantity: 'Всего бумаг в портфеле',
  type: 'Тип',
  expectedYield: 'Доход',
  balance: 'Количество',
  lots: 'Лотов',
  averagePositionPrice: 'Средняя',
  pcs: 'шт',
  stocks: 'Акции',
  etfs: 'Фонды',
  bonds: 'Облигации',
  currencies: 'Валюты',
};

const getTextToSend = ({ type, positions }) => {
  let textToSend = '';

  textToSend += `\n${dic[type]} (${positions.length} ${dic.pcs}):\n`;

  positions.forEach((item) => {
    textToSend += `${item.ticker} `;
    textToSend += `${dic.expectedYield}: ${item.averagePositionPriceValue} ${currencySigns[item.currency]}, `;

    if (type === 'currencies') {
      textToSend += `${dic.balance}: ${item.balance}, `;
    } else {
      textToSend += `${dic.lots}: ${item.lots}, `;
    }

    textToSend += `${dic.averagePositionPrice}: ${item.averagePositionPriceValue} ${currencySigns[item.currency]}\n`;
  });

  return textToSend;
};

const buildResponseForTelegram = (data) => {
  let textToSend = '';

  if (data.stocks && data.stocks.length) {
    textToSend += getTextToSend({ type: 'stocks', positions: [...data.stocks] });
  }

  if (data.etfs && data.etfs.length) {
    textToSend += getTextToSend({ type: 'etfs', positions: [...data.etfs] });
  }

  if (data.bonds && data.bonds.length) {
    textToSend += getTextToSend({ type: 'bonds', positions: [...data.bonds] });
  }

  if (data.currencies && data.currencies.length) {
    textToSend += getTextToSend({ type: 'currencies', positions: [...data.currencies] });
  }

  textToSend += `\n${dic.instrumentsQuantity} ${data.instrumentsQuantity}\n`;

  return textToSend;
};

const getPortfolio = (data, clientType) => {
  if (clientType === 'telegramApp') {
    return buildResponseForTelegram(data);
  } else if (clientType === 'webApp') {
    return JSON.stringify({ ok: true, data });
  }
};

module.exports = getPortfolio;
