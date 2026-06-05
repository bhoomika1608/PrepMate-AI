const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const SolvedQuestion = require('../models/SolvedQuestion');
const { protect } = require('../middlewares/authMiddleware');

// @route GET /api/questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/questions/:id/solve
// Mark question as solved
router.post('/:id/solve', protect, async (req, res) => {
  try {
    const { code, notes } = req.body;
    
    // Check if already solved
    const alreadySolved = await SolvedQuestion.findOne({
      user: req.user._id,
      question: req.params.id
    });

    if (alreadySolved) {
      alreadySolved.code = code || alreadySolved.code;
      alreadySolved.notes = notes || alreadySolved.notes;
      await alreadySolved.save();
      return res.json(alreadySolved);
    }

    const solved = await SolvedQuestion.create({
      user: req.user._id,
      question: req.params.id,
      code,
      notes
    });

    res.status(201).json(solved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/questions/solved/me
// Get user's solved questions
router.get('/solved/me', protect, async (req, res) => {
  try {
    const solved = await SolvedQuestion.find({ user: req.user._id }).populate('question');
    res.json(solved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
