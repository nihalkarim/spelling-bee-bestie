/**
 *
 * NOT USED!! MERGED WITH ACCOUNT MODEL INSTEAD
 *
 *
 */
const mongoose = require('mongoose');
const _ = require('underscore');

const setLetter = (letter) => _.escape(letter).trim();

const LetterSchema = new mongoose.Schema({
  letter: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    trim: true,
    set: setLetter,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Letters',
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
