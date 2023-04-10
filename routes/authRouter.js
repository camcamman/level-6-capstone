const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login route
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {

    // Find the user with the provided username
    const user = await User.findOne({ username });
    if (!user) {
      // If user is not found, return an error
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // If password is incorrect, return an error
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If everything is correct, return a success message
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
    return res.status(200).send({ token, user: user.withoutPassword() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign up route
authRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username is already taken
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    // Create a new user with the provided username and password
    const newUser = new User({ username, password });
    // await newUser.save();

    const saveNewUser = await newUser.save()
    const token = jwt.sign(saveNewUser.withoutPassword(), process.env.SECRET)

    // Return a success message
    // res.json({ message: 'Signup successful' });
    return res.status(201).send({ token, user: saveNewUser.withoutPassword()})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = authRouter;
