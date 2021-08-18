const identifyClientType = (req) => {
  const userId = Number.parseInt(req?.body?.message?.from?.id, 10);
  const mySecret = req?.header('Authorization');

  if (!Number.isNaN(userId)) {
    return { ok: true, clientType: 'telegramApp' };
  }
  if (mySecret) {
    return { ok: true, clientType: 'webApp' };
  }

  throw new Error('cantIdentifyClientType');
};

module.exports = identifyClientType;
