/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const auth = require('../models/auth.model');
const authfn = require('../helper/auth.helper');
const generator = require('generate-password');
exports._checkpassword = async function(user, username, password) {
  try {
    const checkMatch = await user.correctPassword(password, user.password);
    if (checkMatch) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
exports._createNewAccount = async function(username) {
  try {
    const password = await generator.generate({length: 10, numbers: true});
    await auth.create({username, password});
    return await({
      username,
      password,
    });
  } catch (error) {
    throw error;
  }
};
exports._setsession = async function(sess, setUser, setPass) {
  sess.username = setUser;
  sess.password = setPass;
  return await true;
};
