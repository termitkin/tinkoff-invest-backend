const errors = require('../../utils/constants').errors;

const errorHandler = (err, res) => {
  console.log(err);
  try {
    const { statusCode, text } = errors[err.message];

    res.status(statusCode).json(JSON.stringify({ ok: false, data: { text } }));
  } catch (err) {
    console.log(err);
    res.status(500).json(JSON.stringify({ ok: false, data: { text: 'На сервере что-то пошло не так' } }));
  }
};

module.exports = errorHandler;
