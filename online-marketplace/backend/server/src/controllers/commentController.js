const commentService = require('../services/commentService');
const { success, error } = require('../utils/response');

exports.addComment = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { itemId, text, rating, orderId } = req.body;
    const comment = await commentService.addComment({ buyerId, itemId, text, rating, orderId });
    success(res, comment, 201);
  } catch (err) { error(res, err.message, 400); }
};
