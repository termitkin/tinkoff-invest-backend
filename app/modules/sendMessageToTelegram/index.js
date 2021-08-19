const axios = require('axios');
const buildUrl = require('../buildUrl');

const sendMessageToTelegram = (text, chatId, res) => {
  const urlParams = new URLSearchParams({ chat_id: chatId, text }).toString();
  const url = buildUrl(urlParams);

  axios(url).then((data) => {
    if (data.statusText !== 'OK') {
      console.log(data);
    }
  });

  res.status(200).send('ok');
};

module.exports = sendMessageToTelegram;
