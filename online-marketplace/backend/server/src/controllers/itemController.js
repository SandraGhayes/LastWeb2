const itemService = require('../services/itemService');
const { success, error } = require('../utils/response');

exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    const sellerId = req.user._id;
    const item = await itemService.createItem(data, sellerId);
    success(res, item, 201);
  } catch (err) { error(res, err.message, 400); }
};

exports.listItems = async (req, res) => {
  try {
    const { page, limit, category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    const result = await itemService.listItems(filter, { page: +page || 1, limit: +limit || 20 });
    success(res, result);
  } catch (err) { error(res, err.message); }
};
