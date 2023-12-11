const models = require('../models');

const { Words } = models;

const wordsPage = async (req, res) => res.render('app');

const makeWord = async (req, res) => {
    if (!req.body.word) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const wordData = {
        word: req.body.word,
        length: req.body.length,
        owner: req.session.account._id,
    };

    try {
        const newWord = new Words(wordData);
        await newWord.save();
        return res.status(201).json({ word: newWord.word, length: newWord.length });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).json({ error: 'Word already exists!' });
        }
        res.status(500).json({ error: 'An error occured making word!' });
    }

    return true;
};

const getWords = async (req, res) => {
    try {
        const query = { owner: req.session.account._id };
        const docs = await Words.find(query).select('word').lean().exec();

        return res.json({ words: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving domos!' });
    }
};

module.exports = {
    wordsPage,
    makeWord,
    getWords,
};
