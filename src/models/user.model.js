/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ps = require('../../src/models/presave.model');
const blogposts = mongoose.Schema({
  username: String,
  content: String,
  cardName: String,
  cardStatus: String,
  cardContent: String,
  cardCategory: String,
});
blogposts.pre('save', async function(next) {
  return await ps.preSaveFunc(next, this);
});
blogposts.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};
const User = mongoose.model('User', blogposts);
module.exports = User;
