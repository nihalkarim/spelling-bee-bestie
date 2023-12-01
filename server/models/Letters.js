const mongoose = require('mongoose');
const _ = require('underscore');

const setLetter = (letter) => _.escape(letter).trim();

const LetterSchema = new mongoose.Schema({
  letter: {
    type: Array,
    required: true,
    trim: true,
    set: setLetter,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

LetterSchema.statics.toAPI = (doc) => ({
  letter: doc.letter,
});

const LetterModel = mongoose.model('Letter', LetterSchema);
module.exports = LetterModel;
