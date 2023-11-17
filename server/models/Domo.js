const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();
const setHobby = (hobby) => _.escape(hobby).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    miin: 0,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
    trim: true,
    set: setHobby,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  hobby: doc.hobby,
});

const DomoModel = mongoose.model('Domo', DomoSchema);
module.exports = DomoModel;
