/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const auth = require('../models/auth.model');
const authfn = require('../helper/auth.helper');
const generator = require('generate-password');
// Async/Await lab playground
// Sub functions listed here...
exports._checkpassword = async function(user, username, password) {
  try {
    const checkMatch = await user.correctPassword(password, user.password);
    if (checkMatch) {
      // console.log('\tPassword correct :' + password, checkMatch);
      return true;
      // return await console.log('Password correct :' + password, checkMatch);
    }
    // console.log('\tPassword incorrect :' + password, checkMatch);
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
  // console.log('set session');
  sess.username = setUser;
  sess.password = setPass;
  return await true;
};
