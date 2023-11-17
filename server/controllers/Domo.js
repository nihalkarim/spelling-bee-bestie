const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.hobby) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    hobby: req.body.hobby,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, hobby: newDomo.hobby });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({ error: 'Domo already exists!' });
    }
    res.status(500).json({ error: 'An error occured making domo!' });
  }

  return true;
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age hobby').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

const deleteDomo = async (req, res) => {
  try {
    const deletedDomo = await Domo.findByIdAndDelete(req.body.domoId);
    return res.status(200).json({ message: `Domo ${deletedDomo} is deleted` });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting domo!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  deleteDomo,
};