const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middlewares/auth');

router.get('/', itemController.listItems);
router.post('/', auth, itemController.createItem); // seller-only check in controller/service

module.exports = router;
