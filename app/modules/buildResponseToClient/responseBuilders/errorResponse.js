const errors = require('../../../utils/constants').errors;

const errorResponse = (data, clientType, errorType) => {
  if (clientType === 'telegramApp') {
    return data ? data : errors[errorType] ? errors[errorType] : 'Что-то пошло не так';
  } else if (clientType === 'webApp') {
    return JSON.stringify({
      ok: false,
      data: data ? data : errors[errorType] ? errors[errorType] : 'Что-то пошло не так',
    });
  }
};

module.exports = errorResponse;
