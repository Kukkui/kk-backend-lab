/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(1) authController.js : start an account authorization.', () => {
  let authMock;
  let authControllerMock;
  let generatorMock;
  let comparePasswordStub;
  let authController;
  let initAuthController;
  let authfnMock;
  let user; let req; let res; let next; let err;
  beforeEach(() => {
    authControllerMock = {
      auth: sinon.stub(),
    };
    authMock = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    generatorMock = {generate: sinon.stub()};
    comparePasswordStub = sinon.stub();
    authfnMock={
      _checkpassword: sinon.stub(),
      _createNewAccount: sinon.stub(),
      _setsession: sinon.stub(),
    };
    user = {
      comparePassword: comparePasswordStub,
    };
    req = {
      body: {},
      session: {},
    };
    res = {
      send: sinon.stub(),
    };
    err = null;
    // Proxyquire here...
    initAuthController = () => {
      authController = proxyquire(
          '../../../src/controllers/authController',
          {
            '../models/auth.model': authMock,
            '../helper/auth.helper': authfnMock,
            '../src/controllers/authController': authControllerMock,
            'generate-password': generatorMock,
          });
    };
  });

  // After each here...
  afterEach(() => {
  });

  describe('.auth() ', () => {
    it('should call .auth() method for type checked', () => {
      initAuthController();
      assert.equal(typeof authController.auth, 'function');
    });

    it('should call .auth() correctly with founduser equal to true', async () => {
      initAuthController();
      req.body = {
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      };
      res.send.returns('HI');
      await authMock.findOne.resolves({
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      });
      await authfnMock._checkpassword.resolves('passAuth');
      await authfnMock._setsession.resolves(true);
      await authController.auth(req, res, err);
      assert.deepEqual(await authController.auth(req, res, err), ('HI'));
    });

    it('should call .auth() correctly with founduser equal to false', async () => {
      initAuthController();
      req.body = {
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      };
      res.send.returns('NEW ACCOUNT');
      authMock.findOne.resolves(false);
      authfnMock._createNewAccount.resolves('NEW ACCOUNT');
      authController.auth(req, res, err);
      assert.deepEqual(await authController.auth(req, res, err), ('NEW ACCOUNT'));
    });
    it('should call .auth() incorrectly with throw error', async () => {
      initAuthController();
      req.body = {
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      };
      res.send.returns('NEW ACCOUNT');
      const error = new Error('error');
      authMock.findOne.throws(error);
      try {
        authController.auth(req, res, err);
      } catch (err) {
        assert.deepEqual(err, error);
      }
    });
  });
});
