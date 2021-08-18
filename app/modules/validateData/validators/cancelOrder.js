const cancelOrder = (params) => {
  const [orderId] = params;

  if (params.length !== 1) {
    return 'incorrectParamsQuantity';
  } else if (orderId.length === 0) {
    return 'incorrectOrderId';
  }
  return { ok: true };
};

module.exports = cancelOrder;
