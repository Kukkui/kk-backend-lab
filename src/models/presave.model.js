/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ps = require('../../src/models/presave.model');
const Auth = require('../../src/models/auth.model');
const accounts = mongoose.Schema({
  username: String,
  password: String,
});
exports.preSaveFunc = async function(next, obj) {
  const ch = obj.isModified('password');
  if (!ch) return next();
  obj.password= await bcrypt.hash(obj.password, 12);
  obj.passwordConfirm= undefined;
  return next();
};
