const models = require('../models');

const { Words } = models;

const wordsPage = async (req, res) => res.render('app');

/**
 * Make a new word with the data passed in from the front end
 * @param {*} req
 * @param {*} res
 * @returns
 */
const makeWord = async (req, res) => {
  if (!req.body.word) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const wordData = {
    word: req.body.word,
    length: req.body.word.length,
    wordId: req.session.account._id,
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

/**
 * Send the words back to the front end
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getWords = async (req, res) => {
  try {
    const query = { wordId: req.session.account._id };
    const docs = await Words.find(query).select('word').lean().exec();

    const data = [];
    docs.forEach((obj) => {
      data.push(obj.word);
    });

    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving words!' });
  }
};

module.exports = {
  wordsPage,
  makeWord,
  getWords,
};
