const cache = require('./cache');

const putToCache = (ticker, fields) => {
  if (!cache.instruments[ticker]) {
    cache.instruments[ticker] = { ...fields };
  } else {
    cache.instruments[ticker] = {
      ...cache.instruments[ticker],
      ...fields,
    };
  }
};

module.exports = putToCache;
