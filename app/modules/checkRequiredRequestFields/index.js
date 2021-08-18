const checkRequiredRequestFields = (req) => {
  const chatMessage = req?.body?.message?.text;
  const chatId = req?.body?.message?.chat?.id;
  const myData = req?.body?.myData;

  if ((chatId && chatMessage) || myData) {
    return true;
  }

  throw new Error('noRequiredData');
};

module.exports = checkRequiredRequestFields;
