const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.post('/', auth, orderController.createOrder); // buyer
router.patch('/:id/status', auth, orderController.updateStatus); // seller updates status

module.exports = router;
