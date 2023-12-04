const mongoose = require('mongoose');
const _ = require('underscore');

const setLetter = (letter) => _.escape(letter).trim();

const SetupLetterSchema = new mongoose.Schema({
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

SetupLetterSchema.statics.toAPI = (doc) => ({
  letter: doc.letter,
});

const SetupLetterModel = mongoose.model('Setup', SetupLetterSchema);
module.exports = SetupLetterModel;
