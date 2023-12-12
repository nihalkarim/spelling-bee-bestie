const models = require('../models');

const { Account } = models; // use acc model

const letterPage = async (req, res) => res.render('app');

/**
 * When making the letters, find the username and add the letter info to the acc
 * @param {*} req
 * @param {*} res
 * @returns
 */
const makeLetter = async (req, res) => {
  // const letterData = {
  //   letter: req.body,
  //   // owner: req.session.account._id,
  // };

  try {
    const newLetter = await Account.findByIdAndUpdate(req.session.account._id, { letter: req.body }, { returnDocument: 'afters' }).exec();

    return res.status(201).json({ letter: newLetter.letter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured making letter!' });
  }

  return true;
};

/**
 * Get the letters
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getLetters = async (req, res) => {
  try {
    const query = { username: req.session.account.username };
    const docs = await Account.find(query).select('letter').lean().exec();

    return res.json(docs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving letters!' });
  }
};

module.exports = {
  letterPage,
  makeLetter,
  getLetters,
};
