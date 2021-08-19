const { errors } = require('../../utils/constants');
const sendMessageToTelegram = require('../sendMessageToTelegram');

const errorHandler = async (err, res, client) => {
  const { clientType, chatId } = client;

  console.log(err);

  try {
    const { statusCode, text } = errors[err.message];

    if (clientType === 'webApp') {
      return res.status(statusCode).json(JSON.stringify({ ok: false, data: { text } }));
    }
    await sendMessageToTelegram(text, chatId, res);
  } catch (err) {
    console.log(err);

    if (clientType === 'webApp') {
      return res.status(500).json(JSON.stringify({ ok: false, data: { text: 'На сервере что-то пошло не так' } }));
    }
    await sendMessageToTelegram('На сервере что-то пошло не так', chatId, res);
  }
};

module.exports = errorHandler;
