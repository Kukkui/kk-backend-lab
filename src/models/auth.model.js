/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ps = require('../../src/models/presave.model');
const authMock = require('../../src/models/auth.model');
const accounts = mongoose.Schema({
  username: String,
  password: String,
});
accounts.pre('save', async function(next) {
  return await ps.preSaveFunc(next, this);
});

accounts.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};
const Auth = mongoose.model('Auth', accounts);
module.exports = Auth;
