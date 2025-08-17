const express = require('express');
const router  = express.Router();
const News    = require('../models/News');
const auth    = require('../middleware/auth');
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });

// GET semua berita (public)
router.get('/', async (_, res) => {
  const news = await News.find().populate('author', 'username');
  res.json(news);
});

// POST berita (admin only)
router.post('/', auth(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = await News.create({
      title,
      content,
      image: req.file?.path || '',
      author: req.user.id
    });
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;