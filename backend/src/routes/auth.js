const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // cek duplikat
    if (await User.findOne({ $or: [{ username }, { email }] }))
      return res.status(400).json({ msg: 'Username atau email sudah ada' });

    // hash password
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });

    res.status(201).json({ id: user._id, username, email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;