const cancelOrder = (params) => {
  const [orderId] = params;

  if (params.length !== 1) {
    return { ok: false, errorName: 'incorrectParamsQuantity' };
  } else if (orderId.length === 0) {
    return { ok: false, errorName: 'incorrectOrderId' };
  }
  return { ok: true };
};

module.exports = cancelOrder;
