const { SYSTEM_OWNER_ID } = require('../../utils/constants').system;
const { TELEGRAM_BOT_TOKEN } = require('../../utils/constants').telegram;

const auth = (req) => {
  const ownerId = Number.parseInt(SYSTEM_OWNER_ID, 10);
  const userId = Number.parseInt(req?.body?.message?.from?.id, 10);
  const mySecret = req.header('Authorization');

  if (!(ownerId === userId || TELEGRAM_BOT_TOKEN === mySecret)) {
    throw new Error('permissionDenied');
  }

  return true;
};

module.exports = auth;
