const orderService = require('../services/orderService');
const { success, error } = require('../utils/response');

exports.createOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { items } = req.body;
    const order = await orderService.createOrder({ buyerId, items });
    success(res, order, 201);
  } catch (err) { error(res, err.message, 400); }
};

exports.updateStatus = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { id } = req.params;
    const { status } = req.body;
    const order = await orderService.updateStatus(id, sellerId, status);
    success(res, order);
  } catch (err) { error(res, err.message, 400); }
};
