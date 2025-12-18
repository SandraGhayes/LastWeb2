const Item = require('../models/item');

exports.createItem = async (data, sellerId) => {
  const item = await Item.create({ ...data, sellerId });
  return item;
};

exports.listItems = async (filter = {}, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const items = await Item.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const count = await Item.countDocuments(filter);
  return { items, count, page, limit };
};

exports.getItemById = async (itemId) => {
  const item = await Item.findById(itemId).populate('sellerId', 'name email sellerProfile');
  return item;
};
