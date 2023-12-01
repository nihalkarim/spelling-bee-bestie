const models = require('../models');

const { Setup } = models;

const setupLetterPage = async (req, res) => res.render('app');

const makeLetterSetup = async (req, res) => {
  const letterData = {
    letter: req.body.letter,
    owner: req.session.account._id,
  };

  try {
    const newLetter = new Setup(letterData);
    await newLetter.save();
    return res.status(201).json({ letter: newLetter.letter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured making letter!' });
  }

  return true;
};

// const getLetters = async (req, res) => {
//     try {
//         const query = { owner: req.session.account._id };
//         const docs = await Setup.find(query).select('letter').lean().exec();

//         return res.json({ letters: docs });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Error retrieving letters!' });
//     }
// };

module.exports = {
  setupLetterPage,
  makeLetterSetup,
  // getLetters,
};
