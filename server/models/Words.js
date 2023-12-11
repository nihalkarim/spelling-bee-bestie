const mongoose = require('mongoose');
const _ = require('underscore');

const setWord = (word) => _.escape(word).trim();

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true,
        set: setWord,
    },
    length: {
        type: Number,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Words',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

WordSchema.statics.toAPI = (doc) => ({
    words: doc.words,
    length: doc.length
});

const WordModel = mongoose.model('Words', WordSchema);
module.exports = WordModel;
