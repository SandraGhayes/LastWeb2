const Order = require('../models/order');
const Item = require('../models/item');

exports.createOrder = async ({ buyerId, items }) => {
  // items: [{ itemId, quantity }]
  // fetch items and compute total
  const itemDocs = await Item.find({ _id: { $in: items.map(i => i.itemId) }});
  const itemsSnapshot = items.map(i => {
    const doc = itemDocs.find(d => d._id.equals(i.itemId));
    if (!doc) throw new Error('Item not found: ' + i.itemId);
    return { itemId: doc._id, quantity: i.quantity, price: doc.price };
  });
  const totalPrice = itemsSnapshot.reduce((s, it) => s + it.quantity * it.price, 0);
  // sellerId: for simplicity assume one seller; real-case you might split per seller
  const sellerId = itemDocs[0].sellerId;
  const order = await Order.create({ buyerId, sellerId, items: itemsSnapshot, totalPrice });
  return order;
};

exports.updateStatus = async (orderId, sellerId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');
  if (!order.sellerId.equals(sellerId)) throw new Error('Not authorized');
  order.status = status;
  await order.save();
  return order;
};
