const mongoose = require('mongoose');

const solvedQuestionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  code: { type: String }, // optional user solution code
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SolvedQuestion', solvedQuestionSchema);
