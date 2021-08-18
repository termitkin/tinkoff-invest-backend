const express = require('express');
const cors = require('cors');

const identifyClientType = require('../modules/identifyClientType');
const auth = require('../modules/auth');
const checkRequiredRequestFields = require('../modules/checkRequiredRequestFields');
const parseRequest = require('../modules/parseRequest');
const validateData = require('../modules/validateData');
const errorHandler = require('../modules/errorHandler');

const getStockData = require('../requestsHandlers');
const buildResponseToClient = require('../modules/buildResponseToClient');

const router = express.Router();

router.use(cors());
router.options('*', cors());
router.use(express.json());

const main = async (req, res) => {
  await new Promise((resolve) => resolve(identifyClientType(req)))
    .then((state) => auth(req) && state)
    .then((state) => checkRequiredRequestFields(req) && state)
    .then((state) => parseRequest(req, state) && state)
    .then((state) => validateData(state) && state)
    .then(async (state) => ({ ...state, ...(await getStockData(state)) }))
    .then((state) => buildResponseToClient(state))
    .then((responseToClient) => res.status(200).json(responseToClient))
    .catch((err) => errorHandler(err, res));
};

router.post('/', main);

module.exports = router;
