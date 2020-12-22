/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
'use strict';
const {deleteModel} = require('mongoose');
const auth = require('../models/auth.model');
const accounts = require('../models/user.model');
const userfn = require('../helper/user.helper');
// Async/Await lab playground
exports.myposts = async (req, res, next) => {
  const uu = req.body.username;
  const pp = req.body.password;
  const obj = {};
  const sess = req.session;
  const pid = null;
  try {
    const mode = 'view';
    const UserPass= await userfn.sessionx(sess, uu, pp);
    const user = await auth.findOne({username: UserPass[0]});
    const isMatched = await userfn.usernameCheck(user, sess, uu, pp);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, sess, uu, pp, obj, null);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.addposts = async (req, res, next) => {
  const uu = req.body.username;
  const pp = req.body.password;
  const pid = null;
  const sess = req.session;
  const obj = req.body;
  try {
    const mode ='add';
    const [username, password] =await userfn.sessionx(sess, uu, pp);
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user, sess, uu, pp);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, sess, uu, pp, obj, pid);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.allposts = async (req, res, next) => {
  try {
    const result = await accounts.find({});
    // console.log(result);
    return res.send(result);
  } catch (err) {
    throw err;
  }
};
exports.editposts = async (req, res, next) => {
  const uu = req.body.username;
  const pp = req.body.password;
  const pid = req.params.id;
  const sess = req.session;
  const obj = req.body;
  try {
    const mode = 'edit';
    const [username, password] = await userfn.sessionx(sess, uu, pp);
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user, sess, uu, pp);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, sess, uu, pp, obj, pid);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};

exports.deleteposts = async (req, res, next) => {
  const uu = req.body.username;
  const pp = req.body.password;
  const sess = req.session;
  const pid = req.params.id;
  const obj = {};
  try {
    const mode = 'delete';
    const [username, password] = await userfn.sessionx(sess, uu, pp);
    const user = await auth.findOne({username: username});
    const isMatched = await userfn.usernameCheck(user, sess, uu, pp);
    const showResult = await userfn.finalResultFromMode(isMatched, mode, sess, uu, pp, obj, pid);
    return res.send(showResult);
  } catch (err) {
    throw err;
  }
};
