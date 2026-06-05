const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  topic: { type: String, required: true },
  exampleIn: { type: String },
  exampleOut: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
