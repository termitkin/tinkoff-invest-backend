const identifyClient = (req) => {
  const userId = req.body?.message?.from?.id;
  const mySecret = req.header('Authorization');

  if (userId) {
    const chatId = req.body.message.chat.id;

    return { ok: true, clientType: 'telegramApp', chatId };
  }
  if (mySecret) {
    return { ok: true, clientType: 'webApp' };
  }

  return { ok: false, errorName: 'cantIdentifyClientType' };
};

module.exports = identifyClient;
