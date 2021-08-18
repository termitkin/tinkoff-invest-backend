const api = require('../../utils/api');

const cancelOrder = async (orderId) => {
  try {
    await api.cancelOrder({ orderId });
    return { ok: true, data: orderId };
  } catch (e) {
    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      throw new Error(`cancelOrder: ${errorMessage}`);
    }

    throw new Error('В cancelOrder что-то пошло не так');
  }
};

module.exports = cancelOrder;
