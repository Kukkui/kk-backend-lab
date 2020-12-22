/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
'use strict';
const auth = require('../models/auth.model');
const authfn = require('../helper/auth.helper');
const generator = require('generate-password');
exports.auth = async (req, res, err) => {
  const sess = req.session;
  const uu = req.body.username;
  const pp = req.body.password;
  try {
    const founduser = await auth.findOne({username: uu});

    if (founduser) {
      await authfn._checkpassword(founduser, uu, pp);
      await authfn._setsession(sess, uu, pp);
      return res.send('DONE');
    } else {
      return res.send(await authfn._createNewAccount(uu));
    }
  } catch (err) {
    throw err;
  }
};
