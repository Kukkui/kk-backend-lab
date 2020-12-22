/* eslint-disable max-len */
'use strict';
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/development.config.js');
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring the database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log('\tSuccessfully connected to the kukkui mongo database');
}).catch((err) => {
  console.log('\tCould not connect to the database. Exiting now...', err);
  process.exit();
});

// define a simple route
app.use('/', routes);
const port = process.env.PORT || 5000;
module.exports = app.listen(port, () => console.log(`Listening on port : ${port}...`) );
