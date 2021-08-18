const cache = require('./cache');

const getFromCache = (ticker, fields) => {
  if (!cache.instruments.hasOwnProperty(ticker)) {
    return false;
  }

  const result = {};
  let existsAllFields = true;

  fields.forEach((field) => {
    if (cache.instruments[ticker].hasOwnProperty(field)) {
      result[field] = cache.instruments[ticker][field];
    } else {
      existsAllFields = false;
    }
  });

  return existsAllFields ? result : false;
};

module.exports = getFromCache;
