const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post('/signup',
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', jwt_token: token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;