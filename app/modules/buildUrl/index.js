const { TELEGRAM_API_URL, TELEGRAM_BOT_TOKEN } = require('../../utils/constants/index').telegram;

const buildUrl = (messageParams) => `${TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}/sendMessage?${messageParams}`;

module.exports = buildUrl;
