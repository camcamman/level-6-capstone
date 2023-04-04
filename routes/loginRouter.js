const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // find user in database
  const user = await User.findOne({ username });

  // if user not found, send error response
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // compare password with hash in database
  const isMatch = await bcrypt.compare(password, user.password);

  // if password does not match, send error response
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // if authentication successful, send success response
  return res.status(200).json({ message: 'Authentication successful' });
});

module.exports = router;
