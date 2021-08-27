const express = require('express');
const identifyClient = require('../modules/identifyClient');
const auth = require('../modules/auth');
const checkRequiredRequestFields = require('../modules/checkRequiredRequestFields');
const parseRequest = require('../modules/parseRequest');
const validateData = require('../modules/validateData');
const errorHandler = require('../modules/errorHandler');

const getStockData = require('../requestsHandlers');
const buildResponseToClient = require('../modules/buildResponseToClient');
const sendMessageToTelegram = require('../modules/sendMessageToTelegram');

const router = express.Router();

const { errors } = require('../utils/constants/index');

router.use(express.json());

const main = async (req, res) => {
  const client = identifyClient(req);

  if (!client.ok) {
    const { statusCode, text } = errors[client.errorName];
    res.status(statusCode).json(JSON.stringify({ ok: false, data: { text } }));
  }

  try {
    auth(req);
    checkRequiredRequestFields(req);

    const parsedRequest = parseRequest(req, client);

    validateData(parsedRequest);

    const responseToClient = buildResponseToClient({
      dataFromStock: await getStockData(parsedRequest),
      requestType: parsedRequest.requestType,
      clientType: client.clientType,
    });

    if (client.clientType === 'webApp') {
      res.status(200).json(responseToClient);
    } else if (client.clientType === 'telegramApp') {
      await sendMessageToTelegram(responseToClient, client.chatId, res);
    }
  } catch (err) {
    await errorHandler(err, res, client);
  }
};

router.post('/', main);

module.exports = router;
