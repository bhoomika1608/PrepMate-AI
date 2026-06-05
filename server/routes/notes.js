const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middlewares/authMiddleware');

// @route GET /api/notes
router.get('/', protect, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/notes
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/notes/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
