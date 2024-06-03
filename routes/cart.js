const express = require('express');
const router = express.Router();

const {getCart, putToCart, getCartByid,
     deleteAll, updateCart, deleteItem, postCart} = require('../controllers/cart');

router.route('/cart').get(getCart).post(postCart).delete(deleteAll);
router.route('/cart/:id').patch(updateCart).delete(deleteItem).put(putToCart).get(getCartByid)

module.exports = router;