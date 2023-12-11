const models = require('../models');

const { Account } = models; //use acc

const letterPage = async (req, res) => res.render('app');

const makeLetter = async (req, res) => {
  console.log('req.body');
  //console.log(req.body);


  const letterData = {
    letter: req.body,
    //owner: req.session.account._id,
  };

  console.log('letter data');
  //console.log(letterData);

  try {
    //const newLetter = new Account(letterData);
    //const newLetter = Account.set(letterData);

    let newLetter = await Account.findByIdAndUpdate(req.session.account._id, { letter: req.body }, { returnDocument: 'afters' }).exec();

    // await newLetter.save();
    console.log('newLetter');
    console.log(newLetter);

    console.log('newLetter.letter');
    console.log(newLetter.letter);

    return res.status(201).json({ letter: newLetter.letter });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured making letter!' });
  }

  return true;
};

const getLetters = async (req, res) => {
  try {
    const query = { username: req.session.account.username };
    const docs = await Account.find(query).select('letter').lean().exec();
    // const docs = await Letter.find(query).select(req.body);

    console.log('docs letter');
    console.log(docs);
    // docs.forEach(item => {
    //   console.log(item.letter);
    // })

    //return res.json(docs);
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
