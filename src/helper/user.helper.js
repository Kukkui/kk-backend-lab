/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const accounts = require('../models/user.model');
const auth = require('../models/auth.model');
const userfn = require('../helper/user.helper');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Async/Await lab playground
// Sub functions listed here...

exports.sessionx = async function(sess, uu, pp) {
  let username = uu;
  let password = pp;
  if (sess.username && sess.password) {
    username = sess.username;
    password = sess.password;
  }
  return await [username, password];
};


exports.usernameCheck = async function(user, sess, uu, pp) {
  try {
    const [username, password] = await this.sessionx(sess, uu, pp);
    if (await bcrypt.compare(password, user.password)) {
      return true;
    } return false;
  } catch (error) {
    throw error;
  }
};


exports.viewModeResult = async function(sess, uu, pp) {
  const username = uu;
  const password = pp;
  try {
    const [username, password] = await this.sessionx(sess, uu, pp);
    return await accounts.find({username});
  } catch (error) {
    throw error;
  }
};
exports.editModeResult = async function(sess, uu, pp, obj, pid) {
  const username = uu;
  const password = pp;
  try {
    const result = await accounts.findOneAndUpdate(
        {
          _id: pid,
          username,
        },
        obj,
    );
    return await(result);
  } catch (error) {
    throw error;
  }
};


exports.addModeResult = async function(obj) {
  try {
    const result = await accounts.create(obj);
    return result;
  } catch (error) {
    throw error;
  }
};
exports.deleteModeResult = async function(sess, uu, pp, pid) {
  try {
    const [username] = await this.sessionx(sess, uu, pp);
    await accounts.deleteOne(
        {
          _id: pid,
          username: username,
        },
    );
    return await('DONE DELETION');
  } catch (error) {
    throw error;
  }
};
exports.finalResultFromMode = async function(isMatch, mode, sess, uu, pp, obj, pid) {
  try {
    await userfn.sessionx(sess, uu, pp);
    const Mode = ['view', 'add', 'edit', 'delete'];
    const func = [
      userfn.viewModeResult(sess, uu, pp),
      userfn.addModeResult(obj),
      userfn.editModeResult(sess, uu, pp, obj, pid),
      userfn.deleteModeResult(sess, uu, pp, pid),
    ];
    if (isMatch) {
      const id = Mode.indexOf(mode);
      return await func[id];
    }
    return await false;
  } catch (error) {
    throw error;
  }
};
