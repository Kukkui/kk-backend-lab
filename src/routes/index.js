/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-var */
'use strict';
const express = require('express');
const routes = express.Router();
const session = require('express-session');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const {RuleTester} = require('eslint');

// set router routes use,get,post,put,delete
routes.use(express.json());
routes.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
routes.get('/', (req, res) => {
  res.json({'message': 'Kukkui Sertis Lab v8 with pm2 new start & without node-module'});
});
module.exports = routes.post('/auth', authController.auth);
module.exports = routes.get('/posts/me', userController.myposts);
routes.post('/posts/new', userController.addposts);
routes.get('/posts/all', userController.allposts);
routes.put('/posts/edit/:id', userController.editposts);
routes.delete('/posts/delete/:id', userController.deleteposts);
module.exports = routes;
