// models/FAQ.js
const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_hi: { type: String },  // Hindi translation
  question_bn: { type: String },  // Bengali translation
  answer_hi: { type: String },
  answer_bn: { type: String },
});

// Model method to dynamically get the translated question
faqSchema.methods.getTranslatedQuestion = function(lang) {
  if (lang === 'hi' && this.question_hi) return this.question_hi;
  if (lang === 'bn' && this.question_bn) return this.question_bn;
  return this.question; // fallback to default question
};

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
