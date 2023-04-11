const express = require('express');
const router = express.Router();
// const Cart = require('../models/cart');
const Cart = require('../models/Cart');

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single cart by ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new cart
router.post('/:id', async (req, res) => {
    req.body.user = req.params.id
  const cart = new Cart({
    name: req.body.name,
    description: req.body.description,
    details: req.body.details,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
    imgUrl: req.body.imgUrl,
    type: req.body.type,
    user: req.body.user,
  });

  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a cart by ID
router.patch('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      cart.name = req.body.name || cart.name;
      cart.description = req.body.description || cart.description;
      cart.details = req.body.details || cart.details;
      cart.old_price = req.body.old_price || cart.old_price;
      cart.new_price = req.body.new_price || cart.new_price;
      cart.imgUrl = req.body.imgUrl || cart.imgUrl;
      cart.type = req.body.type || cart.type;
      cart.user = req.body.user || cart.user;

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a cart by ID
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      await cart.remove();
      res.json({ message: 'Cart deleted' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
