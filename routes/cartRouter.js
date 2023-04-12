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
router.post('/', async (req, res) => {
    // req.body.user = req.params.id
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
    const cartId = req.params.id;
    const newCart = req.body

    const updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, newCart, { new: true })

    return res.status(200).send(updatedCart)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
})


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
